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
    title: "1. Purpose",
    content: `This Acceptable Use Policy ("AUP") sets out the rules and restrictions that apply when you use any product or service provided by mavi finans, including mavi pay, mavi card, mavi wallet, and mavi finans banking (collectively, the "Services").

By using any of our Services, you agree to comply with this AUP. Violation of this policy may result in suspension or termination of your account, reporting to relevant authorities, and legal action where appropriate.`,
  },
  {
    title: "2. Prohibited activities",
    content: `You may not use any mavi finans Service for any of the following:

Illegal activities — Any activity that violates applicable laws or regulations, including but not limited to fraud, money laundering, terrorist financing, tax evasion, bribery, or corruption.

Restricted businesses — Operating businesses in the following categories without explicit prior approval:
- Adult content or services
- Gambling, betting, or casino operations
- Sale of tobacco, e-cigarettes, or vaping products
- Sale of weapons, ammunition, or firearms
- Sale of prescription pharmaceuticals without a valid licence
- Multi-level marketing or pyramid schemes
- Cryptocurrency mining operations or unregistered ICOs
- Unlicensed financial services

Harmful content — Distributing malware, viruses, ransomware, or any other harmful code. Engaging in phishing, social engineering, or credential theft.

Abuse of the platform — Attempting to bypass payment processing fees, manipulating checkout flows, or abusing refund and dispute mechanisms. Creating multiple accounts to circumvent limits or restrictions.

Intellectual property infringement — Selling or distributing copyrighted material, counterfeit goods, or products that infringe on trademarks, patents, or trade secrets without authorisation.`,
  },
  {
    title: "3. Restricted activities (mavi pay specific)",
    content: `As a merchant on mavi pay, you must additionally not:

- Use mavi pay to process payments for third parties without authorisation (acting as a payment facilitator)
- Submit transactions without a legitimate underlying sale of goods or services
- Use test or sandbox environments for production transactions
- Misrepresent the nature, quality, or origin of your products or services
- Fail to deliver products or services after receiving payment
- Charge customers without their explicit consent
- Process transactions in countries subject to comprehensive sanctions (as defined by the EU, UN, or OFAC)`,
  },
  {
    title: "4. Data and privacy obligations",
    content: `If you collect, store, or process personal data through our Services, you must:

- Comply with the General Data Protection Regulation (GDPR) and any other applicable data protection laws
- Provide a clear and accessible privacy policy to your customers
- Obtain valid consent where required before collecting personal data
- Implement appropriate technical and organisational security measures
- Notify us immediately if you become aware of a data breach involving data processed through our Services

You must not use our Services to collect or store sensitive personal data (as defined by GDPR Article 9) unless you have obtained explicit consent and have implemented appropriate safeguards.`,
  },
  {
    title: "5. Security",
    content: `You are responsible for maintaining the security of your account credentials, API keys, and webhook secrets. You must:

- Use strong, unique passwords and enable two-factor authentication where available
- Store API keys and webhook secrets securely — never expose them in client-side code, public repositories, or logs
- Immediately notify us at security@mavifinans.eu if you suspect your credentials have been compromised
- Not attempt to probe, scan, or test the vulnerability of our systems without prior written authorisation
- Not interfere with or disrupt the integrity or performance of our Services`,
  },
  {
    title: "6. Enforcement",
    content: `We reserve the right to investigate any suspected violation of this AUP. Enforcement actions may include:

- Warning — For minor or first-time violations, we may issue a warning and request corrective action
- Temporary suspension — We may suspend your access to Services while we investigate
- Permanent termination — For serious or repeated violations, we may permanently terminate your account
- Reporting — We may report violations to law enforcement, regulatory authorities, or financial partners as required by law
- Financial remedies — We may withhold payouts, recover funds, or seek damages for violations that cause financial harm

We may take enforcement action without prior notice if we determine, in our sole discretion, that there is an immediate risk of harm to our Services, our users, or third parties.`,
  },
  {
    title: "7. Reporting violations",
    content: `If you become aware of any violation of this AUP, please report it immediately:

Email: abuse@mavifinans.eu
Subject: AUP Violation Report

Please include as much detail as possible, including relevant account information, transaction IDs, and any evidence of the violation. We treat all reports confidentially.

If you are reporting a security vulnerability, please follow our responsible disclosure process as described in our Security Policy.`,
  },
  {
    title: "8. Changes to this policy",
    content: `We may update this Acceptable Use Policy from time to time. When we make material changes, we will notify you via email or through a notice on our website. Your continued use of the Services after the changes take effect constitutes acceptance of the updated policy.

Last modified: June 2026`,
  },
];

export function AcceptableUseContent() {
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
          Acceptable Use Policy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          Rules and restrictions for using our services.
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
