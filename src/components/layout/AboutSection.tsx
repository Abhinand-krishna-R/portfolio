import React from 'react';
import SectionHeading from '../ui/SectionHeading';

export const AboutSection: React.FC = () => {
  return (
    <div className="container-main mx-auto px-4 sm:px-6">
      <SectionHeading label="About me" title="A little about me." className="max-w-2xl" />

      <div className="mt-8 sm:mt-10 max-w-[780px] space-y-5 sm:space-y-6 text-[16px] leading-7 text-neutral-300 sm:text-[18px] sm:leading-8">
        <p>
          I’m a software developer who enjoys building web and mobile applications that are simple, reliable, and easy to use. I like understanding how things work, solving problems, and turning ideas into something people can actually use.
        </p>
        <p className="text-neutral-400">
          Outside of coding, I’m usually exploring something completely different. I enjoy aquascaping, movies and series, and discovering different cultures through the stories they tell. I’m also interested in languages and the little things that make the way people communicate unique.
        </p>
        <p className="text-neutral-400">
          I guess I’m just curious about a lot of things — and I think that curiosity makes its way into the things I build.
        </p>
        <p className="pt-2 font-display text-[19px] font-semibold leading-7 text-neutral-100 sm:text-[21px]">
          Build things. Stay curious. Keep exploring.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
