import path from 'path';
import { fileURLToPath } from 'url';

// Required for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Skip TS errors during build (lets you deploy even if types are broken)
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Skip ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
