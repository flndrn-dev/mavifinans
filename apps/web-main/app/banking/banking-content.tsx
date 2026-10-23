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
    title: "Real EU IBAN account",
    description:
      "A proper European bank account with your own IBAN — accepted everywhere.",
  },
  {
    number: "02",
    title: "SEPA transfers across Europe",
    description:
      "Send and receive euros across the entire SEPA zone — fast and affordable.",
  },
  {
    number: "03",
    title: "Global payments via SWIFT & Wise",
    description:
      "Reach 80+ countries with international transfers at competitive rates.",
  },
  {
    number: "04",
    title: "Debit card included",
    description:
      "A debit card linked to your mavi finans account — spend anywhere.",
  },
  {
    number: "05",
    title: "No minimum balance, no hidden fees",
    description:
      "Transparent pricing. No surprise charges. No minimum balance requirement.",
  },
];

export function BankingContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        {/* Finans accent gradient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(69,177,232,0.14), transparent 70%), radial-gradient(ellipse 40% 30% at 40% 60%, rgba(69,177,232,0.06), transparent 50%)",
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
          mavi finans
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          A real bank account. No questions asked.
        </motion.p>
      </section>

      {/* IBAN visual */}
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
            <p
              className="mb-2 text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: "#8899aa" }}
            >
              Your EU IBAN
            </p>
            <p
              className="font-mono text-xl tracking-[0.15em] md:text-2xl"
              style={{ color: "#45b1e8" }}
            >
              BE68 ****&nbsp;****&nbsp;****
            </p>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "#8899aa" }}
            >
              A real European IBAN — accepted by employers, landlords, tax
              offices, and every payment system in the SEPA zone.
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
            Banking without barriers
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
