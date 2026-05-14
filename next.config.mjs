/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable ESLint during builds — lint separately via `npm run lint`
  // This prevents style-only lint errors from blocking production deploys
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript build errors (tsc runs separately in CI)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
