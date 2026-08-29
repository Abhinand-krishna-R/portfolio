import React, { useEffect } from 'react';
import { FileText, Mail, MapPin, Phone } from 'lucide-react';
import FeaturedProducts from '../components/layout/FeaturedProducts';
import HeroSection from '../components/layout/HeroSection';
import TechStack from '../components/layout/TechStack';
import CareerRoadmap from '../components/layout/CareerRoadmap';
import AboutSection from '../components/layout/AboutSection';
import Button from '../components/ui/Button';
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons';
import SectionHeading from '../components/ui/SectionHeading';
import { socials } from '../data';

interface HomeProps {
  pageReady?: boolean;
}

const sectionSpacing = 'relative py-8 sm:py-12 lg:py-14';

export const Home: React.FC<HomeProps> = ({ pageReady = true }) => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const navHeight = 84;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      <HeroSection loadReady={pageReady} />

      <section id="about" className={`${sectionSpacing} scroll-mt-24 sm:scroll-mt-28`}>
        <AboutSection />
      </section>

      <section id="projects" className={`${sectionSpacing} scroll-mt-24 sm:scroll-mt-28`}>
        <FeaturedProducts />
      </section>

      <section id="tech" className={`${sectionSpacing} scroll-mt-24 sm:scroll-mt-28`}>
        <TechStack />
      </section>

      <section id="experience" className={`${sectionSpacing} scroll-mt-24 sm:scroll-mt-28`}>
        <CareerRoadmap />
      </section>

      <section id="contact" className={`${sectionSpacing} scroll-mt-24 sm:scroll-mt-28`}>
        <div className="container-main mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Get in touch"
            title="Let's build something together."
            align="center"
            className="max-w-2xl"
          />

          <p className="mx-auto mt-5 max-w-xl text-center text-[16px] leading-7 text-neutral-400 sm:text-[18px] sm:leading-8">
            Have a project, an idea, or just want to say hello? I'd love to hear from you.
          </p>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-4 text-[14px] text-neutral-300 sm:text-[15px]">
            <a href={`mailto:${socials.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="h-4 w-4 text-[#9F7AEA]" />
              <span>{socials.email}</span>
            </a>
            <a href="tel:+918113865811" className="inline-flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-4 w-4 text-[#9F7AEA]" />
              <span>+91 81138 65811</span>
            </a>
            <span className="inline-flex items-center gap-2 text-neutral-400">
              <MapPin className="h-4 w-4 text-[#9F7AEA]" />
              <span>Perumbavoor, Kerala</span>
            </span>
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/resume" variant="primary" icon={<FileText className="h-4 w-4" />}>
              Resume
            </Button>
            <Button href={socials.linkedin} variant="secondary" icon={<LinkedinIcon className="h-4 w-4" />}>
              LinkedIn
            </Button>
            <Button href={socials.github} variant="secondary" icon={<GithubIcon className="h-4 w-4" />}>
              GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
