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
    title: "1. Introduction & Acceptance",
    content: `These Terms of Service ("Terms") govern your access to and use of the products and services provided by mavi finans ("we", "us", "our"), including mavi pay, mavi card, mavi wallet, and mavi finans banking (collectively, the "Services").

By creating an account or using any of our Services, you agree to be bound by these Terms. If you do not agree, do not use our Services.

These Terms constitute a legally binding agreement between you and mavi finans. Please read them carefully.`,
  },
  {
    title: "2. Definitions",
    content: `"Account" means the user account you create to access the Services.

"mavi pay" means our merchant payment processing platform, enabling businesses to accept payments and receive payouts.

"mavi card" means our prepaid Visa card product, issued through our partner Wallester.

"mavi wallet" means our non-custodial cryptocurrency wallet, where you hold and control your own private keys.

"mavi finans banking" means our European banking service providing IBAN accounts and SEPA transfers, operated through our partner Swan.io.

"KYC" means Know Your Customer identity verification, conducted through our partner Sumsub.

"User" or "you" means any individual who creates an Account or uses the Services.`,
  },
  {
    title: "3. Eligibility",
    content: `To use the Services, you must:

Be at least 18 years of age.
Have the legal capacity to enter into a binding agreement.
Not be a resident, citizen, or located in any of the following blocked jurisdictions: Iran, North Korea, Russia, Cuba, Syria, Belarus, Myanmar, Venezuela (government-controlled entities), Sudan, or Yemen (Houthi-controlled territories).
Not be listed on any international sanctions list, including OFAC, EU, and UN sanctions lists.

We reserve the right to refuse service or terminate accounts at our sole discretion if we determine that you do not meet these eligibility requirements.`,
  },
  {
    title: "4. Account Registration",
    content: `When creating an Account, you agree to:

Provide accurate, current, and complete information.
Maintain and update your information to keep it accurate.
Keep your login credentials confidential and not share them with any third party.
Be solely responsible for all activity that occurs under your Account.
Notify us immediately of any unauthorised access to your Account.

You may only maintain one Account per person. Creating multiple accounts may result in termination of all associated accounts.`,
  },
  {
    title: "5. KYC and AML Compliance",
    content: `mavi finans operates a tiered KYC system to comply with European Anti-Money Laundering (AML) directives:

Tier 0 — Email only: Browse products and explore the platform. No transactions permitted.

Tier 1 — Basic KYC: Submit a government-issued identity document. Enables full product access with transaction limits up to EUR 2,000 per month.

Tier 2 — Extended KYC: Submit identity document, selfie verification, and proof of address. Enables full access with transaction limits up to EUR 15,000 per month.

Identity verification is conducted by Sumsub, an EU-compliant identity verification provider. All transactions are screened against international sanctions lists via Chainalysis.

We reserve the right to:
Request additional documentation at any time.
Downgrade your KYC tier if documents expire or are found to be invalid.
Suspend or terminate your Account if we suspect fraudulent activity, identity misrepresentation, or sanctions violations.
Report suspicious activity to relevant authorities as required by law.`,
  },
  {
    title: "6. mavi pay — Merchant Payment Processing",
    content: `mavi pay enables merchants to accept payments from customers through Stripe-powered checkout.

Transaction fees: 2.9% + EUR 0.30 per successful transaction. Additional fees may apply for currency conversion or cross-border payments.

Payouts: Merchant payouts are processed via Stripe Connect. Payout schedules and minimum thresholds are determined by Stripe's policies and your account configuration.

Disputes and chargebacks: You are responsible for responding to customer disputes and chargebacks. mavi finans may debit disputed amounts from your account pending resolution.

Prohibited goods and services: You may not use mavi pay to sell illegal goods, counterfeit products, or services that violate applicable law or Stripe's acceptable use policy.

We reserve the right to hold payouts, suspend merchant accounts, or terminate access if we detect violations of these Terms or suspicious transaction patterns.`,
  },
  {
    title: "7. mavi card — Prepaid Visa Card",
    content: `mavi card is a prepaid Visa card issued by Wallester, licensed by the Bank of Lithuania.

Card issuance: A virtual card is issued upon completion of KYC verification. Physical cards are available for order and delivered by post.

Fees:
Card issuance: EUR 9.99 (one-time, physical card).
Monthly maintenance: EUR 1.99.
ATM withdrawal: EUR 2.00 per transaction.
Fee schedule is subject to change with 30 days written notice.

Loading methods: Bank transfer (SEPA), crypto off-ramp (via mavi wallet), or transfer from your mavi finans banking account.

Spending limits: Determined by your KYC tier. Tier 1: up to EUR 2,000/month. Tier 2: up to EUR 15,000/month.

Currency: EUR only. Foreign currency transactions are subject to Visa exchange rates.

Lost or stolen cards: Report immediately via your Account dashboard or by contacting mavifinans.eu/contact. We will block the card and issue a replacement. You are liable for transactions made before reporting the loss.

The mavi card is issued and operated by Wallester under their card programme licence. Wallester's terms and conditions apply in addition to these Terms.`,
  },
  {
    title: "8. mavi wallet — Non-Custodial Crypto Wallet",
    content: `mavi wallet is a non-custodial cryptocurrency wallet. This means:

You hold your own private keys. mavi finans does not have access to, and cannot recover, your private keys or seed phrase.

You are solely responsible for:
Securely storing and backing up your seed phrase.
Any loss of funds resulting from lost, stolen, or compromised keys.
Verifying recipient addresses before sending transactions.
Understanding the risks associated with cryptocurrency, including price volatility and network fees.

No recovery: If you lose your seed phrase, there is no way for mavi finans or anyone else to recover your wallet or funds. This is by design — non-custodial means we never have custody.

Supported networks: The specific blockchain networks supported are listed within the app and may change over time.

mavi finans is not responsible for:
Losses due to blockchain network failures, bugs, or exploits.
Losses from interacting with malicious smart contracts or phishing attacks.
Price fluctuations in any cryptocurrency.
Failed or delayed transactions due to network congestion.`,
  },
  {
    title: "9. mavi finans Banking",
    content: `mavi finans banking provides European IBAN accounts and SEPA transfer capabilities through our partner Swan.io.

Swan.io is the licensed entity. Banking services are provided by Swan.io, which holds an Electronic Money Institution licence issued by Banque de France (ACPR). Your funds are held by Swan.io in accordance with their regulatory obligations.

IBAN account: Upon completion of KYC, you receive a personal Belgian IBAN (BE-prefixed) that can be used for SEPA transfers, salary deposits, utility payments, and any purpose where a European IBAN is accepted.

SEPA transfers: Send and receive euros within the SEPA zone. Standard SEPA transfers are typically processed within 1 business day.

Deposit protection: Your funds are safeguarded in accordance with EU electronic money regulations. Swan.io's safeguarding arrangements apply.

Account limits: Subject to your KYC tier and Swan.io's policies.

Swan.io's terms and conditions apply in addition to these Terms for all banking-related services.`,
  },
  {
    title: "10. Prohibited Activities",
    content: `You agree not to use the Services for:

Money laundering, terrorist financing, or proliferation financing.
Sanctions evasion or transactions involving sanctioned persons, entities, or jurisdictions.
Fraud, identity theft, or impersonation.
Purchase or sale of illegal goods or services.
Market manipulation or insider trading.
Unauthorised access to our systems, other users' accounts, or any attempt to circumvent security measures.
Automated scraping, crawling, or data extraction from our platforms.
Any activity that violates applicable local, national, or international law.

Violation of these prohibitions may result in immediate account suspension, termination, and reporting to relevant authorities.`,
  },
  {
    title: "11. Fees",
    content: `Fees for each product are published on our pricing page at mavifinans.eu/pricing. This includes transaction fees, card fees, transfer fees, and any other applicable charges.

We reserve the right to modify fees with at least 30 days prior written notice. Continued use of the Services after the notice period constitutes acceptance of the updated fees.

All fees are denominated in EUR unless otherwise specified.`,
  },
  {
    title: "12. Intellectual Property",
    content: `All intellectual property rights in the Services, including but not limited to the software, designs, logos, trademarks, and content, are owned by mavi finans or its licensors.

You are granted a limited, non-exclusive, non-transferable, revocable licence to use the Services for personal or business purposes in accordance with these Terms.

You may not copy, modify, distribute, sell, or lease any part of the Services, nor may you reverse-engineer or attempt to extract the source code, except as permitted by law.`,
  },
  {
    title: "13. Limitation of Liability",
    content: `The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.

To the maximum extent permitted by law:

mavi finans shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunity.

Our total aggregate liability for any claims arising from or related to these Terms or the Services shall not exceed the total fees paid by you to mavi finans in the 12 months preceding the claim.

mavi finans is not liable for any cryptocurrency losses resulting from:
Lost or compromised private keys or seed phrases.
User error in sending transactions to incorrect addresses.
Blockchain network failures, exploits, or vulnerabilities.
Price volatility of any cryptocurrency.

These limitations apply regardless of the theory of liability, whether in contract, tort (including negligence), strict liability, or otherwise.`,
  },
  {
    title: "14. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless mavi finans, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from or related to:

Your use of the Services.
Your violation of these Terms.
Your violation of any applicable law or third-party rights.
Any content or data you submit through the Services.`,
  },
  {
    title: "15. Termination",
    content: `Either party may terminate these Terms at any time:

You may close your Account by contacting us at mavifinans.eu/contact. We will process your request and, subject to legal retention requirements, delete your data as described in our Privacy Policy.

We may suspend or terminate your Account immediately if:
You violate these Terms or any applicable law.
We are required to do so by law or regulatory order.
We detect suspicious or fraudulent activity.
You fail to complete required KYC verification within a reasonable timeframe.

Upon termination:
Your access to the Services will be revoked.
Any pending transactions may be completed or cancelled at our discretion.
You must withdraw any remaining funds within 30 days, after which we may process remaining balances in accordance with applicable law.
Data retention continues as described in our Privacy Policy.`,
  },
  {
    title: "16. Dispute Resolution",
    content: `These Terms are governed by and construed in accordance with the laws of Belgium, without regard to conflict of law principles.

Before initiating formal proceedings, you agree to attempt to resolve any dispute informally by contacting us at mavifinans.eu/contact. We will make reasonable efforts to resolve the dispute within 30 days.

If informal resolution is unsuccessful, the courts of Flanders, Belgium shall have exclusive jurisdiction over any dispute arising from or related to these Terms or the Services.

Nothing in this section prevents you from filing a complaint with the relevant consumer protection authority in your country of residence, if applicable under EU law.`,
  },
  {
    title: "17. Modifications",
    content: `We may modify these Terms from time to time. When we make material changes, we will:

Provide at least 30 days advance notice via email or a prominent notice on our website.
Publish the updated Terms with a new effective date.

Your continued use of the Services after the notice period constitutes acceptance of the modified Terms. If you do not agree to the changes, you may close your Account before the changes take effect.`,
  },
  {
    title: "18. General Provisions",
    content: `Severability: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

Entire agreement: These Terms, together with our Privacy Policy and any product-specific terms referenced herein, constitute the entire agreement between you and mavi finans.

Waiver: Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.

Assignment: You may not assign your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.`,
  },
  {
    title: "19. Contact",
    content: `For questions about these Terms, contact us at:

Contact form: mavifinans.eu/contact
Website: mavifinans.eu`,
  },
];

export function TermsContent() {
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
          Terms of Service
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          The rules that govern your use of mavi finans products.
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
