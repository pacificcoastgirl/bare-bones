import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    tsconfigPath: 'tsconfig.build.json',
  },
};

export default nextConfig;
