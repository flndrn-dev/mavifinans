import type { Metadata } from "next";
import { ForCreatorsContent } from "../for-creators/for-creators-content";

export const metadata: Metadata = {
  title: "Handlr — Fund your creative work | mavi finans",
  description:
    "Handlr is live. Create a free branded support page, share your link, and receive one-off audience support with transparent marginal pricing.",
  alternates: { canonical: "https://mavifinans.eu/handlr" },
};

export default function HandlrPage() {
  return <ForCreatorsContent productPage />;
}
