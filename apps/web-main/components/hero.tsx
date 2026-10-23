"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const words = ["Financial", "freedom", "for", "the", "unbanked."];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center md:py-40 lg:py-52 overflow-hidden">
      {/* Animated gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(69, 177, 232, 0.12), transparent 70%), radial-gradient(ellipse 50% 40% at 30% 60%, rgba(7, 132, 181, 0.08), transparent 60%), radial-gradient(ellipse 40% 30% at 70% 70%, rgba(69, 177, 232, 0.06), transparent 50%)",
        }}
      />

      {/* Floating decorative orbs */}
      <div
        className="pointer-events-none absolute top-1/4 left-[15%] h-48 w-48 rounded-full blur-[100px]"
        style={{
          backgroundColor: "rgba(69, 177, 232, 0.15)",
          animation: "float 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-[10%] h-64 w-64 rounded-full blur-[120px]"
        style={{
          backgroundColor: "rgba(7, 132, 181, 0.12)",
          animation: "float 8s ease-in-out infinite 2s",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-[60%] left-[60%] h-32 w-32 rounded-full blur-[80px]"
        style={{
          backgroundColor: "rgba(69, 177, 232, 0.10)",
          animation: "float 7s ease-in-out infinite 1s",
        }}
        aria-hidden="true"
      />

      {/* Main blue glow behind heading */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
        style={{ backgroundColor: "rgba(69, 177, 232, 0.18)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-8">
        {/* Word-by-word animated headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-8xl"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={
                word === "freedom" || word === "unbanked."
                  ? "text-gradient-blue"
                  : ""
              }
              style={{
                color:
                  word === "freedom" || word === "unbanked."
                    ? undefined
                    : "#ffffff",
                display: "inline-block",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: "var(--mavi-text-muted)" }}
        >
          Bank accounts, prepaid cards, crypto wallets, and payment processing
          — built for the people traditional banks leave behind.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 0.9 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/waitlist"
              className="inline-flex h-12 items-center justify-center rounded-lg px-8 text-sm font-semibold text-white no-underline transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "var(--mavi-blue)",
                boxShadow:
                  "0 0 20px rgba(69, 177, 232, 0.30), 0 0 40px rgba(69, 177, 232, 0.15)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 30px rgba(69, 177, 232, 0.50), 0 0 60px rgba(69, 177, 232, 0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px rgba(69, 177, 232, 0.30), 0 0 40px rgba(69, 177, 232, 0.15)";
              }}
            >
              Join the waitlist
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <a
              href="#products"
              className="inline-flex h-12 items-center justify-center rounded-lg border px-8 text-sm font-semibold no-underline transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "var(--mavi-border-strong)",
                color: "var(--mavi-text)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#45b1e8";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 15px rgba(69, 177, 232, 0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--mavi-border-strong)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              Explore products
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
