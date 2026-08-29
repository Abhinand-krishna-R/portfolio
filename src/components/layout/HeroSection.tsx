import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';

const heroRoom = '/assets/hero.png';

interface HeroSectionProps {
  loadReady?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {

  return (
    <section
      aria-label="Hero"
      className="relative isolate w-full bg-[#09090B] min-h-[100dvh] flex flex-col justify-center overflow-hidden"
    >
      {/* Background Image - Full Viewport Layer across Mobile, Tablet & Desktop */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src={heroRoom}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-full w-full object-cover object-[70%_center] sm:object-[75%_center] lg:object-[68%_center] xl:object-center"
        />

        {/* Ambient Dark Gradient Overlays for Perfect Readability on Mobile & Desktop */}
        <div
          aria-hidden="true"
          className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.88)_0%,rgba(9,9,11,0.82)_55%,rgba(9,9,11,0.95)_100%)]"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.92)_0%,rgba(9,9,11,0.78)_38%,rgba(9,9,11,0.3)_68%,rgba(9,9,11,0.1)_100%)] lg:bg-[linear-gradient(90deg,rgba(9,9,11,0.88)_0%,rgba(9,9,11,0.65)_36%,rgba(9,9,11,0.2)_66%,rgba(9,9,11,0.05)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.3)_0%,transparent_40%,rgba(9,9,11,0.4)_100%)]"
        />
      </div>

      {/* Content Layered directly IN FRONT of the Background Photo */}
      <div className="container-main relative z-10 mx-auto w-full min-h-[100dvh] flex flex-col justify-center pt-24 pb-12 sm:pt-28 md:pt-0 items-start px-4 sm:px-6">
        <div className="w-full max-w-[560px] lg:max-w-[620px]">
          {/* Main Heading */}
          <h1 className="font-display font-black tracking-tight text-neutral-50 text-[32px] xs:text-[40px] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.06]">
            Hey, I’m Abhinand.
          </h1>

          {/* Subtitle */}
          <p className="mt-4 font-display font-semibold text-neutral-100 text-[18px] xs:text-[20px] sm:text-2xl md:text-[22px] lg:text-[26px] leading-[1.3] max-w-[460px]">
            Software developer building web & mobile applications.
          </p>

          {/* Body Description */}
          <p className="mt-3 sm:mt-4 text-neutral-300 sm:text-neutral-400 text-[15px] sm:text-base md:text-[17px] leading-[1.6] max-w-[480px]">
            I enjoy turning ideas into simple, reliable products that feel good to use.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 84;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#9F7AEA] px-6 sm:px-7 py-3 text-[14px] sm:text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#8B5CF6] shadow-lg shadow-purple-950/20 active:scale-[0.98] cursor-pointer"
            >
              Explore my work
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="/assets/Abhinand_Krishna_R_CV.pdf"
              download="Abhinand_Krishna_R_CV.pdf"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 backdrop-blur-sm px-6 py-3 text-[14px] font-medium text-neutral-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
