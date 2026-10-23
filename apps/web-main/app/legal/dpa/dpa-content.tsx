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
    content: `This Data Processing Agreement ("DPA") forms part of the Agreement between the data controller ("Controller", "you", "Merchant") and mavi finans ("Processor", "we", "us", "mavi") and governs the processing of personal data in connection with the provision of mavi pay and related services.

This DPA applies where and to the extent that mavi finans processes personal data on behalf of the Controller in the course of providing the Services, and where such processing is subject to the General Data Protection Regulation (EU) 2016/679 ("GDPR") and applicable EU member state data protection laws.

This DPA is effective from the date you begin using mavi pay and continues until the termination of the Agreement.`,
  },
  {
    title: "2. Definitions",
    content: `Capitalised terms used in this DPA have the meanings set out in the GDPR unless otherwise defined in this DPA or the Agreement.

- "Controller" means the Merchant, who determines the purposes and means of processing personal data
- "Processor" means mavi finans, which processes personal data on behalf of the Controller
- "Data Subject" means an identified or identifiable natural person whose personal data is processed
- "Personal Data" means any information relating to a Data Subject processed in connection with the Services
- "Sub-processor" means any third party engaged by mavi finans to process Personal Data on behalf of the Controller
- "Services" means mavi pay and any related services provided by mavi finans`,
  },
  {
    title: "3. Nature and purpose of processing",
    content: `mavi finans processes Personal Data solely for the purpose of providing the Services to the Controller, as described in the Agreement. The processing activities include:

Categories of Data Subjects:
- Customers of the Merchant (end-users who make purchases)
- Merchant's employees and representatives (account administrators)

Categories of Personal Data:
- Contact information (name, email address)
- Transaction data (payment amounts, dates, product details)
- Payment information (processed by Stripe — mavi pay does not store full card numbers)
- Account credentials (email, hashed passwords)

Nature of processing operations:
- Collection, recording, and storage of transaction data
- Transmission of payment data to Stripe for processing
- Generation and delivery of transaction receipts and notifications
- Provision of the merchant dashboard and analytics
- Delivery of webhook events to Merchant-specified endpoints

Duration of processing:
- For the duration of the Agreement, plus any retention period required by applicable law or as specified in our data retention policy`,
  },
  {
    title: "4. Obligations of the Processor",
    content: `mavi finans agrees to:

a) Process Personal Data only on documented instructions from the Controller, including with regard to transfers of Personal Data to a third country or international organisation, unless required to do so by EU or member state law. We will inform you if we believe an instruction infringes the GDPR.

b) Ensure that persons authorised to process Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.

c) Implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, as described in Section 6.

d) Respect the conditions for engaging Sub-processors as described in Section 5.

e) Assist the Controller, insofar as possible, in fulfilling the Controller's obligation to respond to requests from Data Subjects exercising their rights under Chapter III of the GDPR. If we receive a request directly from a Data Subject, we will forward it to the Controller without undue delay.

f) Assist the Controller in ensuring compliance with the obligations pursuant to Articles 32 to 36 of the GDPR (security, breach notification, data protection impact assessments, and prior consultation), taking into account the nature of processing and the information available to us.

g) At the choice of the Controller, delete or return all Personal Data after the end of the provision of Services, and delete existing copies unless EU or member state law requires storage of the Personal Data.

h) Make available to the Controller all information necessary to demonstrate compliance with the obligations laid down in this DPA and Article 28 of the GDPR.`,
  },
  {
    title: "5. Sub-processors",
    content: `The Controller authorises mavi finans to engage the following Sub-processors in connection with the provision of the Services:

Current Sub-processors:

| Sub-processor | Purpose | Location | Safeguards |
|--------------|---------|----------|------------|
| Stripe, Inc. | Payment processing | USA / EU | EU Standard Contractual Clauses, DPA in place |
| Resend, Inc. | Transactional email delivery | USA | EU Standard Contractual Clauses |
| Hetzner Online GmbH | Infrastructure hosting (VPS) | Germany | EU-based, GDPR-compliant |
| Cloudflare, Inc. | DNS and DDoS protection | Global | EU Standard Contractual Clauses |

mavi finans will notify the Controller of any intended changes concerning the addition or replacement of Sub-processors. The Controller may object to a new Sub-processor within 14 days of notification. If the objection is reasonable and cannot be resolved, the Controller may terminate the affected Services.

Where mavi finans engages a Sub-processor, we will impose data protection obligations that are no less protective than those set out in this DPA through a written contract. mavi finans remains fully liable to the Controller for the performance of any Sub-processor's obligations.`,
  },
  {
    title: "6. Technical and organisational measures",
    content: `mavi finans implements and maintains the following technical and organisational security measures:

Encryption:
- All data in transit is encrypted using TLS 1.3
- Passwords are hashed using bcrypt
- API keys and secrets are encrypted at rest in the configuration management system

Access controls:
- Role-based access control for internal systems
- Multi-factor authentication for administrative access
- Principle of least privilege applied to all system access
- Regular access reviews and revocation of unused credentials

Network security:
- Services run within isolated Docker containers
- Database and cache services are not exposed to the public internet
- Firewall rules restrict access to necessary ports only
- DDoS protection via Cloudflare

Monitoring and logging:
- Centralised logging with access restricted to authorised personnel
- Error and exception tracking via Sentry
- Automated alerts for suspicious activity
- Regular security updates and patch management

Data resilience:
- Daily automated PostgreSQL backups with 30-day retention
- Database backups encrypted at rest
- Backups stored in a separate physical location
- Monthly backup restoration tests`,
  },
  {
    title: "7. Data breach notification",
    content: `In the event of a personal data breach, mavi finans will:

- Notify the Controller without undue delay and in any event within 48 hours of becoming aware of the breach
- Provide the Controller with:
  - A description of the nature of the breach
  - The categories and approximate number of Data Subjects and records affected
  - The name and contact details of the data protection officer or other contact point
  - The likely consequences of the breach
  - Measures taken or proposed to address the breach and mitigate its effects
- Cooperate with the Controller in meeting its obligations under Articles 33 and 34 of the GDPR
- Not disclose information about the breach to third parties except as required by law or with the Controller's consent`,
  },
  {
    title: "8. International data transfers",
    content: `Personal Data processed by mavi pay is stored on infrastructure located in Germany (Hetzner data centre in Falkenstein).

Some Sub-processors (Stripe, Resend) process data in the United States. Where Personal Data is transferred to a third country outside the EEA that has not received an adequacy decision from the European Commission, such transfers are governed by:

- EU Standard Contractual Clauses (SCCs) as adopted by the European Commission
- Supplementary technical and organisational measures as appropriate
- Transfer impact assessments conducted where required

The Controller authorises mavi finans to transfer Personal Data to the Sub-processors listed in Section 5 in accordance with the safeguards described above.`,
  },
  {
    title: "9. Audits and compliance",
    content: `mavi finans will make available to the Controller all information necessary to demonstrate compliance with this DPA. Upon the Controller's written request (no more than once per year), and subject to reasonable notice and confidentiality obligations, mavi finans will:

- Provide a summary of its most recent security assessment or certification
- Respond to a written security questionnaire
- Cooperate in good faith to facilitate an audit conducted by the Controller or an independent auditor at the Controller's expense

Any audit must not unreasonably disrupt mavi finans's business operations. The Controller will bear all costs associated with an audit unless the audit reveals a material breach of this DPA by mavi finans.`,
  },
  {
    title: "10. Liability",
    content: `Each party's liability arising from this DPA is subject to the limitations and exclusions of liability set out in the Agreement. Nothing in this DPA limits either party's liability for breaches of data protection law that cannot be limited by contract.

A party is entitled to claim damages from the other party to the extent it has been held liable to Data Subjects, supervisory authorities, or other third parties as a result of the other party's breach of this DPA or applicable data protection law.

Last modified: June 2026`,
  },
];

export function DPAContent() {
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
          Data Processing Agreement
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg md:text-xl"
          style={{ color: "#8899aa" }}
        >
          How we process personal data under GDPR.
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
