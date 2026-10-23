"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  tagline: string;
  description: string;
  href: string;
  status: "live" | "coming_soon";
  accentColor: string;
}

export function ProductCard({
  name,
  tagline,
  description,
  href,
  status,
  accentColor,
}: ProductCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.25, ease: "easeOut" }}>
      <Link href={href} className="block no-underline">
        <div
          className="glass relative h-full overflow-hidden rounded-xl transition-all duration-300"
          style={{
            borderColor: "var(--mavi-border)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = `0 0 24px ${accentColor}33, 0 0 48px ${accentColor}1a, inset 0 0 20px ${accentColor}08`;
            el.style.borderColor = `${accentColor}66`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.boxShadow = "none";
            el.style.borderColor = "var(--mavi-border)";
          }}
        >
          {/* Accent bar at top */}
          <div
            className="h-1 w-full"
            style={{ backgroundColor: accentColor }}
          />

          <div className="p-8">
            <div className="flex items-center justify-between">
              <h3
                className="text-lg font-bold"
                style={{
                  color: accentColor,
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                {name}
              </h3>

              {status === "live" ? (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.12)",
                    color: "#22C55E",
                  }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: "#22C55E",
                      animation: "glow-pulse 2s ease-in-out infinite",
                    }}
                  />
                  Live
                </span>
              ) : (
                <span
                  className="relative inline-flex items-center overflow-hidden rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--mavi-bg-elevated)",
                    color: "var(--mavi-text-muted)",
                    border: "1px solid var(--mavi-border)",
                  }}
                >
                  Coming soon
                </span>
              )}
            </div>

            <p
              className="mt-2 text-sm font-semibold"
              style={{ color: "var(--mavi-text)" }}
            >
              {tagline}
            </p>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: "var(--mavi-text-muted)" }}
            >
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
