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
  reactStrictMode: false

};

export default nextConfig;
