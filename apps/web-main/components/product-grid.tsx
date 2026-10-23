"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product-card";

const products = [
  {
    name: "mavi pay",
    tagline: "Accept payments. Get paid instantly.",
    description:
      "Merchant payment processing with competitive rates. Financial partner processing and a full dashboard to manage your business.",
    href: "/pay",
    status: "live" as const,
    accentColor: "#45b1e8",
  },
  {
    name: "Handlr",
    tagline: "Let your audience fund your work.",
    description:
      "Your creator payments, handled by Handlr. A free branded page for one-off audience support, with a fair platform fee from 1% to a maximum of 3%.",
    href: "/handlr",
    status: "live" as const,
    accentColor: "#7FE6CF",
  },
  {
    name: "mavi card",
    tagline: "A card that works when others won't.",
    description:
      "Prepaid Visa card via Wallester. Load with bank transfer or crypto. Spend anywhere Visa is accepted, online and in-store.",
    href: "/card",
    status: "coming_soon" as const,
    accentColor: "#45b1e8",
  },
  {
    name: "mavi wallet",
    tagline: "Your crypto. Nobody else's.",
    description:
      "Non-custodial wallet where you hold the keys. Send, receive, and swap across multiple networks. We never touch your funds.",
    href: "/wallet",
    status: "coming_soon" as const,
    accentColor: "#45b1e8",
  },
  {
    name: "mavi finans",
    tagline: "A real bank account. No questions asked.",
    description:
      "Full EU banking via Swan.io. Get a real IBAN, send and receive SEPA transfers, and manage your money with a licensed banking partner.",
    href: "/banking",
    status: "coming_soon" as const,
    accentColor: "#45b1e8",
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
  hidden: { opacity: 0, filter: "blur(10px)", y: 24 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ProductGrid() {
  return (
    <section id="products" className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
      {/* Decorative blurred circle behind grid */}
      <div
        className="pointer-events-none absolute top-1/2 left-[60%] h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{ backgroundColor: "rgba(69, 177, 232, 0.08)" }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mb-14 text-center"
      >
        <h2
          className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          style={{
            color: "var(--mavi-text)",
            fontFamily: "'Clash Display', sans-serif",
          }}
        >
          One ecosystem, five products
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl text-base"
          style={{ color: "var(--mavi-text-muted)" }}
        >
          Everything you need to participate in the modern economy — whether
          you were turned away by a bank or simply prefer a better alternative.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {products.map((product, i) => (
          <motion.div
            key={product.name}
            variants={itemVariants}
            className={i === products.length - 1 ? "md:col-span-2 md:mx-auto md:max-w-[calc(50%-12px)]" : ""}
          >
            <ProductCard {...product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
