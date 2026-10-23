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
    title: "1. Agreement overview",
    content: `This Merchant Agreement ("Agreement") is a legally binding contract between you ("Merchant", "you") and mavi finans ("mavi", "we", "us", "our") governing your use of mavi pay to accept payments for goods and services.

By creating a mavi pay account and processing payments through the platform, you agree to be bound by this Agreement, our Terms of Service, our Privacy Policy, and our Acceptable Use Policy. If you do not agree to these terms, do not use mavi pay.`,
  },
  {
    title: "2. mavi pay services",
    content: `mavi pay provides a software platform that connects merchants to Stripe for payment processing. mavi pay is not a bank, payment institution, or money transmitter. Stripe is the payment processor and merchant of record for transactions processed through the platform.

Services provided include:
- Payment processing via Stripe (card payments, SEPA Direct Debit, and other methods supported by Stripe)
- Merchant dashboard for managing products, orders, subscriptions, and customers
- Checkout link generation and embeddable checkout widgets
- Subscription management and recurring billing
- Webhook notifications for payment events
- API access for custom integrations

mavi pay reserves the right to modify, suspend, or discontinue any feature or service at any time with reasonable notice.`,
  },
  {
    title: "3. Stripe Connected Account",
    content: `To use mavi pay, you must create or connect a Stripe account through Stripe Connect. By doing so:

- You agree to Stripe's Connected Account Agreement (https://stripe.com/connect-account/legal)
- You authorise mavi pay to access your Stripe account to facilitate payment processing, reporting, and payouts on your behalf
- You acknowledge that Stripe, not mavi pay, is responsible for holding and transferring funds
- You understand that Stripe's risk and compliance reviews apply to your account independently

mavi pay does not hold customer funds at any point. All funds from transactions are held and processed by Stripe according to your Stripe account configuration and Stripe's payout schedule.`,
  },
  {
    title: "4. Fees and payouts",
    content: `mavi pay charges the following fees:

Transaction fee: 2% of each successful transaction processed through the platform. This fee is calculated on the total transaction amount including any applicable taxes.

The 2% mavi pay fee is in addition to Stripe's standard processing fees. The total cost to you as a merchant is:
- Stripe processing fees (as published by Stripe for your region)
- + 2% mavi pay platform fee

Fees are deducted automatically from your Stripe balance at the time of payout. You will see a breakdown of all fees in your mavi pay merchant dashboard.

Payouts are handled by Stripe according to your Stripe account's payout schedule. mavi pay does not control or influence payout timing. Any payout delays are between you and Stripe.

We reserve the right to modify our fee structure with 30 days' notice. Fee changes will not apply retroactively to transactions processed before the change takes effect.`,
  },
  {
    title: "5. Merchant obligations",
    content: `As a merchant on mavi pay, you agree to:

Products and services — Only sell products and services that comply with our Acceptable Use Policy. You are solely responsible for the quality, delivery, and legality of your products and services.

Customer relationships — You are responsible for all customer relationships, including support, refunds, and disputes. You must provide accurate contact information and respond to customer inquiries in a timely manner.

Refunds and chargebacks — You are responsible for processing refunds according to your own refund policy. Chargebacks will be handled according to Stripe's dispute resolution process. mavi pay may pass through any chargeback fees from Stripe.

Tax compliance — You are solely responsible for determining, collecting, reporting, and remitting all applicable taxes (VAT, GST, sales tax, etc.) for your transactions. mavi pay does not provide tax advice.

Data protection — You must comply with all applicable data protection laws, including GDPR, when collecting and processing customer personal data through the platform.

Account security — You are responsible for maintaining the security of your account credentials. You must notify us immediately if you suspect unauthorised access.`,
  },
  {
    title: "6. Intellectual property",
    content: `mavi pay and all related trademarks, logos, software, and documentation are the property of mavi finans and its licensors. You may not copy, modify, distribute, or create derivative works of the platform without our prior written consent.

You grant mavi pay a non-exclusive, royalty-free licence to use your name, logo, and product information for the purpose of operating the platform and, with your consent, for promotional purposes.

You retain all rights to your products, content, and customer data. mavi pay does not claim ownership of your intellectual property.`,
  },
  {
    title: "7. Limitation of liability",
    content: `To the maximum extent permitted by applicable law:

- mavi pay is provided "as is" without warranties of any kind, express or implied
- mavi pay is not liable for any indirect, incidental, special, consequential, or punitive damages
- mavi pay's total liability for any claims arising from this Agreement is limited to the total fees you paid to mavi pay in the 12 months preceding the claim
- mavi pay is not liable for the actions or omissions of Stripe or any other third-party service provider

Nothing in this Agreement limits liability for fraud, death, or personal injury caused by negligence, or any other liability that cannot be excluded by law.`,
  },
  {
    title: "8. Termination",
    content: `You may terminate this Agreement at any time by closing your mavi pay account. Upon termination, you must cease using all mavi pay services.

We may suspend or terminate your account:
- Immediately, if you violate our Acceptable Use Policy or engage in fraudulent or illegal activity
- With 30 days' notice, for any other reason

Upon termination:
- Outstanding transactions will be completed according to Stripe's standard processing
- Any pending payouts will be processed according to Stripe's payout schedule
- You will lose access to your merchant dashboard and data
- We may retain certain data as required by law or for legitimate business purposes

Provisions of this Agreement that by their nature should survive termination (including fee obligations, limitation of liability, and dispute resolution) will continue to apply.`,
  },
  {
    title: "9. Dispute resolution",
    content: `This Agreement is governed by the laws of Belgium. Any disputes arising from this Agreement will be subject to the exclusive jurisdiction of the courts of Flanders, Belgium.

Before initiating formal legal proceedings, both parties agree to attempt to resolve disputes through good-faith negotiation. Please contact us at legal@mavifinans.eu to initiate this process.`,
  },
  {
    title: "10. General provisions",
    content: `Entire agreement — This Agreement, together with our Terms of Service, Privacy Policy, and Acceptable Use Policy, constitutes the entire agreement between you and mavi pay.

Severability — If any provision of this Agreement is found to be unenforceable, the remaining provisions will remain in full force and effect.

Assignment — You may not assign this Agreement without our prior written consent. We may assign this Agreement in connection with a merger, acquisition, or sale of assets.

Notices — We will send notices to the email address associated with your account. Notices to mavi pay should be sent to legal@mavifinans.eu.

Last modified: June 2026`,
  },
];

export function MerchantAgreementContent() {
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
          Merchant Agreement
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Terms for accepting payments through mavi pay.
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
