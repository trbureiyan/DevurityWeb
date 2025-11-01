// TS "Barrel Export" para rutas de imágenes

export const ICONS = {
    // HeroIcons
    hero: {
        check: '/icons/heroicons/check.svg',
        user: '/icons/heroicons/user.svg',
    },
} as const;

// Type helper para autocomplete
export type ImagePath = typeof ICONS;