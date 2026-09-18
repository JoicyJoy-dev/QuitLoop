"use client";

import { useState } from "react";
import Link from "next/link";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { helplines } from "@/lib/site";
import { company } from "@/lib/site";

const clauses = [
  {
    id: "clause-1",
    n: "01",
    title: "Eligibility & 18+ Age Verification",
    tag: "Mandatory",
    summary:
      "You must be at least 18 to use the direct-to-consumer QuitLoop app in the UK. Ages 16–17 are only permitted via an NHS Child and Adolescent Stop-Smoking clinic referral.",
    body: [
      "1.1 Age Requirement. The Service is intended solely for individuals aged eighteen (18) years or older resident within the United Kingdom or its Crown Dependencies.",
      "1.2 Digital Age Assurance. In compliance with the UK Age Appropriate Design Code and the Online Safety Act 2023, QuitLoop employs tokenised identity validation. We do not store raw photographic identity cards once validation completes.",
      "1.3 NHS Youth Referral Carve-out. Patients aged 16–17 under a secondary care NHS Trust pilot must be onboarded via a Named Clinical Supervisor.",
    ],
  },
  {
    id: "clause-2",
    n: "02",
    title: "Medical Disclaimer & Non-Prescription Status",
    tag: "Clinical Scope",
    summary:
      "QuitLoop provides behavioural cognitive support, craving logging and breathwork guidance. It does not replace your GP, prescribe medications, or diagnose respiratory disease.",
    body: [
      "2.1 Behavioural Change Classification. QuitLoop is registered with the MHRA as Class I Medical Device Software for habit reversal and vaping cessation support.",
      "2.2 No doctor-patient relationship is established by the neuro-tapering algorithm, conversational reflections, or clinician audio.",
      "2.3 NRT mapping calculators conform to BNF published equivalents. Patients with cardiovascular conditions, pregnancy or concurrent medication must obtain GP clearance.",
    ],
  },
  {
    id: "clause-3",
    n: "03",
    title: "App Subscriptions & Sensor Band Hardware",
    tag: "Billing & Kit",
    summary:
      "Self-funded membership renews automatically each month unless cancelled 24 hours prior. Sensor bands have a 14-day statutory return.",
    body: [
      "3.1 Consumer Contracts Regulations 2013. Self-funded consumers have a 14-day cancellation period.",
      "3.2 Subscriptions are billed in GBP including 20% UK VAT and renew unless terminated via the Patient Portal or native store.",
      "3.3 Pulse Band hardware carries a twelve-month limited manufacturer warranty under the Consumer Rights Act 2015.",
    ],
  },
  {
    id: "clause-4",
    n: "04",
    title: "User Accounts & Biometric Safeguards",
    tag: "Data Security",
    summary:
      "Heart-rate variability and puff logs are encrypted in UK cloud regions. You can export or delete your biometric profile at any time.",
    body: [
      "4.1 Biometric data constitutes special-category data under Article 9 UK GDPR.",
      "4.2 Users remain responsible for device passcodes. Shared family Apple IDs or jailbroken devices fall outside the clinical liability perimeter.",
    ],
  },
  {
    id: "clause-5",
    n: "05",
    title: "Acceptable Conduct & Sanctuary Community",
    tag: "Safeguarding",
    summary:
      "Do not glorify vaping, post purchase links, or harass members in withdrawal. Zero-tolerance moderation applies.",
    body: [
      "5.1 Prohibited discourse includes promotion of nicotine liquids, shame-inducing harassment, and self-harm incitement.",
      "5.2 Public feeds are filtered in line with NHS digital community safety frameworks. Violations may be suspended without refund.",
    ],
  },
  {
    id: "clause-6",
    n: "06",
    title: "Intellectual Property & Breathwork Pacings",
    tag: "Copyright",
    summary:
      "Breathing timers, haptic loops, audio and tapering algorithms belong to QuitLoop and may be used for personal recovery only.",
    body: [
      "6.1 All visual interfaces, neuro-adaptive haptic sequences and 4-7-8 rhythms are proprietary intellectual property of QuitLoop Health Ltd.",
    ],
  },
  {
    id: "clause-7",
    n: "07",
    title: "Clinical Content (NICE NG209 & DTAC)",
    tag: "Standards",
    summary:
      "Strategies follow NICE NG209. Interactive scripts are audited by the Clinical Advisory Board every six months.",
    body: [
      "7.1 Behavioural modules reflect NICE Guideline NG209 and NHS DTAC v2.1.",
      "7.2 Clinical governance review is led by registered GMC consultants in respiratory medicine and behavioural psychology.",
    ],
  },
  {
    id: "clause-8",
    n: "08",
    title: "Limitation of Liability",
    tag: "Legal Boundary",
    summary:
      "We never exclude liability where British law forbids it, including injury caused by proven negligence. Outcomes vary by physiology and compliance.",
    body: [
      "8.1 Nothing limits liability for death or personal injury from proven gross negligence or fraud.",
      "8.2 QuitLoop does not warrant absolute cessation or complete prevention of relapse events.",
    ],
  },
  {
    id: "clause-9",
    n: "09",
    title: "Governing Law & Jurisdiction",
    tag: "Jurisdiction",
    summary:
      "These terms are governed by the laws of England and Wales. Residents of Scotland or Northern Ireland may bring proceedings in their local courts.",
    body: [
      "9.1 These Terms shall be governed by and construed under the laws of England and Wales.",
    ],
  },
  {
    id: "clause-10",
    n: "10",
    title: "Clinical Governance & Data Protection",
    tag: "Data Protection Officer",
    summary:
      "Contact the UK Data Protection Officer or the Information Commissioner’s Office at any time.",
    body: [
      `10.1 Statutory DPO: ${company.legalName}, ${company.address}. ${company.dpoEmail} • ${company.dpoPhone}.`,
      "10.2 You may lodge a complaint with the ICO via ico.org.uk or 0303 123 1113.",
    ],
  },
];

