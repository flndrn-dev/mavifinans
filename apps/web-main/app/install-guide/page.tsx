import type { Metadata } from "next";
import { InstallGuideContent } from "./install-guide-content";

export const metadata: Metadata = {
  title: "Install Guide — mavi finans",
  description:
    "Step-by-step guide to install the mavi app on Android via direct APK download.",
};

export default function InstallGuidePage() {
  return <InstallGuideContent />;
}
