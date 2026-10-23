import type { Metadata } from "next";
import { DPAContent } from "./dpa-content";

export const metadata: Metadata = {
  title: "Data Processing Agreement — mavi finans",
  description:
    "Data Processing Agreement (DPA) for mavi finans services under GDPR.",
};

export default function DPAPage() {
  return <DPAContent />;
}
