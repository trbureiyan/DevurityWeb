// TS "Barrel Export" para rutas de imágenes

export const IMAGES = {
  // Landing
  landing: {
    banner: '/images/landing/wave-background.jpg',
    devBG: '/images/landing/pexels-simonptr-33607952.jpg',
    urityBG: '/images/landing/pexels-googledeepmind-17483910.jpg',
    cuboAbstracto: '/images/landing/abstractCubeEdit.svg',
    coinCellAbstract: '/images/landing/coinCellAbstract.png',
    ctaBackground: '/images/landing/pexels-matreding-10289009.jpg',
  },
  
  // Logo
  logo: {
    main: '/images/logo/RoundyBIGLogoWBgOnly.png',
    icon: '/images/logo/icon.svg',
  },

  // Login page
  login: {
    logo: '/images/login/Logo WoBg.png',
    slide0: '/images/login/pexels-pachon-in-motion-426015731-15475087.jpg',
    slide1: '/images/login/pexels-pachon-in-motion-426015731-15475036.jpg',
    slide2: '/images/login/pexels-pachon-in-motion-426015731-15475058.jpg',
  },

  // Register page
  register: {
    logo: '/images/register/Logo WoBg.png',
    background: '/images/register/pexels-googledeepmind-18069157.jpg',
  },
  
  // Projects
  projects: {
    // TODO: Agregar cuando estén disponibles
  },
  
  // Team
  team: {
    alex: '/images/about/alex.png',
    mora: '/images/about/mora.jpg',
    brayan: '/images/about/trbureiyan.png',
    // TODO: Agregar cuando estén disponibles
  },

  // About
  about: {
    background: '/images/about/pexels-pachon-in-motion-426015731-15474593.jpg',
    missionIllustration: '/images/about/blueAbstractCube.svg',
    visionIllustration: '/images/about/VRGuy.svg',
  },
} as const;

// Type helper para autocomplete
export type ImagePath = typeof IMAGES;