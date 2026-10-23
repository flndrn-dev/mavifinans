import type { Metadata } from "next";
import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — mavi finans",
  description:
    "How mavi finans collects, uses, and protects your personal data. GDPR-compliant privacy policy.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
