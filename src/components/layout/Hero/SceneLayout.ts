export interface LayoutArea {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const SceneLayout: Record<string, LayoutArea> = {
  // Window & Night Sky: [0%, 0%] to [35%, 65%]
  window: {
    x: 0.00,
    y: 0.00,
    w: 0.35,
    h: 0.65
  },
  // Illuminated Aquarium: [12%, 42%] to [36%, 86%]
  aquarium: {
    x: 0.12,
    y: 0.42,
    w: 0.24,
    h: 0.44
  },
  // Water surface at top of aquarium
  waterSurface: {
    x: 0.12,
    y: 0.42,
    w: 0.24,
    h: 0.06
  },
  // Fish swimming area inside aquarium
  fishArea: {
    x: 0.12,
    y: 0.50,
    w: 0.24,
    h: 0.34
  },
  // Laptop screen (code visible) - centered on the screen glass
  laptopScreen: {
    x: 0.555,
    y: 0.485,
    w: 0.135,
    h: 0.18
  },
  // Clock on the laptop screen
  clock: {
    x: 0.585,
    y: 0.60,
    w: 0.04,
    h: 0.02
  },
  // External keyboard: [64%, 70%] to [77%, 81%]
  keyboard: {
    x: 0.64,
    y: 0.70,
    w: 0.13,
    h: 0.11
  },
  // Desk lamp bulb: positioned inside the lampshade opening
  lampBulb: {
    x: 0.635,
    y: 0.38,
    w: 0.04,
    h: 0.04
  },
  // Lamp warm light wash: centered near the bulb and projecting onto the desk
  lampLight: {
    x: 0.54,
    y: 0.34,
    w: 0.24,
    h: 0.36
  },
  // Totoro figurine: [48%, 57%] to [53%, 72%]
  totoro: {
    x: 0.48,
    y: 0.57,
    w: 0.05,
    h: 0.15
  },
  // Developer face (headphones): ~[76%, 36%] to [86%, 50%]
  face: {
    x: 0.76,
    y: 0.36,
    w: 0.10,
    h: 0.14
  },
  // Cat nightlight: [91%, 51%] to [98%, 65%]
  catLamp: {
    x: 0.91,
    y: 0.51,
    w: 0.07,
    h: 0.14
  },
  // Far-left fern pot: [0%, 50%] to [13%, 82%]
  leftPlant: {
    x: 0.00,
    y: 0.50,
    w: 0.13,
    h: 0.32
  },
  // Mid-left larger houseplant: [35%, 49%] to [46%, 73%]
  middlePlant: {
    x: 0.35,
    y: 0.49,
    w: 0.11,
    h: 0.24
  },
  // Echeveria succulent: [37%, 68%] to [43%, 80%]
  succulent: {
    x: 0.37,
    y: 0.68,
    w: 0.06,
    h: 0.12
  }
};

export default SceneLayout;
