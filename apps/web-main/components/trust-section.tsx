"use client";

import { motion } from "framer-motion";

const trustPoints = [
  {
    title: "EU-regulated partners",
    description:
      "Banking through Swan.io (licensed by Banque de France). Cards through Wallester (licensed by Bank of Lithuania). Real licenses, real oversight.",
  },
  {
    title: "Non-custodial wallet",
    description:
      "Your private keys stay on your device. mavi finans never has access to your crypto. If we disappeared tomorrow, your funds would still be yours.",
  },
  {
    title: "OFAC & sanctions screening",
    description:
      "Every transaction is screened against international sanctions lists via Chainalysis. We take compliance seriously — it protects everyone.",
  },
  {
    title: "GDPR-first data handling",
    description:
      "KYC handled by Sumsub, an EU-compliant identity provider. We collect only what is legally required. Your data is never sold.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function TrustSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14 text-center"
      >
        <h2
          className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          style={{
            color: "var(--mavi-text)",
            fontFamily: "'Clash Display', sans-serif",
          }}
        >
          Trust is earned
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-base"
          style={{ color: "var(--mavi-text-muted)" }}
        >
          We serve people the system forgot — which means we have to be more
          careful, not less. Here is how we keep things safe.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {trustPoints.map((point) => (
          <motion.div
            key={point.title}
            variants={itemVariants}
            className="rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(69,177,232,0.12)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(69,177,232,0.30)";
              el.style.boxShadow =
                "0 0 20px rgba(69, 177, 232, 0.10)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "rgba(69,177,232,0.12)";
              el.style.boxShadow = "none";
            }}
          >
            <div
              className="mb-4 h-2 w-2 rounded-full"
              style={{ backgroundColor: "#45b1e8" }}
            />
            <h3
              className="mb-3 text-lg font-bold"
              style={{
                color: "#ffffff",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {point.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--mavi-text-muted)" }}
            >
              {point.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
