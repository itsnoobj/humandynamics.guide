import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Emit a fully static site into `out/` for GitHub Pages.
  output: 'export',
  // GitHub Pages has no Next.js image optimizer, so serve images as-is.
  images: { unoptimized: true },
  // Deployed to the custom domain `humandynamics.guide` (see public/CNAME),
  // so the site is served from the domain root — no basePath needed. If this
  // is ever served from `https://<user>.github.io/<repo>/`, set:
  //   basePath: '/humandynamics.guide',
  //   assetPrefix: '/humandynamics.guide/',
  transpilePackages: ['@field-guide/shared-types'],
};

export default nextConfig;
