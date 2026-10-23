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
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const steps = [
  {
    number: "01",
    title: "Download the APK",
    description:
      "Go to mavifinans.eu/download/ and tap the download button for the app you want.",
  },
  {
    number: "02",
    title: "Open the downloaded file",
    description:
      "Check your notifications or open the Files app to find the downloaded APK file. Tap it to start installation.",
  },
  {
    number: "03",
    title: "Allow installing from your browser",
    description:
      'If prompted, tap "Settings" to allow installing apps from your browser.',
  },
  {
    number: "04",
    title: 'Toggle "Allow from this source"',
    description:
      "Enable the toggle to allow your browser to install apps. This only needs to be done once.",
  },
  {
    number: "05",
    title: 'Go back and tap "Install"',
    description:
      "Return to the installation screen and tap Install to proceed.",
  },
  {
    number: "06",
    title: "Open the mavi app",
    description:
      'Once installed, tap "Open" or find the mavi app in your app drawer.',
  },
];

export function InstallGuideContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(69,177,232,0.1), transparent 70%)",
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "#ffffff" }}
        >
          How to install the mavi app
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          mavi apps are downloaded directly from our website — no Play Store
          needed.
        </motion.p>
      </section>

      {/* Steps */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="px-6 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="group flex gap-6 rounded-2xl border p-6 backdrop-blur-xl transition-all duration-300 hover:border-[rgba(69,177,232,0.3)] md:p-8"
              style={{
                backgroundColor: "rgba(45,56,60,0.5)",
                borderColor: "rgba(69,177,232,0.12)",
              }}
            >
              {/* Number */}
              <span
                className="shrink-0 text-4xl font-bold"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  color: "rgba(69,177,232,0.2)",
                }}
              >
                {step.number}
              </span>

              {/* Content */}
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "#cfd0d1",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "#8899aa" }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why section */}
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
            <h3
              className="text-lg font-semibold"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                color: "#cfd0d1",
              }}
            >
              Why is this needed?
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "#8899aa" }}
            >
              mavi apps are not distributed through the Google Play Store. Android
              allows you to install apps directly from any source — this is called
              &ldquo;sideloading&rdquo;. It is safe, and you only need to enable
              the permission once.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
