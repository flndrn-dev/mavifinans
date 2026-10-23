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

type PricingProduct = {
  name: string;
  accent: string;
  status: "live" | "coming_soon";
  href?: string;
  tiers: { name: string; price: string; description: string }[];
};

const products: PricingProduct[] = [
  {
    name: "mavi pay",
    accent: "#45B1E8",
    status: "live" as const,
    href: "https://mavipay.eu",
    tiers: [
      {
        name: "Free",
        price: "€0/mo",
        description: "5% per sale for personal accounts; 4% for businesses.",
      },
      {
        name: "Pro",
        price: "€9–€29/mo",
        description: "Personal: €9/mo + 3% per sale. Business: €29/mo + 2%.",
      },
    ],
  },
  {
    name: "Handlr",
    accent: "#7FE6CF",
    status: "live",
    href: "https://handlr.sh",
    tiers: [
      {
        name: "Creator page",
        price: "Free",
        description: "Your creator payments, handled by Handlr.",
      },
      {
        name: "Platform fee",
        price: "1–3% per payment",
        description: "A fair platform fee, from 1% to a maximum of 3%.",
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
        <div className="mx-auto grid max-w-5xl auto-rows-fr gap-6 sm:grid-cols-2">
          {products.map((product, index) => {
            const isComingSoon = product.status === "coming_soon";
            const isLastOddCard = products.length % 2 === 1 && index === products.length - 1;

            return (
              <motion.div
                key={product.name}
                variants={fadeUp}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${isLastOddCard ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[calc(50%-12px)]" : ""}`}
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                  opacity: isComingSoon ? 0.75 : 1,
                }}
              >
                {/* Live products share the same green status bar. */}
                <div
                  className="h-1 shrink-0"
                  style={{ backgroundColor: product.status === "live" ? "#22C55E" : product.accent }}
                />

                <div className="grid flex-1 grid-rows-[3.5rem_1fr_1.25rem] gap-6 p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
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
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
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
                        className="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: "rgba(65,76,80,0.6)",
                          color: "#8899aa",
                        }}
                      >
                        Coming soon
                      </span>
                    )}
                  </div>

                  <div className="grid grid-rows-2 gap-6">
                    {product.tiers.map((tier) => (
                      <div key={tier.name}>
                        <div className="flex min-h-10 flex-wrap content-start items-baseline gap-x-2">
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

                  <Link
                    href={product.href ?? "/waitlist"}
                    className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                    style={{ color: product.accent }}
                  >
                    {product.href ? `Visit ${product.name}` : "Join the waitlist"}
                    {product.href && <span aria-hidden="true">↗</span>}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        <p className="mx-auto mt-6 max-w-5xl text-center text-xs leading-relaxed" style={{ color: "#8899aa" }}>
          Paid plans and launch rates for mavi pay are provisional. Payment gateway fees apply separately.
        </p>
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
