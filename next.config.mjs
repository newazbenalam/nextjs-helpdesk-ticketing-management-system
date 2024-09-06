/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'demos.creative-tim.com',
        pathname: '**',
      },
    ],
  },
  poweredByHeader: false,
  cleanDistDir: true,
  crossOrigin: 'anonymous',
  env: {
    HOSTNAME: 'localhost',
  },
  logging: {
    level: 'info',
  },
  reactStrictMode: false,
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
  // distDir: 'build',
  output: 'standalone',
  //output: 'export',
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  headers: () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'powerBy',
            value: 'Neo',
          },
        ],
      },
    ];
  }
};

export default nextConfig;