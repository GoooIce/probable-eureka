/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', 'i.pravatar.cc', 'icons.iconarchive.com']
  },
  experimental: {
    appDir: true,
    serverActions: true,
    serverComponentsExternalPackages: ['@tremor/react']
  }
};

module.exports = nextConfig;
