"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(1, "Subject is required."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormState = "idle" | "loading" | "success" | "error";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ContactContent() {
  const requestId = useRef<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function updateField(field: string, value: string) {
    requestId.current = null;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (state === "error") setState("idle");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setState("loading");

    try {
      requestId.current ??= crypto.randomUUID();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": requestId.current },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setState("success");
      requestId.current = null;
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  }

  const inputStyle = (field: string) => ({
    backgroundColor: "rgba(45,56,60,0.5)",
    border: `1px solid ${errors[field] ? "var(--mavi-error)" : "rgba(69,177,232,0.12)"}`,
    color: "var(--mavi-text)",
  });

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
          Get in touch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Questions, feedback, partnerships, or just want to say hello.
        </motion.p>
      </section>

      {/* Contact form + info */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="mx-auto max-w-3xl px-6 pb-32"
      >
        <div className="grid gap-8 md:grid-cols-5">
          {/* Form */}
          <div className="md:col-span-3">
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl border p-10 text-center backdrop-blur-xl"
                  style={{
                    backgroundColor: "rgba(45,56,60,0.5)",
                    borderColor: "rgba(69,177,232,0.12)",
                  }}
                >
                  <div
                    className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(34, 197, 94, 0.12)" }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17L4 12" />
                    </svg>
                  </div>
                  <p
                    className="text-lg font-semibold"
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      color: "#45b1e8",
                    }}
                  >
                    Message sent
                  </p>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "#8899aa" }}
                  >
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#cfd0d1" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your name"
                      className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-all duration-200 focus:border-[#45b1e8] focus:shadow-[0_0_0_3px_rgba(69,177,232,0.15)]"
                      style={inputStyle("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs" style={{ color: "var(--mavi-error)" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#cfd0d1" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-all duration-200 focus:border-[#45b1e8] focus:shadow-[0_0_0_3px_rgba(69,177,232,0.15)]"
                      style={inputStyle("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs" style={{ color: "var(--mavi-error)" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#cfd0d1" }}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      placeholder="What is this about?"
                      className="h-11 w-full rounded-xl px-4 text-sm outline-none transition-all duration-200 focus:border-[#45b1e8] focus:shadow-[0_0_0_3px_rgba(69,177,232,0.15)]"
                      style={inputStyle("subject")}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs" style={{ color: "var(--mavi-error)" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "#cfd0d1" }}
                    >
                      Message
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Your message..."
                      rows={5}
                      className="w-full resize-none rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-[#45b1e8] focus:shadow-[0_0_0_3px_rgba(69,177,232,0.15)]"
                      style={inputStyle("message")}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs" style={{ color: "var(--mavi-error)" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="h-11 w-full rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                    style={{
                      backgroundColor: "#45b1e8",
                      boxShadow: "0 0 16px rgba(69, 177, 232, 0.20)",
                    }}
                  >
                    {state === "loading" ? "Sending..." : "Send message"}
                  </button>

                  {state === "error" && (
                    <p className="text-center text-sm" style={{ color: "var(--mavi-error)" }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact info sidebar */}
          <div className="md:col-span-2">
            <div
              className="rounded-2xl border p-8 backdrop-blur-xl"
              style={{
                backgroundColor: "rgba(45,56,60,0.5)",
                borderColor: "rgba(69,177,232,0.12)",
              }}
            >
              <h3
                className="mb-6 text-lg font-bold"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  color: "#ffffff",
                }}
              >
                Contact info
              </h3>

              <div className="space-y-5">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8899aa" }}
                  >
                    Social
                  </p>
                  <a
                    href="https://x.com/mavi_finans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-sm transition-colors hover:opacity-80"
                    style={{ color: "#cfd0d1" }}
                  >
                    @mavi_finans
                  </a>
                </div>

                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8899aa" }}
                  >
                    Location
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "#cfd0d1" }}
                  >
                    Flanders, Belgium
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#8899aa" }}
                  >
                    Response time
                  </p>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "#cfd0d1" }}
                  >
                    Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
