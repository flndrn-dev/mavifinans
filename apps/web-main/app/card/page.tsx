import type { Metadata } from "next";
import { CardContent } from "./card-content";

export const metadata: Metadata = {
  title: "mavi card — A card that works when others won't.",
  description:
    "Prepaid Visa card with no credit check, no bank account required. Virtual card issued instantly after KYC.",
};

export default function CardPage() {
  return <CardContent />;
}
