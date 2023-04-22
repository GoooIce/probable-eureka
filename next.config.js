/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', 'i.pravatar.cc']
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  }
};

module.exports = nextConfig;
