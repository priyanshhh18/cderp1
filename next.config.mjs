// @ts-check
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
})({
  // Your Next.js config

  // Environment variables
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },

  // ✅ Image configuration
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "blog-page-panel.onrender.com",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: [
      "i.imgur.com",
      "imgur.com",
      "blog-page-panel.onrender.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
    ],
  },

  // ✅ Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    // Enable React 18 features
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Enable production optimizations
  productionBrowserSourceMaps: false,
  
  // Enable SWC minification (faster than Terser)
  swcMinify: true,
  
  experimental: {
    // @ts-ignore - This is a valid experimental flag
    optimizeCss: true,
    // @ts-ignore - This is a valid experimental flag
    optimizePackageImports: [
      'react-icons',
      'framer-motion',
      'lucide-react',
      '@radix-ui',
    ],
  },

  // ✅ Headers
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(jpg|jpeg|gif|png|svg|webp|avif|ico|css|js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Content-Type",
            value: "application/manifest+json",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },

      // 🚨 Sensitive pages → crawling off
      {
        source: "/AdminLogin",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet, noarchive",
          },
        ],
      },
      {
        source: "/dashboard/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet, noarchive",
          },
        ],
      },
      {
        source: "/superadmin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, nosnippet, noarchive",
          },
        ],
      },
    ];
  },

  // ✅ Rewrites
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap.xml",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots.txt",
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "dashboard.connectingdotserp.com",
          },
        ],
        destination: "/dashboard",
      },
    ];
  },

  // ✅ Redirects
  async redirects() {
    return [
      {
        source: "/hr-courses-training-institute-in-pune",
        destination: "/hr-training-course-in-pune",
        permanent: true,
      },
    ];
  },
  // Add any other configurations here
});

export default nextConfig;
