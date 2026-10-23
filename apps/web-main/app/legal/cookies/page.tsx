import type { Metadata } from "next";
import { CookiePolicyContent } from "./cookie-policy-content";

export const metadata: Metadata = {
  title: "Cookie Policy — mavi finans",
  description:
    "How mavi finans uses cookies and similar technologies across our products and services.",
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}
