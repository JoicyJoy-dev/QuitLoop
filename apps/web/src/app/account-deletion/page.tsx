"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  BadgeCheck,
  Database,
  Lock,
  Mail,
  Scale,
  Shield,
  TriangleAlert,
  Zap,
} from "lucide-react";
import { CrisisBanner } from "@/components/site/CrisisBanner";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { company, helplines } from "@/lib/site";

type Step = 1 | 2 | 3 | "success";

export default function AccountDeletionPage() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("alex.morgan@nhs.net");
  const [reason, setReason] = useState("");
  const [acked, setAcked] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const goNextFromOne = (event: FormEvent) => {
    event.preventDefault();
    if (!acked) {
      return;
    }
    setStep(2);
  };

  const finalise = () => {
    if (otp.trim().length < 4) {
      setOtpError("Please enter the 6-digit security code sent to your registered identity.");
      return;
    }
    setOtpError("");
    setStep("success");
  };

  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-8 lg:px-12 lg:py-12">
        <CrisisBanner body="You are not alone in this wave. Requesting data erasure will permanently reset your 14-day progress, tapering calibrations, and biometric adaptation logs. If you are experiencing distress, take a breath before deciding." />

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-surface-container-high px-2.5 py-0.5 text-[11px] font-semibold tracking-wider text-outline uppercase">
                UK GDPR • Article 17
              </span>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Right to Erasure
              </span>
            </div>
            <h1 className="font-display text-[34px] leading-10 font-semibold tracking-tight text-on-surface lg:text-[44px] lg:leading-[52px]">
              Account Deletion & Data Erasure
            </h1>
            <p className="mt-1 max-w-2xl text-base leading-7 text-on-surface-variant">
              Exercising your statutory right to remove all personal telemetry, cognitive assessments, and neuro-adaptive habit logs from QuitLoop servers.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-full bg-surface-container px-4 py-2 shadow-sm md:self-auto">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-on-surface-variant">
              Encrypted Protocol • ICO ZA892110
            </span>
          </div>
        </div>

        <nav aria-label="Erasure progress" className="w-full rounded-[2rem] bg-surface-container-low p-3 shadow-sm lg:p-4">
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <StepTab n={1} title="Identity & Credentials" active={step === 1} done={step !== 1 && step !== "success" ? Number(step) > 1 : step === "success"} />
            <StepTab n={2} title="Data Erasure Scope" active={step === 2} done={step === 3 || step === "success"} />
            <StepTab n={3} title="Security Verification" active={step === 3} done={step === "success"} />
          </ol>
        </nav>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-8">
            {step === 1 ? (
              <section className="flex flex-col gap-6 rounded-[2rem] bg-surface-container p-6 shadow-xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-7 w-7 text-primary" />
                    <div>
                      <h3 className="font-display text-2xl font-medium text-on-surface">Account Authentication</h3>
                      <p className="text-[13px] text-on-surface-variant">
                        Confirm your NHS or email credentials to initiate erasure token generation.
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-surface-container-highest px-3 py-1 text-[11px] font-semibold text-secondary">
                    Step 1 of 3
                  </span>
                </div>
                <form className="flex flex-col gap-6" onSubmit={goNextFromOne}>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-on-surface" htmlFor="user-identifier">
                    <span className="flex items-center justify-between">
                      Registered Email Address or NHS Login ID
                      <span className="text-[13px] font-normal text-outline">Case-insensitive</span>
                    </span>
                    <span className="relative">
                      <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-outline" />
                      <input
                        id="user-identifier"
                        required
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="e.g. alex.morgan@nhs.net or alex@domain.co.uk"
                        className="h-12 w-full rounded-full bg-surface-container-lowest pr-4 pl-12 text-sm font-normal text-on-surface outline-none focus:ring-2 focus:ring-primary"
                      />
                    </span>
                  </label>
                  <label className="flex flex-col gap-2 text-sm font-semibold text-on-surface" htmlFor="departure-reason">
                    Primary Reason for Leaving <span className="font-normal text-outline">(Optional clinical feedback)</span>
                    <select
                      id="departure-reason"
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      className="h-12 w-full appearance-none rounded-full bg-surface-container-lowest px-5 text-sm font-normal text-on-surface outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Please select an option...</option>
                      <option value="achieved">Achieved complete vape freedom / Finished programme</option>
                      <option value="too-fast">Tapering pace too fast</option>
                      <option value="switching-nhs">Switching to offline NHS clinic</option>
                      <option value="privacy">Specific privacy & data hygiene preference</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </label>
                  <div className="flex items-start gap-4 rounded-2xl bg-surface-container-low p-5">
                    <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-tertiary" />
                    <div>
                      <h4 className="text-lg font-semibold text-on-surface">Permanent Milestones Lost</h4>
                      <p className="text-[13px] leading-5 text-on-surface-variant">
                        Your QuitLoop profile currently records: <strong>336 consecutive smoke-free hours</strong>,{" "}
                        <strong>£142.80 estimated savings</strong>, and <strong>18 mastered craving waves</strong>. Once wiped, these neuro-tapering calibrations cannot be recovered by our team or NHS support liaisons.
                      </p>
                    </div>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3.5 rounded-2xl p-2 select-none">
                    <input
                      required
                      type="checkbox"
                      checked={acked}
                      onChange={(event) => setAcked(event.target.checked)}
                      className="mt-0.5 h-5 w-5 accent-primary"
                    />
                    <span className="text-sm leading-snug text-on-surface-variant">
                      I understand this action will permanently purge my puff telemetry, streak milestones, biometric logs, and calibrated habit loops under UK GDPR Article 17.
                    </span>
                  </label>
                  <div className="flex flex-col items-center justify-between gap-4 pt-4 sm:flex-row">
                    <Link href="/" className="w-full rounded-full px-6 py-3 text-center text-sm font-semibold text-on-surface-variant hover:bg-surface-container-highest sm:w-auto">
                      Cancel & Retain My Account
                    </Link>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-container px-8 py-3.5 text-sm font-semibold text-on-primary shadow-[0_0_24px_-2px_rgba(25,181,165,0.3)] hover:bg-primary sm:w-auto"
                    >
                      Continue to Step 2: Confirm Data Erasure →
                    </button>
                  </div>
                </form>
              </section>
            ) : null}

            {step === 2 ? (
              <section className="flex flex-col gap-6 rounded-[2rem] bg-surface-container p-6 shadow-xl sm:p-8">
                <HeaderRow title="Data Erasure Scope Audit" body="Review specific categories marked for zero-fill shredding." step="Step 2 of 3" />
                <ScopeRow title="Neuro-Telemetry & Breathwork Logs" body="Urge duration records, micro-reflections, pulse checks" badge="Immediate Wipe" />
                <ScopeRow title="Personal Profile & NHS Linking Tokens" body="NHS number hash, mobile identifier, birth month" badge="Immediate Wipe" />
                <ScopeRow title="Statutory Financial Ledger (Self-Funded tier)" body="Stripped of names. Retained 6 years under HMRC Section 28A" badge="Statutory Archive" muted />
                <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row">
                  <button type="button" className="rounded-full px-6 py-3 text-sm font-semibold hover:bg-surface-container-highest" onClick={() => setStep(1)}>
                    ← Back to Step 1
                  </button>
                  <button
                    type="button"
                    className="rounded-full bg-primary-container px-8 py-3.5 text-sm font-semibold text-on-primary hover:bg-primary"
                    onClick={() => setStep(3)}
                  >
                    Proceed to Security Code Authorization →
                  </button>
                </div>
              </section>
            ) : null}

            {step === 3 ? (
              <section className="flex flex-col gap-6 rounded-[2rem] bg-surface-container p-6 shadow-xl sm:p-8">
                <HeaderRow title="Final Verification & Authorization" body="A 6-digit confirmation key has been dispatched to your identity address." step="Step 3 of 3" />
                <label className="flex flex-col gap-2 text-sm font-semibold text-on-surface">
                  Enter 6-Digit Authorization Code
                  <input
                    value={otp}
                    maxLength={6}
                    onChange={(event) => setOtp(event.target.value)}
                    placeholder="123456"
                    className="h-14 max-w-sm rounded-full bg-surface-container-lowest text-center font-display text-xl tracking-[0.4em] text-on-surface outline-none focus:ring-2 focus:ring-tertiary"
                  />
                </label>
                {otpError ? <p className="text-sm text-error">{otpError}</p> : null}
                <p className="text-[13px] text-outline">
                  Didn&apos;t receive the key? Check your NHS App inbox or junk folder, or wait 45 seconds to resend.
                </p>
                <div className="flex items-start gap-3 rounded-2xl bg-error-container/20 p-4">
                  <TriangleAlert className="mt-0.5 h-5 w-5 text-error" />
                  <p className="text-[13px] text-on-surface-variant">
                    Clicking <strong className="text-error">Permanently Erase Everything</strong> will terminate your active authentication sessions across all iOS, Android, and Web Companion instances immediately.
                  </p>
                </div>
                <div className="flex flex-col justify-between gap-4 pt-4 sm:flex-row">
                  <button type="button" className="rounded-full px-6 py-3 text-sm font-semibold hover:bg-surface-container-highest" onClick={() => setStep(2)}>
                    ← Back to Scope
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-error-container px-8 py-3.5 text-sm font-semibold text-on-error-container hover:bg-error"
                    onClick={finalise}
                  >
                    Permanently Erase All Data
                  </button>
                </div>
              </section>
            ) : null}

            {step === "success" ? (
              <section className="flex flex-col items-center gap-6 rounded-[2rem] bg-surface-container p-10 text-center shadow-2xl">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-container text-secondary shadow-[0_0_32px_0_rgba(134,215,169,0.3)]">
                  <BadgeCheck className="h-10 w-10" />
                </div>
                <h3 className="font-display text-3xl font-semibold text-on-surface">Erasure Request Executed</h3>
                <p className="max-w-md text-sm text-on-surface-variant">
                  Your QuitLoop account and associated behavioural logs have been wiped from production storage. Reference ticket{" "}
                  <strong className="font-mono text-primary">UK-GDPR-892110-XQ</strong> has been lodged for audit compliance.
                </p>
                <Link href="/" className="rounded-full bg-surface-container-high px-8 py-3.5 text-sm font-semibold text-on-surface hover:bg-surface-bright">
                  Return to Homepage
                </Link>
              </section>
            ) : null}
          </div>

          <aside className="flex flex-col gap-6 lg:col-span-4">
            <div className="flex flex-col gap-5 rounded-[2rem] bg-surface-container p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Scale className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-on-surface">Data Protection Notice</h4>
                  <p className="text-[11px] text-outline">UK GDPR (Article 17 Compliance)</p>
                </div>
              </div>
              <Notice icon={<Zap className="h-4 w-4" />} title="Purged Immediately (0 Hours)" tone="text-secondary">
                Biometric craving logs, microphone breath acoustics, journal notes, personalised micro-reflections, push notification tokens, and behavioural telemetry profiles.
              </Notice>
              <Notice icon={<Database className="h-4 w-4" />} title="Cold Backups Overwrite (30 Days)" tone="text-primary">
                Cryptographically secured snapshot backups are completely phased out and purged within standard NHS-grade 30-day rotation cycles.
              </Notice>
              <Notice icon={<Scale className="h-4 w-4" />} title="HMRC Statutory Invoices (6 Years)" tone="text-outline">
                Under the UK Taxes Management Act 1970, transaction financial receipts for self-funded memberships must be retained for 6 fiscal years. All clinical metadata is stripped beforehand.
              </Notice>
              <div className="mt-2 flex items-center gap-3 rounded-2xl bg-surface-container-low p-3.5 text-[11px] text-outline">
                Data Protection Officer:{" "}
                <a className="text-primary hover:underline" href={`mailto:${company.dpoEmail}`}>
                  {company.dpoEmail}
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] bg-surface-container-low p-6">
              <p className="text-[11px] font-semibold tracking-wider text-secondary uppercase">Neuroplasticity Note</p>
              <p className="mt-3 text-sm text-on-surface">
                “Your brain never truly loses the recovery rewiring it built. Even if you wipe this digital dashboard, the physical nicotine receptor downregulation you earned remains with you.”
              </p>
              <p className="mt-4 text-[11px] text-outline">QuitLoop Clinical Behavioural Team</p>
            </div>
          </aside>
        </div>

        <section className="rounded-[2rem] bg-surface-container-low p-6 shadow-lg lg:p-8">
          <div className="flex flex-col justify-between gap-6 pb-6 lg:flex-row lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-semibold text-on-surface">Local NHS Stop Smoking Support</h3>
              <p className="text-sm text-on-surface-variant">
                Free, non-judgemental nicotine independence clinics and 1-on-1 advisor consultations across the UK.
              </p>
            </div>
            <div className="rounded-full bg-surface-container px-4 py-2 text-xs font-semibold text-on-surface">
              Free National Quitline:{" "}
              <a className="font-bold text-primary hover:underline" href={`tel:${helplines.nhsQuitline.replaceAll(" ", "")}`}>
                {helplines.nhsQuitline}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RegionCard nation="England" scheme="NHS Better Health" body="Find your local stop-smoking advisor clinic and complimentary NRT vouchers." href="https://www.nhs.uk/better-health/quit-smoking/" label="Access Local Services" />
            <RegionCard nation="Scotland" scheme="Quit Your Way" body="Free confidential telephone support and pharmacy access schemes across Scotland." href="tel:0800848484" label="Call 0800 84 84 84" />
            <RegionCard nation="Wales" scheme="Help Me Quit" body="Bilingual Welsh cessation advisors offering tailored nicotine tapering guidance." href="tel:08000852219" label="Call 0800 085 2219" />
            <RegionCard nation="Northern Ireland" scheme="Stop Smoking NI" body="HSC registered specialised youth and young adult smoking and vaping support." href="https://www.stopsmokingni.info" label="Locate HSC Provider" />
          </div>
        </section>
      </div>
    </div>
  );
}

