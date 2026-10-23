import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@mavi/ui'],
  async redirects() {
    return [{ source: '/for-creator', destination: '/for-creators', permanent: true }];
  },
};

export default nextConfig;
