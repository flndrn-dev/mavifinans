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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const features = [
  {
    number: "01",
    title: "2% transaction fee",
    description:
      "Industry standard is 4% or more. mavi pay keeps it simple and fair.",
  },
  {
    number: "02",
    title: "Subscriptions & one-time payments",
    description:
      "Sell products, services, or recurring plans — all from one dashboard.",
  },
  {
    number: "03",
    title: "Checkout links & embeddable widgets",
    description:
      "Generate a link or drop a widget on your site. Start accepting payments in minutes.",
  },
  {
    number: "04",
    title: "Merchant dashboard with analytics",
    description:
      "Track revenue, orders, customers, and payouts in real time.",
  },
  {
    number: "05",
    title: "Webhook & API for developers",
    description:
      "Integrate mavi pay into any workflow with webhooks and a clean REST API.",
  },
];

export function PayContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        {/* Coral gradient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(224,92,69,0.14), transparent 70%), radial-gradient(ellipse 40% 30% at 60% 60%, rgba(224,92,69,0.06), transparent 50%)",
          }}
        />

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            backgroundColor: "rgba(34,197,94,0.08)",
            borderColor: "rgba(34,197,94,0.25)",
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: "#22C55E" }}
            />
            <span
              className="relative inline-flex h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#22C55E" }}
            />
          </span>
          <span className="text-xs font-semibold" style={{ color: "#22C55E" }}>
            Live
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            color: "#E05C45",
          }}
        >
          mavi pay
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Accept payments. Get paid instantly.
        </motion.p>
      </section>

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
            Everything you need to get paid
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.number}
                variants={fadeUp}
                className="group relative rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,92,69,0.1)]"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(224,92,69,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(69,177,232,0.12)";
                }}
              >
                <span
                  className="text-3xl font-bold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "rgba(224,92,69,0.25)",
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

      {/* CTA — Early access */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-24 text-center md:py-32"
      >
        <div className="mx-auto max-w-lg">
          <div
            className="rounded-2xl border p-8 backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(224,92,69,0.2)",
            }}
          >
            <h3
              className="text-lg font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                color: "#E05C45",
              }}
            >
              Early access
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#8899aa" }}>
              mavi pay is currently in early access. We&apos;re onboarding merchants
              in small batches to ensure a smooth experience. Join the waitlist
              to be notified when it&apos;s your turn.
            </p>
            <a
              href="/waitlist"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-xl px-10 text-sm font-semibold text-white no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,92,69,0.3)] hover:scale-105"
              style={{ backgroundColor: "#E05C45" }}
            >
              Join waitlist
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
