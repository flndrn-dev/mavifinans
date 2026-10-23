import type { Metadata } from "next";
import { ComplianceContent } from "./compliance-content";

export const metadata: Metadata = {
  title: "Compliance & Security — mavi finans",
  description:
    "KYC tiers, OFAC sanctions screening, blocked jurisdictions, and privacy policies at mavi finans.",
};

export default function CompliancePage() {
  return <ComplianceContent />;
}
