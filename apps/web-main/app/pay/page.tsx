import type { Metadata } from "next";
import { PayContent } from "./pay-content";

export const metadata: Metadata = {
  title: "mavi pay — Accept payments. Get paid instantly.",
  description:
    "mavi pay lets you accept payments with 2% fees, subscriptions, checkout links, and a full merchant dashboard.",
};

export default function PayPage() {
  return <PayContent />;
}
