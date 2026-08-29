import type { Principle } from '../types';

export const principles: Principle[] = [
  {
    title: "Build for users first",
    description: "Every architectural choice should translate to user value. Clean layouts, fast load times, and fluid navigations are the markers of respectful engineering."
  },
  {
    title: "Simple solutions beat clever ones",
    description: "Write straightforward, decoupled modules. Avoid over-engineering systems until metrics or scaling challenges show a clear need."
  },
  {
    title: "Performance is a feature",
    description: "Sub-second startup states, smooth frame rates (60+ FPS), and minimal payload transfers are key development targets, not optional polish."
  },
  {
    title: "Readable code scales",
    description: "Write code to be read and maintained by other developers. Standard design patterns and documentation always beat cryptic optimizations."
  },
  {
    title: "Never stop learning",
    description: "Software engineering is a constant state of discovery. Continuously explore new testing methodologies, caching practices, and native layers."
  }
];
