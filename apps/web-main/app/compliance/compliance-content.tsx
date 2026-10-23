"use client";

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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const kycTiers = [
  {
    tier: "Tier 0",
    requirement: "Email only",
    access: "Limited access — browse products, no transactions.",
  },
  {
    tier: "Tier 1",
    requirement: "Basic KYC (ID document)",
    access: "Full product access with limits up to \u20AC2,000/month.",
  },
  {
    tier: "Tier 2",
    requirement: "Extended KYC (ID + selfie + proof of address)",
    access: "Full access with limits up to \u20AC15,000/month.",
  },
];

const blockedJurisdictions = [
  "Iran",
  "North Korea",
  "Russia",
  "Cuba",
  "Syria",
  "Belarus",
  "Myanmar",
  "Venezuela (government)",
  "Sudan",
  "Yemen (Houthi controlled)",
];

export function ComplianceContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(69,177,232,0.08), transparent 70%)",
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "#ffffff" }}
        >
          Compliance & Security
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Trust is earned. Here is how we handle identity, sanctions, and your
          data.
        </motion.p>
      </section>

      {/* KYC Tiers — timeline style */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <motion.h2
            variants={fadeUp}
            className="mb-16 text-center text-3xl font-bold tracking-tight md:text-4xl"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "#ffffff",
            }}
          >
            KYC Tiers
          </motion.h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div
              className="absolute left-[19px] top-0 h-full w-px"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(69,177,232,0.3), rgba(69,177,232,0.05))",
              }}
            />

            <div className="space-y-8">
              {kycTiers.map((tier, index) => (
                <motion.div
                  key={tier.tier}
                  variants={fadeUp}
                  className="relative flex gap-6 pl-2"
                >
                  {/* Timeline dot */}
                  <div
                    className="relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        index === 0
                          ? "rgba(69,177,232,0.15)"
                          : index === 1
                            ? "rgba(69,177,232,0.25)"
                            : "rgba(69,177,232,0.4)",
                      border: "1px solid rgba(69,177,232,0.3)",
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#45b1e8" }}
                    >
                      {index}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className="flex-1 rounded-2xl border p-6 backdrop-blur-xl"
                    style={{
                      backgroundColor: "rgba(45,56,60,0.5)",
                      borderColor: "rgba(69,177,232,0.12)",
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="text-sm font-bold"
                        style={{
                          fontFamily: "'Clash Display', sans-serif",
                          color: "#45b1e8",
                        }}
                      >
                        {tier.tier}
                      </span>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "#cfd0d1" }}
                      >
                        {tier.requirement}
                      </span>
                    </div>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "#8899aa" }}
                    >
                      {tier.access}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* OFAC Sanctions */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <div
            className="rounded-2xl border p-8 backdrop-blur-xl md:p-10"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(69,177,232,0.12)",
            }}
          >
            <h2
              className="text-2xl font-bold tracking-tight md:text-3xl"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                color: "#ffffff",
              }}
            >
              OFAC Sanctions Screening
            </h2>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: "#8899aa" }}
            >
              Every transaction is screened against OFAC sanctions lists via
              Chainalysis. High-risk or sanctioned transactions are automatically
              blocked and flagged for review.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Blocked Jurisdictions */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <motion.h2
            variants={fadeUp}
            className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "#ffffff",
            }}
          >
            Blocked Jurisdictions
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mb-8 text-sm"
            style={{ color: "#8899aa" }}
          >
            mavi finans does not serve users or process transactions from the
            following jurisdictions:
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="rounded-2xl border p-6 backdrop-blur-xl md:p-8"
            style={{
              backgroundColor: "rgba(239,68,68,0.04)",
              borderColor: "rgba(239,68,68,0.15)",
            }}
          >
            <div className="flex flex-wrap gap-3">
              {blockedJurisdictions.map((jurisdiction) => (
                <span
                  key={jurisdiction}
                  className="rounded-lg px-3 py-1.5 text-sm"
                  style={{
                    backgroundColor: "rgba(239,68,68,0.08)",
                    color: "rgba(239,68,68,0.7)",
                    border: "1px solid rgba(239,68,68,0.12)",
                  }}
                >
                  {jurisdiction}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Privacy */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <div
            className="rounded-2xl border p-8 backdrop-blur-xl md:p-10"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(69,177,232,0.12)",
            }}
          >
            <h2
              className="text-2xl font-bold tracking-tight md:text-3xl"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                color: "#ffffff",
              }}
            >
              Privacy
            </h2>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: "#8899aa" }}
            >
              Your data is never sold. KYC data is handled by Sumsub, an
              EU-compliant identity verification provider. We collect only what is
              legally required and nothing more.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <div
            className="rounded-2xl border p-8 backdrop-blur-xl md:p-10"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(69,177,232,0.12)",
            }}
          >
            <h2
              className="text-2xl font-bold tracking-tight md:text-3xl"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                color: "#ffffff",
              }}
            >
              Contact
            </h2>
            <p className="mt-4" style={{ color: "#8899aa" }}>
              Questions about compliance?{" "}
              <a
                href="/contact"
                className="underline transition-colors hover:opacity-80"
                style={{ color: "#45b1e8" }}
              >
                Get in touch
              </a>
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