export default function TermsPage() {
  const [open, setOpen] = useState<string | null>("clause-1");

  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 pt-8 pb-20 lg:px-12">
        <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-semibold text-primary">
                Digital Technology Assessment Criteria (DTAC) Assessed
              </span>
              <span className="rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-semibold text-secondary">
                NICE NG209 Aligned
              </span>
            </div>
            <h1 className="font-display text-[34px] leading-10 font-semibold tracking-tight text-on-surface lg:text-[40px] lg:leading-[48px]">
              Terms of Service & Clinical Agreement
            </h1>
            <p className="mt-3 text-sm text-on-surface-variant">
              {company.legalName} • Registered in England & Wales (No. {company.number}) • ICO {company.ico} • {company.address}.
            </p>
            <p className="mt-2 text-xs text-outline">Last updated: 14 February 2025 • Version 4.2 (Standard Clinical Tier)</p>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] bg-surface-container-low p-6 shadow-[0_8px_32px_-4px_rgba(0,8,12,0.5)] sm:p-7">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-wider text-tertiary uppercase">
                Immediate Clinical Notice
              </span>
              <p className="mt-1 text-lg font-semibold text-on-surface">
                QuitLoop is a neuroplastic habit-reversal software, not an acute psychiatric crisis service.
              </p>
              <p className="mt-2 text-sm text-on-surface-variant">
                If you are undergoing severe psychological distress, self-harm crisis, or profound somatic withdrawal, dial{" "}
                <strong className="text-on-surface">{helplines.emergency}</strong> or attend A&E. Free NHS non-emergency triage is{" "}
                <strong className="text-on-surface">{helplines.nhs111}</strong>.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a href={`tel:${helplines.nhs111}`} className="rounded-full bg-surface-container-highest px-5 py-2.5 text-center text-sm font-semibold">
                NHS 111 Triage
              </a>
              <a
                href="https://www.nhs.uk/service-search/mental-health/find-an-urgent-mental-health-helpline"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-surface-container-high px-5 py-2.5 text-center text-sm font-semibold text-tertiary"
              >
                Find Local Crisis Line
              </a>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Mini title="UK Age 18+ Certified" body="Strict age assurance. Minors under 18 require NHS Trust parent-clinician pathways." />
          <Mini title="Zero Advertising Telemetry" body="Biometric trends are encrypted under UK GDPR Class I MDDS software standards." />
          <Mini title="No Chemical Sales" body="QuitLoop does not dispense, vend or affiliate with e-liquid, synthetic nicotine or pods." />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <aside className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-4">
            <div className="rounded-[2rem] bg-surface-container-low p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-wider text-outline uppercase">Statutory Clauses</span>
                <span className="text-[11px] text-primary">10 Articles</span>
              </div>
              <nav className="flex flex-col gap-1">
                {clauses.map((clause) => (
                  <a
                    key={clause.id}
                    href={`#${clause.id}`}
                    className="rounded-xl px-3.5 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary"
                  >
                    {clause.n}. {clause.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <div className="flex flex-col gap-6 lg:col-span-8">
            {clauses.map((clause) => (
              <article key={clause.id} id={clause.id} className="scroll-mt-28 rounded-[2rem] bg-surface-container-low p-6 shadow-sm lg:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-xs font-semibold text-primary">
                      {clause.n}
                    </span>
                    <h2 className="font-display text-xl font-semibold text-on-surface">{clause.title}</h2>
                  </div>
                  <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 text-[11px] text-outline">
                    {clause.tag}
                  </span>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-xl bg-surface-container p-4 text-left text-xs font-semibold text-primary"
                  onClick={() => setOpen((value) => (value === clause.id ? null : clause.id))}
                >
                  Plain English summary (young adults 18–30)
                </button>
                {open === clause.id ? (
                  <p className="mt-3 text-[13px] text-on-surface-variant">{clause.summary}</p>
                ) : null}
                <div className="mt-4 space-y-3 text-sm leading-6 text-on-surface-variant">
                  {clause.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
            <div className="rounded-[2rem] bg-surface-container p-4">
              <Link href="/account-deletion" className="text-sm font-semibold text-primary hover:underline">
                GDPR deletion request →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Mini({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[2rem] bg-surface-container-low p-5">
      <h4 className="font-semibold text-on-surface">{title}</h4>
      <p className="mt-1 text-[13px] text-on-surface-variant">{body}</p>
    </div>
  );
}
