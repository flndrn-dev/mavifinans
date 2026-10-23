"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "mavi-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const preference = localStorage.getItem(STORAGE_KEY);
    if (!preference) {
      setVisible(true);
    }
  }, []);

  function handleChoice(choice: "accepted" | "declined") {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-2xl px-5 py-4 backdrop-blur-xl"
          style={{
            background: "rgba(45, 56, 60, 0.7)",
            border: "1px solid rgba(69, 177, 232, 0.12)",
          }}
        >
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <p
              className="flex-1 text-xs leading-relaxed"
              style={{ color: "var(--mavi-text-muted)" }}
            >
              We use privacy-friendly analytics.{" "}
              <a
                href="/legal/cookies"
                className="underline hover:![color:var(--mavi-text)]"
                style={{ color: "var(--mavi-blue)" }}
              >
                Learn more
              </a>
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleChoice("accepted")}
                className="h-8 rounded-full px-4 text-xs font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "var(--mavi-blue)",
                  boxShadow: "0 0 10px rgba(69, 177, 232, 0.15)",
                }}
              >
                Accept
              </button>
              <button
                onClick={() => handleChoice("declined")}
                className="h-8 rounded-full px-4 text-xs font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  border: "1px solid var(--mavi-border-strong)",
                  color: "var(--mavi-text)",
                  backgroundColor: "transparent",
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
