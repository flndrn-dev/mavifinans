"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const sections = [
  {
    title: "1. What are cookies?",
    content: `Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently and to provide information to the site owners.

Cookies can be "first-party" (set by the website you are visiting) or "third-party" (set by a different domain). They can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain until they expire or you delete them).

Other tracking technologies — such as web beacons, pixels, and local storage — serve similar purposes. In this policy, we refer to all of these technologies collectively as "cookies."`,
  },
  {
    title: "2. How mavi finans uses cookies",
    content: `We use cookies for a limited set of purposes:

Analytics — We use a self-hosted instance of Umami, a privacy-focused analytics tool that does not use personally identifiable information. Umami sets a first-party cookie to recognise returning visitors for session tracking only. No data is shared with third parties.

Essential functionality — Some cookies are necessary for the technical operation of our services, such as maintaining your logged-in session in the mavi pay merchant dashboard or remembering your cookie consent preference.

We do NOT use cookies for advertising, retargeting, or profiling. We do not sell cookie data to anyone.`,
  },
  {
    title: "3. Cookies we use",
    content: `Umami Analytics:
- Name: umami
- Purpose: Tracks page views and visitor sessions anonymously
- Duration: Session
- Type: First-party, set by our Umami instance

Cookie consent:
- Name: mavi-cookie-consent
- Purpose: Remembers whether you accepted or declined cookies
- Duration: Persistent (no expiry)
- Type: First-party, localStorage

Authentication (mavi pay dashboard only):
- Name: mavi_session
- Purpose: Maintains your authenticated session
- Duration: Session
- Type: First-party, HTTP-only secure cookie`,
  },
  {
    title: "4. Your choices",
    content: `When you first visit mavifinans.eu, you will see a cookie banner at the bottom of the page. You can:

Accept — Allow Umami analytics and essential cookies to be set. This helps us understand how people use our services and improve them over time.

Decline — Only essential cookies (such as cookie consent preference) will be set. No analytics cookies will be placed on your device.

You can change your preference at any time by clearing your browser's localStorage for mavifinans.eu and refreshing the page. The cookie banner will reappear.

You can also configure your browser to block all cookies. Most browsers provide controls under Settings > Privacy & Security. Note that blocking all cookies may affect the functionality of authenticated areas like the mavi pay dashboard.`,
  },
  {
    title: "5. Third-party services",
    content: `Our payment platform (mavi pay) integrates with Stripe for payment processing. Stripe may set its own cookies during the checkout process for fraud prevention and security purposes. These cookies are governed by Stripe's own cookie policy: https://stripe.com/cookies-policy/legal

Stripe cookies are only set during the checkout flow on mavipay.eu and are essential for secure payment processing.

No other third-party cookies are set by mavi finans services.`,
  },
  {
    title: "6. Changes to this policy",
    content: `We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. When we make changes, we will update the "last modified" date at the bottom of this page.

If the changes are material, we will notify you via a notice on our website before the changes take effect.`,
  },
  {
    title: "7. Contact",
    content: `If you have questions about our use of cookies, you can contact us:

Email: hello@mavifinans.eu
Subject: Cookie Policy Inquiry

Last modified: June 2026`,
  },
];

export function CookiePolicyContent() {
  return (
    <div className="relative overflow-hidden">
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(69,177,232,0.06), transparent 70%)",
          }}
        />

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "#ffffff" }}
        >
          Cookie Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          How we use cookies and similar technologies.
        </motion.p>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="px-6 pb-32"
      >
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section) => (
            <motion.div key={section.title} variants={fadeUp}>
              <h2
                className="mb-4 text-xl font-bold"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  color: "#cfd0d1",
                }}
              >
                {section.title}
              </h2>
              <p
                className="whitespace-pre-line text-sm leading-relaxed"
                style={{ color: "#8899aa" }}
              >
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
