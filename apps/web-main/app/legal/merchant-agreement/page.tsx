import type { Metadata } from "next";
import { MerchantAgreementContent } from "./merchant-agreement-content";

export const metadata: Metadata = {
  title: "Merchant Agreement — mavi finans",
  description:
    "Terms and conditions for merchants using mavi pay to accept payments.",
};

export default function MerchantAgreementPage() {
  return <MerchantAgreementContent />;
}
