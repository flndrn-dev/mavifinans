import type { Metadata } from "next";
import { ForCreatorsContent } from "./for-creators-content";

export const metadata: Metadata = {
  title: "For Creators — Handlr | mavi finans",
  description:
    "Create a free Handlr page and receive one-off support from your audience. Live creator funding with clear marginal fees and financial partner processing.",
};

export default function ForCreatorsPage() {
  return <ForCreatorsContent />;
}
