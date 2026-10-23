"use client";

import { motion } from "framer-motion";

const audiences = [
  {
    title: "Debanked individuals",
    description:
      "Refused by every bank? We don't ask why. mavi finans exists because the current system excludes too many people for reasons that have nothing to do with risk.",
  },
  {
    title: "Freelancers & creators",
    description:
      "Get paid from anywhere, spend locally. Accept payments through mavi pay, receive into your IBAN, and use your mavi card — one integrated flow.",
  },
  {
    title: "Crypto-native users",
    description:
      "Bridge your crypto to the real world. Hold your own keys in mavi wallet, off-ramp to your mavi card, and spend fiat anywhere Visa works.",
  },
  {
    title: "Expats & digital nomads",
    description:
      "Banking that follows you, not your address. A European IBAN, a card that works globally, and no branch visits required — ever.",
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

export function WhoIsMaviFor() {
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
          Built for the overlooked
        </h2>
        <p
          className="mx-auto mt-4 max-w-xl text-base"
          style={{ color: "var(--mavi-text-muted)" }}
        >
          Traditional banks decide who gets to participate in the economy. We
          believe that choice should be yours.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {audiences.map((item, index) => (
          <motion.div
            key={item.title}
            variants={{
              hidden: {
                opacity: 0,
                x: index % 2 === 0 ? -40 : 40,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                },
              },
            }}
            className="glass group relative overflow-hidden rounded-xl p-8 transition-all duration-300"
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow =
                "0 0 20px rgba(69, 177, 232, 0.15), inset 0 0 20px rgba(69, 177, 232, 0.05)";
              el.style.borderColor = "rgba(69, 177, 232, 0.30)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "none";
              el.style.borderColor = "rgba(69, 177, 232, 0.12)";
            }}
          >
            {/* Large decorative number */}
            <span
              className="pointer-events-none absolute top-4 right-6 text-6xl font-bold select-none"
              style={{
                color: "rgba(69, 177, 232, 0.06)",
                fontFamily: "'Clash Display', sans-serif",
              }}
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3
              className="relative z-10 mb-3 text-lg font-bold"
              style={{
                color: "var(--mavi-text)",
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {item.title}
            </h3>
            <p
              className="relative z-10 text-sm leading-relaxed"
              style={{ color: "var(--mavi-text-muted)" }}
            >
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
