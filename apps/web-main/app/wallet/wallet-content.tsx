"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const features = [
  {
    number: "01",
    title: "Non-custodial",
    description:
      "Your keys, your crypto. mavi wallet never stores your private keys.",
  },
  {
    number: "02",
    title: "Multi-chain support",
    description:
      "Ethereum, Bitcoin, and more. Manage all your assets in one place.",
  },
  {
    number: "03",
    title: "Swap tokens without leaving the app",
    description:
      "Exchange between assets directly inside mavi wallet — no external exchanges needed.",
  },
  {
    number: "04",
    title: "On/off-ramp between crypto and fiat",
    description:
      "Buy crypto with euros or cash out to your bank — all within the app.",
  },
  {
    number: "05",
    title: "Seed phrase backup",
    description:
      "You control everything. Back up your seed phrase and recover your wallet anywhere.",
  },
];

export function WalletContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        {/* Wallet accent gradient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(69,177,232,0.14), transparent 70%), radial-gradient(ellipse 40% 30% at 60% 60%, rgba(69,177,232,0.06), transparent 50%)",
          }}
        />

        {/* Coming soon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            backgroundColor: "rgba(65,76,80,0.6)",
            borderColor: "rgba(69,177,232,0.2)",
          }}
        >
          <span
            className="text-xs font-semibold"
            style={{ color: "#8899aa" }}
          >
            Coming soon
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            color: "#45b1e8",
          }}
        >
          mavi wallet
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Your crypto. Nobody else&apos;s.
        </motion.p>
      </section>

      {/* Your keys visual element */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-md">
          <div
            className="relative flex flex-col items-center rounded-2xl border p-10 text-center backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(69,177,232,0.12)",
            }}
          >
            {/* Lock visual */}
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(69,177,232,0.15), rgba(69,177,232,0.05))",
                border: "1px solid rgba(69,177,232,0.2)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#45b1e8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>

            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                color: "#45b1e8",
              }}
            >
              Your keys. Your crypto.
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "#8899aa" }}
            >
              Private keys never leave your device. mavi wallet is
              non-custodial by design — we can never access, freeze, or move
              your assets.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <motion.h2
            variants={fadeUp}
            className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "#ffffff",
            }}
          >
            Everything in one wallet
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.number}
                variants={fadeUp}
                className="group relative rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(69,177,232,0.3)]"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "rgba(69,177,232,0.2)",
                  }}
                >
                  {feature.number}
                </span>
                <h3
                  className="mt-3 text-lg font-semibold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "#cfd0d1",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#8899aa" }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-24 text-center md:py-32"
      >
        <Link
          href="/waitlist"
          className="inline-flex h-12 items-center justify-center rounded-xl px-10 text-sm font-semibold text-white no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(69,177,232,0.3)]"
          style={{ backgroundColor: "#45b1e8" }}
        >
          Join the waitlist
        </Link>
      </motion.section>
    </div>
  );
}