function StepTab({ n, title, active, done }: { n: number; title: string; active: boolean; done: boolean }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-2xl p-3 ${active ? "bg-surface-container-high text-primary" : done ? "bg-surface-container text-secondary" : "text-outline"}`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold ${active ? "bg-primary text-on-primary" : done ? "bg-secondary text-on-secondary" : "bg-surface-container-highest text-on-surface-variant"}`}
      >
        {n}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-[11px] font-semibold tracking-wider uppercase">Step 0{n}</span>
        <span className={`truncate font-display text-xl ${active || done ? "text-on-surface" : "text-on-surface-variant"}`}>
          {title}
        </span>
      </div>
    </li>
  );
}

function HeaderRow({ title, body, step }: { title: string; body: string; step: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-2xl font-medium text-on-surface">{title}</h3>
        <p className="text-[13px] text-on-surface-variant">{body}</p>
      </div>
      <span className="rounded-full bg-surface-container-highest px-3 py-1 text-[11px] font-semibold text-secondary">
        {step}
      </span>
    </div>
  );
}

function ScopeRow({
  title,
  body,
  badge,
  muted,
}: {
  title: string;
  body: string;
  badge: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-surface-container-low p-4">
      <div>
        <div className="font-semibold text-on-surface">{title}</div>
        <div className="text-[13px] text-outline">{body}</div>
      </div>
      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${muted ? "bg-surface-container-highest text-outline" : "bg-secondary-container text-on-secondary-container"}`}>
        {badge}
      </span>
    </div>
  );
}

function Notice({
  icon,
  title,
  tone,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 pb-3">
      <span className={`flex items-center gap-1.5 text-xs font-semibold ${tone}`}>
        {icon}
        {title}
      </span>
      <p className="text-[13px] leading-5 text-on-surface-variant">{children}</p>
    </div>
  );
}

function RegionCard({
  nation,
  scheme,
  body,
  href,
  label,
}: {
  nation: string;
  scheme: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-surface-container p-4">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-on-surface">{nation}</span>
        <span className="text-[11px] font-semibold text-secondary">{scheme}</span>
      </div>
      <p className="text-[13px] text-on-surface-variant">{body}</p>
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-auto text-[11px] font-semibold text-primary hover:underline">
        {label}
      </a>
    </div>
  );
}
