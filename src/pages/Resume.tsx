import React from 'react';
import { Printer, ArrowLeft, Mail, Phone, MapPin, Briefcase, Code2 } from 'lucide-react';
import { GithubIcon as Github } from '../components/ui/BrandIcons';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/ui/Button';
import { socials, experienceList, educationList, projectsList } from '../data';

export const Resume: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-950 pb-24 print:bg-white print:pb-0">
      
      {/* HEADER CONTROL BAR (Hidden on Print) */}
      <div className="border-b border-neutral-900 bg-neutral-950/80 sticky top-16 z-40 py-4 print:hidden">
        <Container className="flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            BACK TO CONSOLE
          </Link>
          
          <Button onClick={handlePrint} variant="primary" size="sm" icon={<Printer className="w-3.5 h-3.5" />}>
            Print CV / Save PDF
          </Button>
        </Container>
      </div>

      <Container className="pt-28 md:pt-32 print:pt-0 max-w-[800px]">
        {/* RESUME PAPER CONTAINER */}
        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl print:shadow-none print:border-none print:p-0 print:bg-white print:text-neutral-900">
          
          {/* Header */}
          <div className="border-b border-neutral-900 print:border-neutral-200 pb-8 mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-50 print:text-neutral-900">
                {socials.name}
              </h1>
              <p className="text-sm font-medium text-blue-500 print:text-blue-600 mt-1">
                {socials.title}
              </p>
            </div>
            
            {/* Contacts details */}
            <div className="flex flex-col items-start md:items-end gap-1.5 font-mono text-xs text-neutral-500 print:text-neutral-600">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-600" />
                {socials.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-600" />
                {socials.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                {socials.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-neutral-600" />
                github.com/Abhinand-krishna-R
              </span>
            </div>
          </div>

          {/* Body Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            
            {/* LEFT COLUMN: Skill set, Education */}
            <div className="md:col-span-4 space-y-8">
              
              {/* Technical skills */}
              <div>
                <h3 className="font-mono text-[10px] text-neutral-400 print:text-neutral-500 uppercase tracking-widest border-b border-neutral-900 print:border-neutral-200 pb-2 mb-3">
                  Technical Core
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-300 print:text-neutral-700 block mb-1">Languages</span>
                    <p className="text-xs text-neutral-400 print:text-neutral-600 leading-relaxed">
                      Dart, Python, C, C++, C#, HTML, CSS, SQL
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-300 print:text-neutral-700 block mb-1">Frameworks</span>
                    <p className="text-xs text-neutral-400 print:text-neutral-600 leading-relaxed">
                      Flutter (Android/iOS), Django (Python), .NET (MVC)
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-300 print:text-neutral-700 block mb-1">Data & Logic</span>
                    <p className="text-xs text-neutral-400 print:text-neutral-600 leading-relaxed">
                      Firebase (Firestore, Auth, Functions, FCM), SQLite, OpenCV, MediaPipe
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-300 print:text-neutral-700 block mb-1">Tools & Platforms</span>
                    <p className="text-xs text-neutral-400 print:text-neutral-600 leading-relaxed">
                      Git, GitHub, VS Code, Android Studio, Figma (basic)
                    </p>
                  </div>
                </div>
              </div>

              {/* Education list */}
              <div>
                <h3 className="font-mono text-[10px] text-neutral-400 print:text-neutral-500 uppercase tracking-widest border-b border-neutral-900 print:border-neutral-200 pb-2 mb-4">
                  Education
                </h3>
                <div className="space-y-6">
                  {educationList.map((edu) => (
                    <div key={edu.id}>
                      <span className="text-xs font-mono text-neutral-500 print:text-neutral-600 block">{edu.period}</span>
                      <span className="text-[11px] font-bold text-neutral-200 print:text-neutral-800 block mt-0.5">
                        {edu.degree}
                      </span>
                      <span className="text-[10px] text-neutral-400 print:text-neutral-600 block">
                        {edu.institution}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Experience, Projects */}
            <div className="md:col-span-8 space-y-8">
              
              {/* Experience list */}
              <div>
                <h3 className="font-mono text-[10px] text-neutral-400 print:text-neutral-500 uppercase tracking-widest border-b border-neutral-900 print:border-neutral-200 pb-2 mb-4 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-neutral-600 print:hidden" />
                  Experience
                </h3>
                
                <div className="space-y-6">
                  {experienceList.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-neutral-200 print:text-neutral-800">
                          {exp.role}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 print:text-neutral-600">
                          {exp.period}
                        </span>
                      </div>
                      <span className="text-[11px] text-blue-500 print:text-blue-600 block mb-2">
                        {exp.company}
                      </span>
                      <ul className="list-disc list-outside ml-3 text-[11px] text-neutral-400 print:text-neutral-600 space-y-1">
                        {exp.description.map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects list */}
              <div>
                <h3 className="font-mono text-[10px] text-neutral-400 print:text-neutral-500 uppercase tracking-widest border-b border-neutral-900 print:border-neutral-200 pb-2 mb-4 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-neutral-600 print:hidden" />
                  Key Projects
                </h3>
                
                <div className="space-y-5">
                  {projectsList.map((proj) => (
                    <div key={proj.id}>
                      <span className="text-xs font-semibold text-neutral-200 print:text-neutral-800 block">
                        {proj.title} &bull; <span className="text-[10px] font-mono text-neutral-500 font-normal">{proj.platform}</span>
                      </span>
                      <p className="text-[11px] text-neutral-450 print:text-neutral-600 mt-1 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </Container>
    </div>
  );
};

export default Resume;
