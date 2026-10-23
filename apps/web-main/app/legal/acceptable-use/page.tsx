import type { Metadata } from "next";
import { AcceptableUseContent } from "./acceptable-use-content";

export const metadata: Metadata = {
  title: "Acceptable Use Policy — mavi finans",
  description:
    "Rules and restrictions for using mavi finans products and services.",
};

export default function AcceptableUsePage() {
  return <AcceptableUseContent />;
}
