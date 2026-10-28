/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Static export: emit to ./out. Deployable to any static host (or your own pipeline).
  trailingSlash: true,
};

export default nextConfig;
