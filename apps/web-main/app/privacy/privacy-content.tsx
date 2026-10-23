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
    title: "1. Introduction",
    content: `This Privacy Policy explains how mavi finans ("we", "us", "our") collects, uses, stores, and protects your personal data when you use our products and services, including mavi pay, mavi card, mavi wallet, and mavi finans banking.

We are committed to protecting your privacy and processing your data in compliance with the General Data Protection Regulation (GDPR) and applicable Belgian and European data protection laws.

By using any mavi finans product, you acknowledge that you have read and understood this Privacy Policy.`,
  },
  {
    title: "2. Data Controller",
    content: `The data controller responsible for your personal data is:

mavi finans
Flanders, Belgium

For any questions about how we handle your data, reach out via our contact page at mavifinans.eu/contact.`,
  },
  {
    title: "3. What Data We Collect",
    content: `We collect the following categories of personal data depending on the products you use and your KYC tier:

Identity data: Full name, date of birth, nationality, government-issued identity documents (passport, ID card, driving licence), selfie photograph, proof of address. Collected during KYC verification via our partner Sumsub.

Financial data: Transaction history, payment methods, bank account details (IBAN), card details, wallet addresses, payout records.

Technical data: IP address, device type and identifier, browser type and version, operating system, referral source.

Usage data: Pages visited, features used, session duration, interaction patterns. Collected via Umami, a privacy-focused analytics platform that does not use cookies or collect personally identifiable information.

Communication data: Emails you send to us, support requests, and any feedback you provide.

Website forms: Your email address and selected product interests when you join the waitlist; your name, email address, subject, and message when you contact us. Contact submissions are stored in our website database and a private JSON archive.`,
  },
  {
    title: "4. Why We Collect Your Data",
    content: `We process your personal data for the following purposes:

Service delivery: To create and manage your account, process transactions, issue cards, facilitate banking services, and operate the mavi wallet.

KYC and AML compliance: To verify your identity, assess risk, and comply with anti-money laundering regulations as required by European law.

Fraud prevention: To detect, prevent, and investigate fraudulent or unauthorised activity, including sanctions screening via Chainalysis.

Product improvement: To understand how our products are used and improve the user experience. Analytics are privacy-focused and do not track individuals.

Communication: To send transactional emails (receipts, verification, security alerts) and, with your consent, product updates.`,
  },
  {
    title: "5. Legal Basis for Processing (GDPR)",
    content: `We process your personal data under the following legal bases:

Contract performance (Article 6(1)(b) GDPR): Processing necessary to provide the services you signed up for — account creation, transaction processing, card issuance, wallet operation, banking services.

Legal obligation (Article 6(1)(c) GDPR): Processing required to comply with anti-money laundering (AML) directives, KYC requirements, sanctions screening obligations, and tax reporting requirements.

Legitimate interest (Article 6(1)(f) GDPR): Processing necessary for fraud prevention, security monitoring, and product improvement, where our interests do not override your fundamental rights.

Consent (Article 6(1)(a) GDPR): For optional communications such as marketing emails. You may withdraw consent at any time.`,
  },
  {
    title: "6. Third-Party Processors",
    content: `We share your personal data with the following third-party processors, each bound by data processing agreements:

Sumsub — Identity verification (KYC). Processes identity documents, selfies, and proof of address. EU-compliant identity verification provider.

Stripe — Payment processing for mavi pay. Processes transaction data, payment methods, and payout information. PCI DSS Level 1 certified.

Swan.io — Banking services for mavi finans. Licensed by Banque de France. Processes banking data including IBAN, SEPA transfers, and account information.

Wallester — Card issuance for mavi card. Licensed by Bank of Lithuania. Processes card data, transaction history, and cardholder information.

Chainalysis — OFAC and sanctions screening. Processes transaction data and wallet addresses to ensure compliance with international sanctions.

Neon — Website database, backend functions, and private object storage for waitlist signups and contact submissions. The website project is hosted in AWS US East (Ohio), United States.

Resend — Email delivery when configured. Processes email addresses and email content for website notifications.

Umami — Privacy-focused website analytics. Does not collect personal data, does not use cookies, and is fully GDPR-compliant.

We do not sell your personal data to any third party. Data is shared only as necessary to provide our services and comply with legal obligations.`,
  },
  {
    title: "7. International Data Transfers",
    content: `Some of our processors operate outside the European Economic Area (EEA). When your data is transferred outside the EEA, we ensure adequate safeguards are in place, including:

Standard Contractual Clauses (SCCs) approved by the European Commission.
Adequacy decisions where the European Commission has determined the receiving country provides adequate data protection.
Binding corporate rules where applicable.

You may request details about the safeguards in place for specific transfers by contacting us.`,
  },
  {
    title: "8. Data Retention",
    content: `We retain your personal data only as long as necessary for the purposes described in this policy, or as required by law:

KYC and identity data: Retained for 5 years after the end of the business relationship, as required by EU Anti-Money Laundering Directives (AMLD).

Transaction records: Retained for 7 years for tax and regulatory compliance.

Account data: Retained for the duration of your account. Upon account closure and request for deletion, all data not subject to legal retention requirements is deleted within 30 days.

Analytics data: Umami does not store personally identifiable data. Aggregated analytics are retained indefinitely.

Technical logs: Retained for up to 12 months for security and debugging purposes.`,
  },
  {
    title: "9. Your Rights Under GDPR",
    content: `As a data subject under the GDPR, you have the following rights:

Right of access: Request a copy of the personal data we hold about you.

Right to rectification: Request correction of inaccurate or incomplete data.

Right to erasure: Request deletion of your personal data, subject to legal retention obligations.

Right to restriction: Request that we limit how we process your data in certain circumstances.

Right to data portability: Receive your data in a structured, machine-readable format and transfer it to another controller.

Right to object: Object to processing based on legitimate interest or for direct marketing purposes.

Right to withdraw consent: Where processing is based on consent, withdraw it at any time without affecting the lawfulness of prior processing.

Right to lodge a complaint: File a complaint with the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit / Autorité de protection des données) at www.dataprotectionauthority.be.

To exercise any of these rights, reach out via our contact page at mavifinans.eu/contact. We will respond within 30 days.`,
  },
  {
    title: "10. Cookies",
    content: `mavi finans uses a minimal cookie approach:

Essential cookies: Used only for session management and security (e.g., cookie consent preference). These are strictly necessary and do not require consent.

Analytics: We use Umami, a privacy-focused analytics platform. Umami does not use cookies, does not track users across websites, and does not collect personal data. It is fully GDPR-compliant without requiring cookie consent.

We do not use advertising cookies, tracking pixels, or third-party marketing cookies.`,
  },
  {
    title: "11. Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data, including:

Encryption of data in transit (TLS/SSL) and at rest.
Access controls limiting data access to authorised personnel only.
Regular security assessments and vulnerability monitoring.
Secure infrastructure hosted within the European Union where possible.
KYC data processed through Sumsub's certified secure infrastructure.

While we take all reasonable precautions, no method of transmission or storage is 100% secure. If you suspect a security breach, contact us immediately via mavifinans.eu/contact.`,
  },
  {
    title: "12. Children",
    content: `mavi finans services are not directed at individuals under the age of 18. We do not knowingly collect personal data from children. If you believe a minor has provided us with personal data, please contact us and we will delete it promptly.`,
  },
  {
    title: "13. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make material changes, we will notify you by email or through a prominent notice on our website.

We encourage you to review this policy periodically.`,
  },
  {
    title: "14. Contact",
    content: `For any questions, concerns, or requests regarding this Privacy Policy or our data practices, contact us at:

Contact form: mavifinans.eu/contact
Website: mavifinans.eu`,
  },
];

export function PrivacyContent() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-28 text-center md:py-36 lg:py-44">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(69,177,232,0.08), transparent 70%)",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: "#8899aa" }}
        >
          Legal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Clash Display', sans-serif", color: "#ffffff" }}
        >
          Privacy Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          How we collect, use, and protect your personal data.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 text-sm"
          style={{ color: "rgba(136,153,170,0.6)" }}
        >
          Effective date: 29 March 2026
        </motion.p>
      </section>

      {/* Content sections */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger}
        className="mx-auto max-w-3xl px-6 pb-32"
      >
        <div className="space-y-6">
          {sections.map((section) => (
            <motion.div
              key={section.title}
              variants={fadeUp}
              className="rounded-2xl border p-8 backdrop-blur-xl md:p-10"
              style={{
                backgroundColor: "rgba(45,56,60,0.5)",
                borderColor: "rgba(69,177,232,0.12)",
              }}
            >
              <h2
                className="mb-4 text-xl font-bold tracking-tight md:text-2xl"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  color: "#ffffff",
                }}
              >
                {section.title}
              </h2>
              <div
                className="whitespace-pre-line text-sm leading-relaxed"
                style={{ color: "#8899aa" }}
              >
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
