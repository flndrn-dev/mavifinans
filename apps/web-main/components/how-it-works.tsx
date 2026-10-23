"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Sign up in minutes",
    description:
      "Create your account with just an email. No credit checks, no bank history required. Start browsing immediately.",
  },
  {
    number: "02",
    title: "Verify your identity",
    description:
      "Complete KYC through Sumsub — fast, secure, and supporting 195 countries. Choose your tier based on what you need.",
  },
  {
    number: "03",
    title: "Access the full ecosystem",
    description:
      "Open a bank account, order a prepaid card, set up your crypto wallet, or start accepting payments — all from one place.",
  },
];

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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 text-center"
      >
        <h2
          className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          style={{
            color: "var(--mavi-text)",
            fontFamily: "'Clash Display', sans-serif",
          }}
        >
          How it works
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-base"
          style={{ color: "var(--mavi-text-muted)" }}
        >
          From signup to fully operational in three steps. No paperwork, no
          branch visits, no waiting weeks for approval.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative"
      >
        {/* Vertical timeline line */}
        <div
          className="absolute left-[23px] top-0 hidden h-full w-px md:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(69,177,232,0.4), rgba(69,177,232,0.05))",
          }}
          aria-hidden="true"
        />

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative flex gap-6 md:pl-2"
            >
              {/* Timeline dot */}
              <div
                className="relative z-10 mt-1 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full md:flex"
                style={{
                  background: `rgba(69,177,232,${0.12 + index * 0.08})`,
                  border: "1px solid rgba(69,177,232,0.25)",
                }}
              >
                <span
                  className="text-sm font-bold"
                  style={{
                    color: "#45b1e8",
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Content card */}
              <div
                className="flex-1 rounded-2xl border p-6 backdrop-blur-xl md:p-8"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                }}
              >
                <span
                  className="mb-2 inline-block text-xs font-bold md:hidden"
                  style={{ color: "#45b1e8" }}
                >
                  Step {step.number}
                </span>
                <h3
                  className="text-xl font-bold"
                  style={{
                    color: "#ffffff",
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 leading-relaxed"
                  style={{ color: "var(--mavi-text-muted)" }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
