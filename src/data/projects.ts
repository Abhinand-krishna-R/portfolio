import { getProjects } from '../lib/getProjects';
import type { Project } from '../types';

// Safely compute the merged project list — if sync data is missing
// or malformed, fall back to an empty array rather than crashing the app.
let _projectsList: Project[];

try {
  _projectsList = getProjects() as unknown as Project[];
} catch (e) {
  console.warn('[portfolio] Failed to load generated project data. Run `npm run sync` to regenerate.', e);
  _projectsList = [];
}

export const projectsList: Project[] = _projectsList;
