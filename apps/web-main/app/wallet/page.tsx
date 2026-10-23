import type { Metadata } from "next";
import { WalletContent } from "./wallet-content";

export const metadata: Metadata = {
  title: "mavi wallet — Your crypto. Nobody else's.",
  description:
    "Non-custodial crypto wallet with multi-chain support, token swaps, and on/off-ramp between crypto and fiat.",
};

export default function WalletPage() {
  return <WalletContent />;
}
