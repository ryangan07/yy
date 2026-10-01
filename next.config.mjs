/** @type {import('next').NextConfig} */

const FIREBASE_AUTH_DOMAIN = "https://yy-property.firebaseapp.com";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com https://apis.google.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://*.googleapis.com https://api.cloudinary.com https://apis.google.com",
  `frame-src https://accounts.google.com ${FIREBASE_AUTH_DOMAIN} https://apis.google.com https://public.tableau.com`,
  "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://images.unsplash.com",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@grpc/grpc-js", "@grpc/proto-loader"],
  },
};

export default nextConfig;
