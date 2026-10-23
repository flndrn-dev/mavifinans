import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { HowItWorks } from "@/components/how-it-works";
import { WhoIsMaviFor } from "@/components/who-is-mavi-for";
import { TrustSection } from "@/components/trust-section";
import { AppDownload } from "@/components/app-download";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <HowItWorks />
      <WhoIsMaviFor />
      <TrustSection />
      <AppDownload />
      <WaitlistForm />
    </>
  );
}
