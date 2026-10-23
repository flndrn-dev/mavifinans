import type { Metadata } from "next";
import { PayContent } from "./pay-content";

export const metadata: Metadata = {
  title: "mavi pay — Accept payments. Get paid instantly.",
  description:
    "Explore mavi pay’s Free and Pro plans for personal and business accounts, with lower per-sale fees on paid plans, checkout links, and a merchant dashboard.",
};

export default function PayPage() {
  return <PayContent />;
}
