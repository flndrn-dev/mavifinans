import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "About — mavi finans",
  description:
    "mavi finans brings financial freedom to the unbanked. Built in Flanders.",
};

export default function AboutPage() {
  return <AboutContent />;
}
