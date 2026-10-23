"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const emailSchema = z.string().email("Please enter a valid email address.");

const productOptions = [
  { id: "pay", label: "mavi pay", accent: "#E05C45" },
  { id: "creators", label: "supported by", accent: "#45b1e8" },
  { id: "card", label: "mavi card", accent: "#0784b5" },
  { id: "wallet", label: "mavi wallet", accent: "#45b1e8" },
  { id: "finans", label: "mavi finans", accent: "#45b1e8" },
];

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

export default function WaitlistPage() {
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
    <div className="relative overflow-hidden">
      {/* Atmospheric background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(69,177,232,0.1), transparent 70%)",
        }}
      />

      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-28 md:py-36">
        <div className="mx-auto max-w-lg text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            style={{
              fontFamily: "'Clash Display', sans-serif",
              color: "#ffffff",
            }}
          >
            Join the waitlist
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl"
            style={{ color: "#8899aa" }}
          >
            Be among the first to experience financial freedom.
          </motion.p>

          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-12 rounded-2xl border p-8 backdrop-blur-xl"
                style={{
                  backgroundColor: "rgba(45,56,60,0.5)",
                  borderColor: "rgba(69,177,232,0.12)",
                }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    color: "#45b1e8",
                  }}
                >
                  You&apos;re on the list!
                </p>
                <p
                  className="mt-3 text-sm"
                  style={{ color: "#8899aa" }}
                >
                  We&apos;ll reach out when it&apos;s your turn.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-12"
              >
                {/* Product interest pills */}
                <div className="mb-10">
                  <p
                    className="mb-5 text-sm font-semibold"
                    style={{ color: "#cfd0d1" }}
                  >
                    Which products interest you?
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {productOptions.map((product) => {
                      const selected = interests.includes(product.id);
                      return (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => toggleInterest(product.id)}
                          className="rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-xl transition-all duration-200"
                          style={{
                            backgroundColor: selected
                              ? `${product.accent}18`
                              : "rgba(45,56,60,0.5)",
                            borderColor: selected
                              ? `${product.accent}50`
                              : "rgba(69,177,232,0.12)",
                            color: selected
                              ? product.accent
                              : "#8899aa",
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
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (validationError) setValidationError(null);
                        if (state === "error") setState("idle");
                      }}
                      className="h-12 w-full rounded-xl"
                      style={{
                        backgroundColor: "rgba(45,56,60,0.5)",
                        borderColor: validationError
                          ? "#EF4444"
                          : "rgba(69,177,232,0.12)",
                        color: "#cfd0d1",
                      }}
                      aria-invalid={!!validationError}
                    />
                    {validationError && (
                      <p
                        className="mt-1 text-left text-xs"
                        style={{ color: "#EF4444" }}
                      >
                        {validationError}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={state === "loading"}
                    className="h-12 shrink-0 rounded-xl px-8 font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(69,177,232,0.3)]"
                    style={{ backgroundColor: "#45b1e8" }}
                  >
                    {state === "loading" ? "Joining..." : "Join waitlist"}
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {state === "error" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-3 text-sm"
                style={{ color: "#EF4444" }}
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
