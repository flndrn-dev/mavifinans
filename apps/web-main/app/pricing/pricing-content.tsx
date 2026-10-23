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
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const products = [
  {
    name: "mavi pay",
    accent: "#E05C45",
    status: "live" as const,
    tiers: [
      {
        name: "Free",
        price: "2% per transaction",
        description: "Everything you need to accept payments.",
      },
      {
        name: "Pro",
        price: "\u20AC9.99/mo",
        description: "Lower transaction rates and priority support.",
      },
    ],
  },
  {
    name: "mavi card",
    accent: "#0784b5",
    status: "coming_soon" as const,
    tiers: [
      {
        name: "Monthly fee TBD",
        price: "Coming soon",
        description: "Prepaid Visa with no credit check required.",
      },
    ],
  },
  {
    name: "mavi wallet",
    accent: "#45b1e8",
    status: "coming_soon" as const,
    tiers: [
      {
        name: "Free",
        price: "Free",
        description: "Non-custodial crypto wallet — your keys, your crypto.",
      },
    ],
  },
  {
    name: "mavi finans",
    accent: "#45b1e8",
    status: "coming_soon" as const,
    tiers: [
      {
        name: "Free",
        price: "Free",
        description: "Basic EU IBAN account with SEPA transfers.",
      },
      {
        name: "Premium",
        price: "TBD",
        description: "Higher limits, priority support, and global payments.",
      },
    ],
  },
];

export function PricingContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(69,177,232,0.1), transparent 70%)",
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "#ffffff" }}
        >
          Simple, transparent pricing
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          No hidden fees. No surprises.
        </motion.p>
      </section>

      {/* Pricing grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {products.map((product) => {
            const isComingSoon = product.status === "coming_soon";

            return (
              <motion.div
                key={product.name}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                  opacity: isComingSoon ? 0.75 : 1,
                }}
              >
                {/* Accent color bar */}
                <div
                  className="h-1"
                  style={{ backgroundColor: product.accent }}
                />

                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <h2
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "'Clash Display', sans-serif",
                        color: product.accent,
                      }}
                    >
                      {product.name}
                    </h2>

                    {product.status === "live" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(34,197,94,0.1)",
                          color: "#22C55E",
                        }}
                      >
                        <span className="relative flex h-2 w-2">
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                            style={{ backgroundColor: "#22C55E" }}
                          />
                          <span
                            className="relative inline-flex h-2 w-2 rounded-full"
                            style={{ backgroundColor: "#22C55E" }}
                          />
                        </span>
                        Live
                      </span>
                    ) : (
                      <span
                        className="rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(65,76,80,0.6)",
                          color: "#8899aa",
                        }}
                      >
                        Coming soon
                      </span>
                    )}
                  </div>

                  <div className="mt-6 space-y-5">
                    {product.tiers.map((tier) => (
                      <div key={tier.name}>
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-sm font-semibold"
                            style={{ color: "#cfd0d1" }}
                          >
                            {tier.name}
                          </span>
                          {tier.price !== tier.name && (
                            <span
                              className="text-sm"
                              style={{ color: "#8899aa" }}
                            >
                              — {tier.price}
                            </span>
                          )}
                        </div>
                        <p
                          className="mt-1 text-sm leading-relaxed"
                          style={{ color: "#8899aa" }}
                        >
                          {tier.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
