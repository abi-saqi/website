/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@saqi/ui", "@saqi/i18n", "@saqi/permissions", "@saqi/api-client"],
};

export default nextConfig;
