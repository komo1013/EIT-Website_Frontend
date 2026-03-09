import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Set the correct workspace root to avoid lockfile confusion
  outputFileTracingRoot: path.join(__dirname),
  
  // Performance optimizations
  reactStrictMode: true,
  
  // Reduce build times
        //swcMinify: true,
  
  // Optimize font loading
        //optimizeFonts: true,
  
        /*eslint: {
          // Warning: This allows production builds to successfully complete even if
          // your project has ESLint errors.
          ignoreDuringBuilds: true,
        },*/
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  webpack(config) {
    // SVGR Support: Erlaubt import { Icon } from './icon.svg'
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    // WICHTIG: Ich habe den manuellen "splitChunks" Block entfernt.
    // Next.js 16 optimiert das automatisch. Die alte Config verursacht
    // Fehler wie "originalFactory is undefined".
    
    return config;
  }
};

export default nextConfig;