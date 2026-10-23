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
    title: "One-time and recurring support",
    description:
      "Fans can buy you a coffee once or support you monthly. You decide which options to offer — flexible amounts, custom tiers, or both.",
  },
  {
    number: "02",
    title: "Your own creator page",
    description:
      "A personalised page at handlr.sh/you with your bio, links, and support options. Share one link, receive support from anywhere.",
  },
  {
    number: "03",
    title: "Embeddable widget",
    description:
      "Drop a \"handlr\" button or widget on your website, blog, or portfolio. One line of code, instant integration.",
  },
  {
    number: "04",
    title: "Custom support amounts",
    description:
      "Let supporters choose their own amount or set predefined tiers. No forced pricing — your community, your rules.",
  },
  {
    number: "05",
    title: "Built on mavi pay",
    description:
      "Stripe-powered payment processing. Low fees, instant processing, and reliable payouts.",
  },
  {
    number: "06",
    title: "Payouts to your mavi account",
    description:
      "Withdraw to your bank account via Stripe Connect. Fast, reliable, no waiting weeks for your money.",
  },
];

const audiences = [
  {
    title: "Content creators",
    description:
      "YouTubers, streamers, podcasters — let your audience fund the content they love without a paywall.",
  },
  {
    title: "Open source developers",
    description:
      "Maintain a project people rely on? Let them support your work directly, no corporate sponsorship required.",
  },
  {
    title: "Writers and journalists",
    description:
      "Independent writers, bloggers, newsletter authors — accept support from readers who value your work.",
  },
  {
    title: "Artists and musicians",
    description:
      "Sell nothing, earn everything. Let fans support your creative work on their own terms.",
  },
];

const comparison = [
  { feature: "Platform fee", supportedBy: "0%", others: "5%" },
  { feature: "Transaction fee", supportedBy: "2.9% + \u20AC0.30", others: "2.9% + \u20AC0.30" },
  { feature: "Payout to bank (IBAN)", supportedBy: "Min \u20AC10 (\u20AC0 to mavi finans)", others: "\u20AC5\u2013\u20AC25" },
  { feature: "Payout to card", supportedBy: "Min \u20AC25 (\u20AC0 to mavi card)", others: "No" },
  { feature: "Crypto payout", supportedBy: "Min \u20AC75", others: "No" },
  { feature: "Custom amounts", supportedBy: "Yes", others: "Limited" },
  { feature: "Embeddable widget", supportedBy: "Yes", others: "Yes" },
];

export function ForCreatorsContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(69,177,232,0.14), transparent 70%), radial-gradient(ellipse 40% 30% at 60% 60%, rgba(69,177,232,0.06), transparent 50%)",
          }}
        />

        {/* Coming soon badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 overflow-hidden rounded-full border px-4 py-1.5"
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
          style={{ fontFamily: "'Clash Display', sans-serif", color: "#ffffff" }}
        >
          supported by
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Let your audience fund your work. No paywall, no gatekeeping — just
          direct support from the people who believe in what you do.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-sm"
          style={{ color: "rgba(136,153,170,0.6)" }}
        >
          By the makers of mavi finans
        </motion.p>
      </section>

      {/* How it works visual */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-lg">
          <div
            className="relative flex flex-col items-center rounded-2xl border p-10 text-center backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(69,177,232,0.12)",
            }}
          >
            {/* Heart icon */}
            <div
              className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(69,177,232,0.15), rgba(69,177,232,0.05))",
                border: "1px solid rgba(69,177,232,0.2)",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#45b1e8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>

            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                color: "#45b1e8",
              }}
            >
              Create. Share. Get supported.
            </h3>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "#8899aa" }}
            >
              Set up your creator page in minutes. Share your unique link.
              Supporters contribute any amount they choose — one-time or
              monthly. You get paid directly to your mavi account.
            </p>

            {/* Mock URL */}
            <div
              className="mt-6 inline-flex items-center rounded-full px-5 py-2"
              style={{
                backgroundColor: "rgba(25,36,40,0.8)",
                border: "1px solid rgba(69,177,232,0.15)",
              }}
            >
              <span
                className="font-mono text-xs"
                style={{ color: "rgba(69,177,232,0.6)" }}
              >
                handlr.sh/
              </span>
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: "#45b1e8" }}
              >
                yourname
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
            Everything you need to get supported
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

      {/* Who is it for */}
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
            Built for creators who create
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {audiences.map((audience) => (
              <motion.div
                key={audience.title}
                variants={fadeUp}
                className="rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(69,177,232,0.3)]"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                }}
              >
                <h3
                  className="text-lg font-semibold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "#cfd0d1",
                  }}
                >
                  {audience.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "#8899aa" }}
                >
                  {audience.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Comparison table */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl">
          <h2
            className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "#ffffff",
            }}
          >
            How we compare
          </h2>

          <div
            className="overflow-hidden rounded-2xl border backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(45,56,60,0.5)",
              borderColor: "rgba(69,177,232,0.12)",
            }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-3 gap-4 px-6 py-4"
              style={{
                borderBottom: "1px solid rgba(69,177,232,0.12)",
                backgroundColor: "rgba(25,36,40,0.5)",
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#8899aa" }}
              />
              <span
                className="text-center text-xs font-bold uppercase tracking-wider"
                style={{
                  color: "#45b1e8",
                  fontFamily: "'Clash Display', sans-serif",
                }}
              >
                supported by
              </span>
              <span
                className="text-center text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#8899aa" }}
              >
                Others
              </span>
            </div>

            {/* Rows */}
            {comparison.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 gap-4 px-6 py-3.5"
                style={{
                  borderBottom:
                    i < comparison.length - 1
                      ? "1px solid rgba(69,177,232,0.06)"
                      : "none",
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: "#cfd0d1" }}
                >
                  {row.feature}
                </span>
                <span
                  className="text-center text-sm font-medium"
                  style={{ color: "#45b1e8" }}
                >
                  {row.supportedBy}
                </span>
                <span
                  className="text-center text-sm"
                  style={{ color: "#8899aa" }}
                >
                  {row.others}
                </span>
              </div>
            ))}
          </div>

          <p
            className="mt-4 text-center text-xs"
            style={{ color: "rgba(136,153,170,0.5)" }}
          >
            Comparison with Buy Me a Coffee, Ko-fi, and similar platforms.
          </p>
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
        <h2
          className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
          style={{
            fontFamily: "'Clash Display', sans-serif",
            color: "#ffffff",
          }}
        >
          Ready to get supported?
        </h2>
        <p
          className="mx-auto mb-8 max-w-md text-sm"
          style={{ color: "#8899aa" }}
        >
          Join the waitlist and be the first to claim your creator page when we
          launch.
        </p>
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
