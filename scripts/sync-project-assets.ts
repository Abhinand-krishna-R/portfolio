import { Octokit } from "octokit";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { projectConfigs } from "../src/config/project.config";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const MANIFEST_PATH = path.resolve(".sync-manifest.json");
const PUBLIC_DIR = path.resolve("public/projects");
const OUTPUT_PATH = path.resolve("src/generated/projects.json");

type Manifest = Record<string, { sha: string; lastSynced: string }>;

async function loadManifest(): Promise<Manifest> {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, "utf-8"));
  } catch {
    return {};
  }
}

async function fetchPortfolioJson(owner: string, repo: string) {
  try {
    const res = await octokit.rest.repos.getContent({ owner, repo, path: "portfolio.json" });
    if (Array.isArray(res.data) || !("content" in res.data)) throw new Error("not a file");
    const decoded = Buffer.from(res.data.content, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch (err) {
    console.error(`  ❌ Missing or invalid portfolio.json for ${repo}: ${(err as Error).message}`);
    return null;
  }
}

async function fetchScreenshots(owner: string, repo: string, outDir: string, manifest: Manifest) {
  const res = await octokit.rest.repos.getContent({ owner, repo, path: "assets/screenshots" });
  if (!Array.isArray(res.data)) throw new Error("screenshots path is not a directory");

  const files = res.data.filter((f) => /\.(png|jpe?g|webp)$/i.test(f.name));
  const names: string[] = [];

  for (const file of files) {
    const baseName = path.basename(file.name, path.extname(file.name));
    names.push(baseName);
    const key = `${repo}/screenshots/${file.name}`;

    if (manifest[key]?.sha === file.sha) continue; // unchanged, skip

    const buffer = Buffer.from(await (await fetch(file.download_url!)).arrayBuffer());
    await fs.mkdir(outDir, { recursive: true });
    const pipeline = sharp(buffer).resize({ width: 1440, withoutEnlargement: true });
    await pipeline.clone().avif({ quality: 65 }).toFile(path.join(outDir, `${baseName}.avif`));
    await pipeline.clone().webp({ quality: 80 }).toFile(path.join(outDir, `${baseName}.webp`));
    await pipeline.clone().png().toFile(path.join(outDir, `${baseName}.png`));

    manifest[key] = { sha: file.sha, lastSynced: new Date().toISOString() };
  }
  return names;
}

async function fetchLatestRelease(owner: string, repo: string) {
  try {
    const res = await octokit.rest.repos.getLatestRelease({ owner, repo });
    const apkAsset = res.data.assets.find((a) => a.name === "app-release.apk");
    return {
      latestVersion: res.data.tag_name,
      releaseDate: res.data.published_at,
      apkUrl: apkAsset ? apkAsset.browser_download_url : null,
    };
  } catch {
    return { latestVersion: null, releaseDate: null, apkUrl: null };
  }
}

async function fetchBanner(owner: string, repo: string, outDir: string, manifest: Manifest) {
  try {
    const res = await octokit.rest.repos.getContent({ owner, repo, path: "assets/banner.webp" });
    if (Array.isArray(res.data) || !("sha" in res.data)) return null;
    const key = `${repo}/banner`;
    if (manifest[key]?.sha === res.data.sha) return "banner.webp";

    const buffer = Buffer.from(await (await fetch(res.data.download_url!)).arrayBuffer());
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "banner.webp"), buffer);
    manifest[key] = { sha: res.data.sha, lastSynced: new Date().toISOString() };
    return "banner.webp";
  } catch {
    return null;
  }
}

async function main() {
  const manifest = await loadManifest();
  let results: Record<string, any> = {};
  
  // Try to load existing generated projects data to preserve it if sync fails
  try {
    const existingContent = await fs.readFile(OUTPUT_PATH, "utf-8");
    results = JSON.parse(existingContent);
    console.log("Loaded existing projects data from projects.json");
  } catch {
    results = {};
  }
  
  let hadFailure = false;

  for (const config of projectConfigs) {
    const [owner, repo] = config.repo.split("/");
    console.log(`\nSyncing ${config.id} (${config.repo})...`);
    const outDir = path.join(PUBLIC_DIR, config.id);

    const portfolioData = await fetchPortfolioJson(owner, repo);
    if (!portfolioData) {
      console.warn(`  ⚠️ Using existing local/cached data for ${config.id} due to sync failure`);
      hadFailure = true;
      continue;
    }

    try {
      const screenshots = await fetchScreenshots(owner, repo, outDir, manifest);
      const release = await fetchLatestRelease(owner, repo);
      const banner = await fetchBanner(owner, repo, outDir, manifest);

      results[config.id] = {
        ...results[config.id],
        ...portfolioData,
        screenshots,
        banner,
        ...release,
      };
      console.log(`  ✅ ${config.id} synced (${screenshots.length} screenshots)`);
    } catch (err) {
      console.error(`  ❌ ${config.id} failed: ${(err as Error).message}`);
      console.warn(`  ⚠️ Using existing local/cached data for ${config.id} due to sync failure`);
      hadFailure = true;
    }
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(results, null, 2));
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  if (hadFailure) {
    console.warn("\n⚠️ Sync completed with some errors, but existing data was preserved. Continuing build...");
  } else {
    console.log("\n✅ Sync complete.");
  }
}

main();
