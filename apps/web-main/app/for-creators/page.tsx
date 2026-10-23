import type { Metadata } from "next";
import { ForCreatorsContent } from "./for-creators-content";

export const metadata: Metadata = {
  title: "For Creators — supported by | mavi finans",
  description:
    "Let your audience support your work. A creator-first funding platform with one-time and recurring support, built into the mavi finans ecosystem.",
};

export default function ForCreatorsPage() {
  return <ForCreatorsContent />;
}
