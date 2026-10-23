"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const apps = [
  {
    name: "mavi card",
    tagline: "A card that works when others won't.",
    apkPath: "/download/mavi-card.apk",
    accent: "#0784b5",
  },
  {
    name: "mavi wallet",
    tagline: "Your crypto. Nobody else's.",
    apkPath: "/download/mavi-wallet.apk",
    accent: "#45b1e8",
  },
  {
    name: "mavi finans",
    tagline: "A real bank account. No questions asked.",
    apkPath: "/download/mavi-banking.apk",
    accent: "#45b1e8",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function AppDownload() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14 text-center text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
        style={{
          color: "var(--mavi-text)",
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        Get the apps
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {apps.map((app) => (
          <motion.div
            key={app.name}
            variants={itemVariants}
            className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              backgroundColor: "var(--mavi-bg-surface)",
              border: "1px solid var(--mavi-border)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -1px 0 rgba(0,0,0,0.2)",
              minHeight: "280px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(69, 177, 232, 0.30)";
              el.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -1px 0 rgba(0,0,0,0.2), 0 0 24px ${app.accent}1a`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--mavi-border)";
              el.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -1px 0 rgba(0,0,0,0.2)";
            }}
          >
            {/* Coming soon badge with shimmer */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className="relative inline-flex items-center overflow-hidden rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "rgba(69, 177, 232, 0.12)",
                  color: "var(--mavi-blue)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(69, 177, 232, 0.15), transparent)",
                    animation: "gradient-shift 3s ease infinite",
                    backgroundSize: "200% 100%",
                  }}
                  aria-hidden="true"
                />
                <span className="relative">Coming soon</span>
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-8">
              <div>
                <h3
                  className="mb-2 text-lg font-bold"
                  style={{
                    color: "var(--mavi-text)",
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  {app.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--mavi-text-muted)" }}
                >
                  {app.tagline}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-2.5">
                <Button
                  disabled
                  className="w-full cursor-not-allowed rounded-xl opacity-40 font-semibold text-white"
                  style={{
                    backgroundColor: "var(--mavi-blue)",
                    color: "#ffffff",
                  }}
                >
                  Download for Android
                </Button>
                <Button
                  disabled
                  variant="outline"
                  className="w-full cursor-not-allowed rounded-xl opacity-40"
                  style={{
                    borderColor: "var(--mavi-border-strong)",
                    color: "var(--mavi-text)",
                  }}
                >
                  Add to Home Screen (iOS)
                </Button>
              </div>
            </div>

            {/* Bottom accent gradient */}
            <div
              className="h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${app.accent}00, ${app.accent}, ${app.accent}00)`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <p
        className="mt-8 text-center text-xs"
        style={{ color: "var(--mavi-text-muted)" }}
      >
        Android APKs served directly from mavifinans.eu/download/ — iOS via
        Progressive Web App.
      </p>
    </section>
  );
}
