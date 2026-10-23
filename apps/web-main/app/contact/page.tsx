import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact — mavi finans",
  description:
    "Get in touch with the mavi finans team. Questions, feedback, partnerships, or support.",
};

export default function ContactPage() {
  return <ContactContent />;
}
