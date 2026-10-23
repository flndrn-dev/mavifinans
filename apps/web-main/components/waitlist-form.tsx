"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address.");

const productOptions = [
  { id: "pay", label: "Pay", accent: "#E05C45" },
  { id: "creators", label: "For Creators", accent: "#45b1e8" },
  { id: "card", label: "Card", accent: "#0784b5" },
  { id: "wallet", label: "Wallet", accent: "#45b1e8" },
  { id: "banking", label: "Banking", accent: "#45b1e8" },
];

type FormState = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [state, setState] = useState<FormState>("idle");
  const [validationError, setValidationError] = useState<string | null>(null);

  function toggleInterest(id: string) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError(null);

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setValidationError(result.error.errors[0].message);
      return;
    }

    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, interests }),
      });

      if (!res.ok) throw new Error("Request failed");

      setState("success");
      setEmail("");
      setInterests([]);
    } catch {
      setState("error");
    }
  }

  return (
    <section
      className="relative overflow-hidden px-6 py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg, var(--mavi-bg) 0%, rgba(45, 56, 60, 0.4) 50%, var(--mavi-bg) 100%)",
      }}
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{ backgroundColor: "rgba(69, 177, 232, 0.06)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-lg text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          style={{
            color: "var(--mavi-text)",
            fontFamily: "'Clash Display', sans-serif",
          }}
        >
          Be the first to know
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mb-8 text-sm"
          style={{ color: "var(--mavi-text-muted)" }}
        >
          Join the waitlist and get early access when we launch.
        </motion.p>

        <AnimatePresence mode="wait">
          {state === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass rounded-2xl p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
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
                  <motion.path
                    d="M20 6L9 17L4 12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  />
                </svg>
              </motion.div>
              <p
                className="text-lg font-semibold"
                style={{ color: "var(--mavi-blue)" }}
              >
                You&apos;re on the list!
              </p>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--mavi-text-muted)" }}
              >
                We&apos;ll reach out when it&apos;s your turn.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Product interest pills */}
              <div className="mb-8">
                <p
                  className="mb-4 text-sm font-semibold"
                  style={{ color: "#cfd0d1" }}
                >
                  Which products interest you?
                </p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {productOptions.map((product) => {
                    const selected = interests.includes(product.id);
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => toggleInterest(product.id)}
                        className="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider backdrop-blur-xl transition-all duration-200"
                        style={{
                          backgroundColor: selected
                            ? `${product.accent}18`
                            : "rgba(45,56,60,0.5)",
                          borderColor: selected
                            ? `${product.accent}50`
                            : "rgba(69,177,232,0.12)",
                          color: selected ? product.accent : "#8899aa",
                        }}
                      >
                        {product.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Email form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationError) setValidationError(null);
                      if (state === "error") setState("idle");
                    }}
                    className="h-12 w-full rounded-full px-6 text-sm outline-none transition-all duration-300"
                    style={{
                      backgroundColor: "var(--mavi-bg-surface)",
                      border: `1px solid ${
                        validationError
                          ? "var(--mavi-error)"
                          : "var(--mavi-border)"
                      }`,
                      color: "var(--mavi-text)",
                    }}
                    onFocus={(e) => {
                      if (!validationError) {
                        e.currentTarget.style.borderColor = "#45b1e8";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(69, 177, 232, 0.15), 0 0 20px rgba(69, 177, 232, 0.10)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!validationError) {
                        e.currentTarget.style.borderColor = "var(--mavi-border)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                    aria-invalid={!!validationError}
                  />
                  {validationError && (
                    <p
                      className="mt-2 text-left text-xs"
                      style={{ color: "var(--mavi-error)" }}
                    >
                      {validationError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="h-12 shrink-0 rounded-full px-8 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #45b1e8, #0784b5, #45b1e8)",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 4s ease infinite",
                    boxShadow: "0 0 16px rgba(69, 177, 232, 0.25)",
                  }}
                >
                  {state === "loading" ? "Joining..." : "Join waitlist"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm"
              style={{ color: "var(--mavi-error)" }}
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
