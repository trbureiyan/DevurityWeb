// TS "Barrel Export" para rutas de imágenes

export const IMAGES = {
  // Landing
  landing: {
    banner: '/images/landing/wave-background.jpg',
    devBG: '/images/landing/pexels-simonptr-33607952.jpg',
    urityBG: '/images/landing/pexels-googledeepmind-17483910.jpg',
    cuboAbstracto: '/images/landing/abstractCubeEdit.svg',
  },
  
  // Logo
  logo: {
    main: '/images/logo/RoundyBIGLogoWBgOnly.png',
    icon: '/images/logo/icon.svg',
  },
  
  // Projects
  projects: {
    // TODO: Agregar cuando estén disponibles
  },
  
  // Team
  team: {
    // TODO: Agregar cuando estén disponibles
  },
} as const;

// Type helper para autocomplete
export type ImagePath = typeof IMAGES;