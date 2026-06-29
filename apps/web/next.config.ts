import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@field-guide/shared-types'],
};

export default nextConfig;
