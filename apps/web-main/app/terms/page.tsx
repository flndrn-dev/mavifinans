import type { Metadata } from "next";
import { TermsContent } from "./terms-content";

export const metadata: Metadata = {
  title: "Terms of Service — mavi finans",
  description:
    "Terms and conditions for using mavi finans products and services.",
};

export default function TermsPage() {
  return <TermsContent />;
}
