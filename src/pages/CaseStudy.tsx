import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Globe, Smartphone, Server, Cpu, Database, AlertCircle, Sparkles, BookOpen, Download, Code2 } from 'lucide-react';
import { GithubIcon as Github } from '../components/ui/BrandIcons';
import Container from '../components/layout/Container';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import CodeBlock from '../components/ui/CodeBlock';
import AnimatedBackground from '../components/ui/AnimatedBackground';
import ArchitectureDiagram from '../components/ui/ArchitectureDiagram';
import { projectsList } from '../data';

export const CaseStudy: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  
  const project = projectsList.find((p) => p.id === projectId);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <Container className="text-center py-20">
          <Heading level="h1" className="mb-4">Project Not Found</Heading>
          <Paragraph size="md" className="mb-8">The requested case study could not be located in the database console.</Paragraph>
          <Button to="/" variant="primary">Return Home</Button>
        </Container>
      </div>
    );
  }

  // Dynamic color configuration based on project
  const getThemeConfig = () => {
    switch (project.id) {
      case 'serenityspace':
        return {
          accentText: 'text-accent-purple',
          accentBg: 'bg-accent-purple/10',
          accentBorder: 'border-accent-purple/20',
          glow: 'from-accent-purple/10 to-transparent',
          badgeVariant: 'blue' as const,
        };
      case 'skillsync':
        return {
          accentText: 'text-secondary-cyan',
          accentBg: 'bg-secondary-cyan/10',
          accentBorder: 'border-secondary-cyan/20',
          glow: 'from-secondary-cyan/10 to-transparent',
          badgeVariant: 'emerald' as const,
        };
      case '3d-air-sculpting':
        return {
          accentText: 'text-rose-500',
          accentBg: 'bg-rose-500/10',
          accentBorder: 'border-rose-500/20',
          glow: 'from-rose-500/10 to-transparent',
          badgeVariant: 'rose' as const,
        };
      default: // airdrawing
        return {
          accentText: 'text-highlight-pink',
          accentBg: 'bg-highlight-pink/10',
          accentBorder: 'border-highlight-pink/20',
          glow: 'from-highlight-pink/10 to-transparent',
          badgeVariant: 'outline' as const,
        };
    }
  };

  const theme = getThemeConfig();

  return (
    <div className="relative min-h-screen pb-24">
      {/* Dynamic Grid Background */}
      <AnimatedBackground />

      <Container>
        {/* Back Link */}
        <div className="pt-24 pb-6">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to projects
          </Link>
        </div>

        {/* HERO HEADER */}
        <header className="border-b border-neutral-900 pb-10 mb-12 relative">
          {/* Accent glow behind header */}
          <div className={`absolute top-0 right-0 w-80 h-80 rounded-full bg-radial-gradient ${theme.glow} blur-[120px] pointer-events-none -z-10`} />

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <Badge variant={theme.badgeVariant}>{project.platform}</Badge>
                <span className="text-xs font-mono text-neutral-500">{project.timeline}</span>
              </div>
              <Heading level="display" className="mb-3 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-50">
                {project.title}
              </Heading>
              <Paragraph size="lg" className="text-neutral-400 max-w-2xl font-light">
                {project.subtitle}
              </Paragraph>
            </div>
            
            {/* Quick Links / Download APK */}
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button href={project.github} variant="secondary" className="font-mono text-xs px-4 py-2.5 rounded-lg" icon={<Github className="w-4 h-4" />}>
                GitHub Repo
              </Button>
              
              {project.apkUrl && project.apkUrl !== '#' && (
                <Button href={project.apkUrl} variant="secondary" className="font-mono text-xs px-4 py-2.5 rounded-lg border-neutral-800 hover:border-neutral-700 text-neutral-200" icon={<Download className="w-4 h-4" />}>
                  Download APK
                </Button>
              )}

              {project.liveDemo && project.liveDemo !== '#' && (
                <Button href={project.liveDemo} variant="primary" className="font-mono text-xs px-4 py-2.5 rounded-lg" icon={<Globe className="w-4 h-4" />}>
                  Live Demo
                </Button>
              )}
            </div>
          </div>

          {/* Quick Metrics Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-neutral-900/60">
            <div>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">Architecture Role</span>
              <span className="text-sm font-medium text-neutral-200">{project.role}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">Development Time</span>
              <span className="text-sm font-medium text-neutral-200">{project.timeline}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">Target Engine</span>
              <span className="text-sm font-medium text-neutral-200">{project.platform}</span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-1">Primary Stack</span>
              <span className={`text-sm font-medium ${theme.accentText}`}>{project.stack[0]}</span>
            </div>
          </div>
        </header>

        {/* CASE STUDY SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Case Content */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* 1. Problem Statement */}
            <section id="problem" className="scroll-mt-20">
              <Heading level="h3" className="flex items-center gap-2 mb-4 text-neutral-100">
                <AlertCircle className={`w-4 h-4 ${theme.accentText}`} />
                The Problem
              </Heading>
              <Paragraph size="md" className="text-neutral-400 font-light leading-relaxed">
                {project.problem}
              </Paragraph>
            </section>

            {/* 2. Core Goals */}
            <section id="goals" className="scroll-mt-20">
              <Heading level="h3" className="flex items-center gap-2 mb-4 text-neutral-100">
                <Sparkles className={`w-4 h-4 ${theme.accentText}`} />
                Engineering Goals
              </Heading>
              <ul className="list-disc list-outside pl-4 space-y-3 text-sm text-neutral-405 leading-relaxed">
                {project.goals.map((goal, idx) => (
                  <li key={idx}>
                    {goal}
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. System Architecture (Drawing itself on scroll) */}
            <section id="architecture" className="scroll-mt-20 space-y-6">
              <div>
                <Heading level="h3" className="flex items-center gap-2 mb-2 text-neutral-100">
                  <Cpu className={`w-4 h-4 ${theme.accentText}`} />
                  System Architecture
                </Heading>
                <Paragraph size="md" className="text-neutral-450 font-light leading-relaxed">
                  {project.architecture}
                </Paragraph>
              </div>

              {/* Dynamic Animated Self-drawing SVG diagram */}
              <ArchitectureDiagram projectId={project.id} />
            </section>

            {/* 4. Database Schema (if provided) */}
            {project.databaseDesign && (
              <section id="database" className="scroll-mt-20">
                <Heading level="h3" className="flex items-center gap-2 mb-4 text-neutral-100">
                  <Database className={`w-4 h-4 ${theme.accentText}`} />
                  Database Model & Schema
                </Heading>
                <CodeBlock code={project.databaseDesign} language="NoSQL Firestore Collections" />
              </section>
            )}

            {/* 5. Key Features */}
            <section id="features" className="scroll-mt-20">
              <Heading level="h3" className="flex items-center gap-2 mb-4 text-neutral-100">
                <Smartphone className={`w-4 h-4 ${theme.accentText}`} />
                Core Implementations
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <Card key={idx} hoverable={false} padding="sm" className="border border-neutral-900 bg-[#101827]/30">
                    <span className={`font-mono text-[9px] ${theme.accentText} mb-1.5 block`}>FEATURE 0{idx + 1}</span>
                    <p className="text-xs sm:text-sm font-medium text-neutral-300">{feature}</p>
                  </Card>
                ))}
              </div>
            </section>


            {/* 7. Challenges & Solutions */}
            <section id="challenges" className="scroll-mt-20">
              <Heading level="h3" className="flex items-center gap-2 mb-4 text-neutral-100">
                <Server className={`w-4 h-4 ${theme.accentText}`} />
                Engineering Challenges
              </Heading>
              <div className="space-y-6">
                {project.challenges.map((ch, idx) => (
                  <Card key={idx} hoverable={false} padding="md" className="border border-neutral-900 bg-[#101827]/10">
                    <div className="mb-3">
                      <span className="font-mono text-[9px] text-rose-500 uppercase tracking-wider block mb-1">Challenge</span>
                      <h4 className="text-sm font-bold text-neutral-100 leading-snug">{ch.challenge}</h4>
                    </div>
                    <div className="pt-3 border-t border-neutral-900">
                      <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-wider block mb-1">Solution</span>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{ch.solution}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 8. Lessons Learned */}
            <section id="lessons" className="scroll-mt-20">
              <Heading level="h3" className="flex items-center gap-2 mb-4 text-neutral-100">
                <BookOpen className={`w-4 h-4 ${theme.accentText}`} />
                Key Takeaways & Lessons
              </Heading>
              <ul className="list-decimal list-outside pl-4 space-y-3 text-sm text-neutral-405 leading-relaxed">
                {project.lessons.map((lesson, idx) => (
                  <li key={idx}>
                    {lesson}
                  </li>
                ))}
              </ul>
            </section>

            {/* 9. Code Highlights */}
            {project.codeHighlights && project.codeHighlights.length > 0 && (
              <section id="code" className="scroll-mt-20 space-y-6">
                <Heading level="h3" className={`flex items-center gap-2 text-neutral-100`}>
                  <Code2 className={`w-4 h-4 ${theme.accentText}`} />
                  Technical Implementation
                </Heading>
                {project.codeHighlights.map((snippet, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-100">{snippet.title}</h4>
                        <p className="text-xs text-neutral-500 mt-0.5 font-light leading-relaxed">{snippet.description}</p>
                      </div>
                    </div>
                    <CodeBlock code={snippet.code} language={snippet.language} />
                  </div>
                ))}
              </section>
            )}

            {/* 10. Future Roadmap */}
            {project.futureWork && project.futureWork.length > 0 && (
              <section id="roadmap" className="scroll-mt-20">
                <Heading level="h3" className="mb-4 text-neutral-100">
                  Future Roadmap
                </Heading>
                <ul className="list-disc list-outside pl-4 space-y-2 text-sm text-neutral-405 leading-relaxed">
                  {project.futureWork.map((fw, idx) => (
                    <li key={idx}>
                      {fw}
                    </li>
                  ))}
                </ul>
              </section>
            )}

          </main>

          {/* Sidebar / Quick Navigation info */}
          <aside className="lg:col-span-4 space-y-6">
            <Card padding="md" hoverable={false} className="sticky top-24 border border-neutral-900 bg-[#101827]/10">
              <Heading level="h4" className="mb-4 text-sm font-bold text-neutral-100">
                Technology Stack
              </Heading>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="border-t border-neutral-900 pt-4 space-y-4">
                <div>
                  <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block mb-1">Target Engine</span>
                  <span className="text-xs text-neutral-300 font-medium">{project.platform}</span>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest block mb-1">Development Time</span>
                  <span className="text-xs text-neutral-300 font-medium">{project.timeline}</span>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </Container>
    </div>
  );
};

export default CaseStudy;
