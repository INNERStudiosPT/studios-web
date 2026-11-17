import type { NextConfig } from "next";
import { execSync } from "node:child_process";
import pkg from "./package.json";

// The version Faro reports: the deployed git sha, or the package version when
// the build does not run from a git checkout.
function appVersion(): string {
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return pkg.version;
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || appVersion(),
  },
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
};

export default nextConfig;
