import type { NextConfig } from "next";

/** Set GITHUB_PAGES=true in CI for project Pages at /Horse-edu */
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGitHubPages ? "/Horse-edu" : "";

const nextConfig: NextConfig = {
  // next/image does not always prefix basePath for unoptimized static assets
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
  images: {
    unoptimized: true,
  },
  // Static export is incompatible with PPR / connection()-driven dynamic shells
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
