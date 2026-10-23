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

const values = [
  {
    number: "01",
    title: "Access is a right",
    description:
      "Financial services should be available to everyone — regardless of banking history, nationality, or background.",
  },
  {
    number: "02",
    title: "No gatekeeping",
    description:
      "We don't ask why you were refused elsewhere. If you pass KYC, you're in.",
  },
  {
    number: "03",
    title: "Transparency first",
    description:
      "No hidden fees, no surprise charges. You always know what you pay and why.",
  },
  {
    number: "04",
    title: "Your keys, your money",
    description:
      "We never hold your crypto private keys. Your assets stay under your control.",
  },
];

const audiences = [
  {
    title: "The debanked",
    description:
      "People whose accounts were closed without explanation. mavi finans gives them a way back in.",
  },
  {
    title: "Refused freelancers",
    description:
      "Self-employed workers turned away by traditional banks. We say yes.",
  },
  {
    title: "Crypto users",
    description:
      "People who need a bridge between crypto and the real economy — without judgement.",
  },
  {
    title: "Expats & newcomers",
    description:
      "Anyone who moved to a new country and can't open a local bank account yet.",
  },
];

export function AboutContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(69,177,232,0.14), transparent 70%)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-sm font-medium uppercase tracking-[0.2em]"
          style={{ color: "#8899aa" }}
        >
          About
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "#ffffff" }}
        >
          About{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #45b1e8, #0784b5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            mavi
          </span>{" "}
          finans
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Financial freedom for the unbanked.
        </motion.p>
      </section>

      {/* Pull quote */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="relative px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-4xl text-center">
          <blockquote
            className="text-3xl font-light italic leading-relaxed md:text-5xl"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "#45b1e8",
            }}
          >
            &ldquo;mavi means blue in Turkish&rdquo;
          </blockquote>
          <p
            className="mt-8 text-lg leading-relaxed md:text-xl"
            style={{ color: "#8899aa" }}
          >
            A colour that represents trust, openness, and freedom. These are the
            values at the heart of everything we build. We believe that access to
            financial services is a right, not a privilege.
          </p>
        </div>
      </motion.section>

      {/* Values */}
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
            Our values
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <motion.div
                key={value.number}
                variants={fadeUp}
                className="group relative rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(69,177,232,0.3)]"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                }}
              >
                <span
                  className="text-4xl font-bold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "rgba(69,177,232,0.2)",
                  }}
                >
                  {value.number}
                </span>
                <h3
                  className="mt-3 text-lg font-semibold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "#cfd0d1",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#8899aa" }}
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Who is mavi for */}
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
            Who is mavi finans for?
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

      {/* Built in Flanders */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-8 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, #45b1e8, transparent)",
            }}
          />

          <h2
            className="text-3xl font-bold tracking-tight md:text-5xl"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "#ffffff",
            }}
          >
            Built in Flanders
          </h2>

          <p
            className="mt-8 text-lg leading-relaxed md:text-xl"
            style={{ color: "#8899aa" }}
          >
            mavi finans is built in Flanders, Belgium. We are a small team with
            a clear mission: make financial tools accessible to everyone,
            regardless of their banking history, nationality, or background. No
            gatekeeping. No hidden requirements. Just real financial
            infrastructure that works for real people.
          </p>

          <div
            className="mx-auto mt-8 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, #45b1e8, transparent)",
            }}
          />
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
