import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: false,
  functions: {
    website: {
      name: "Mavi Finans website API",
      source: "./functions/site.mjs",
      env: { MAVI_ORIGIN_SECRET: process.env.MAVI_ORIGIN_SECRET! },
    },
  },
  buckets: {
    assets: { access: "private" },
  },
  // Branch policy: per-branch tuning
  branch: (branch) => {
    if (branch.isDefault) {
      // Default branch: no overrides, uses project defaults
      return {};
    }
    if (!branch.exists) {
      // New non-default branches: auto-expire
      // Run `neon checkout <name>` to create a new branch with these settings
      return { ttl: "7d" };
    }
    // Existing branch: no changes
    return {};
  },
});
