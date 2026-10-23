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
    title: "Prepaid Visa",
    description: "Works anywhere Visa is accepted — online and in store.",
  },
  {
    number: "02",
    title: "No credit check, no bank account required",
    description:
      "We don't care about your credit history. If you pass KYC, you get a card.",
  },
  {
    number: "03",
    title: "Virtual card issued instantly after KYC",
    description:
      "Complete identity verification and your virtual card is ready in minutes.",
  },
  {
    number: "04",
    title: "Physical card available",
    description:
      "Order a physical mavi card delivered to your door — dark themed, mavi branded.",
  },
  {
    number: "05",
    title: "Flexible top-up options",
    description:
      "Top up via bank transfer, crypto, or your mavi finans account.",
  },
];

export function CardContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        {/* Card accent gradient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(7,132,181,0.16), transparent 70%), radial-gradient(ellipse 40% 30% at 40% 60%, rgba(7,132,181,0.06), transparent 50%)",
          }}
        />

        {/* Coming soon shimmer badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-1.5"
          style={{
            backgroundColor: "rgba(65,76,80,0.6)",
            borderColor: "rgba(69,177,232,0.2)",
            backgroundImage:
              "linear-gradient(110deg, transparent 25%, rgba(69,177,232,0.08) 50%, transparent 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2.5s ease-in-out infinite",
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
            color: "#0784b5",
          }}
        >
          mavi card
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          A card that works when others won't.
        </motion.p>
      </section>

      {/* Card visual */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-16 md:py-24"
      >
        <div className="mx-auto flex max-w-md justify-center">
          <div
            className="relative flex h-52 w-80 flex-col justify-between rounded-2xl p-6 md:h-56 md:w-96"
            style={{
              backgroundColor: "#192428",
              border: "1px solid rgba(7,132,181,0.35)",
              boxShadow:
                "0 0 60px rgba(7,132,181,0.15), 0 0 120px rgba(7,132,181,0.05)",
            }}
          >
            {/* Card chip placeholder */}
            <div className="flex items-start justify-between">
              <div
                className="h-8 w-11 rounded-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(69,177,232,0.3), rgba(7,132,181,0.5))",
                }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(69,177,232,0.5)" }}
              >
                Visa
              </span>
            </div>

            {/* Card number placeholder */}
            <div className="space-y-1">
              <p
                className="font-mono text-sm tracking-[0.25em]"
                style={{ color: "rgba(207,208,209,0.4)" }}
              >
                **** **** **** ****
              </p>
            </div>

            {/* Card name */}
            <div className="flex items-end justify-between">
              <span
                className="text-sm font-bold tracking-wide"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  color: "#0784b5",
                }}
              >
                mavi card
              </span>
              <span
                className="text-[10px] uppercase tracking-widest"
                style={{ color: "rgba(207,208,209,0.3)" }}
              >
                Prepaid
              </span>
            </div>
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
            Built for the people banks forgot
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.number}
                variants={fadeUp}
                className="group relative rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(7,132,181,0.35)]"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "rgba(7,132,181,0.25)",
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
          className="inline-flex h-12 items-center justify-center rounded-xl px-10 text-sm font-semibold text-white no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(7,132,181,0.3)]"
          style={{ backgroundColor: "#0784b5" }}
        >
          Join the waitlist
        </Link>
      </motion.section>

      {/* Shimmer keyframe */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
