import type { NextConfig } from "next";

// Definición de headers de seguridad HTTP
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  { // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(), geolocation=()",
  },
{ // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Necesario para Next.js
      "style-src 'self' 'unsafe-inline'", // Necesario para estilos inline
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Optimización de imágenes
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Headers de seguridad HTTP
  async headers() {
    return [
      {
        // All routes
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  
  // Deshabilitar el header X-Powered-By para no exponer tecnología
  poweredByHeader: false,
};

export default nextConfig;
