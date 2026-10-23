import type { Metadata } from "next";
import { BankingContent } from "./banking-content";

export const metadata: Metadata = {
  title: "mavi finans — A real bank account. No questions asked.",
  description:
    "Real EU IBAN account with SEPA transfers, global payments, debit card, and no hidden fees.",
};

export default function BankingPage() {
  return <BankingContent />;
}
