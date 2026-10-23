import type { Metadata } from "next";
import { PricingContent } from "./pricing-content";

export const metadata: Metadata = {
  title: "Pricing — mavi finans",
  description:
    "Simple, transparent pricing for mavi pay, mavi card, mavi wallet, and mavi finans.",
};

export default function PricingPage() {
  return <PricingContent />;
}
