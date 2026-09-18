import type { Metadata } from "next";
import Link from "next/link";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { PageHero } from "@/components/site/PageHero";
import { company, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/privacy");

const nav = [
  { href: "#section-promises", label: "1. Commitments & Anti-Monetisation" },
  { href: "#section-data-inventory", label: "2. Biomarker Data Inventory" },
  { href: "#section-article-9", label: "3. Article 9 & Caldicott Standards" },
  { href: "#section-retention", label: "4. Retention & Auto-Purge Cycles" },
  { href: "#section-storage-cookies", label: "5. Storage, Tokens & Local DB" },
  { href: "#section-dpo-ico", label: "6. DPO & ICO Statutory Escalation" },
];

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10 lg:px-12">
        <PageHero
          eyebrow="Clinical Data Protocol v3.4"
          title="Privacy Policy & Clinical Data Governance"
          body="Behavioural nicotine cessation requires profound trust. QuitLoop operates under NHS Digital Technology Assessment Criteria (DTAC) standards and UK GDPR Article 9 safeguards for special-category health data."
          aside={
            <div className="flex max-w-xl flex-wrap gap-2">
              {["UK GDPR & DPA 2018 Certified", "Zero Third-Party Ad Trackers", "London AWS Residency (eu-west-2)", "Article 9 Special Category Safeguards"].map(
                (badge) => (
                  <span key={badge} className="rounded-2xl bg-surface-container-low px-3.5 py-2 text-[11px] font-semibold text-secondary">
                    {badge}
                  </span>
                ),
              )}
            </div>
          }
        />

        <section className="rounded-[3rem] bg-surface-container-low p-6 shadow-xl lg:p-8">
          <div className="flex flex-col justify-between gap-6 border-b border-surface-container-highest/60 pb-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-xl font-medium text-on-surface">Self-Service Data Sovereignty Hub</h2>
              <p className="text-[13px] text-on-surface-variant">
                Live controls over your digital biomarker records and portability rights under UK GDPR Articles 15, 17, and 20.
              </p>
            </div>
            <span className="rounded-full bg-secondary-container/30 px-3 py-1 text-[11px] font-semibold text-secondary">
              Patient ID: QL-88219-UK (Active Session)
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
            <HubCard title="Portability Archive" body="Download machine-readable biometric logs, tap counts, and nicotine tapering curves in JSON and CSV." action="Export is available inside the signed-in portal." />
            <HubCard title="Predictive Biometrics" body="Pause on-device models parsing heart-rate variability and inhalation micro-gestures. Core tracking still works." action="Toggle from the portal Health tab." />
            <HubCard title="Right to Erasure" body="Execute UK GDPR Article 17 hard-deletion. Permanently wipes server records, biometric logs, and calibration indices." href="/account-deletion" action="Request Immediate Erasure" />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28 flex flex-col gap-2 rounded-[2rem] bg-surface-container-low p-4">
              <span className="px-3 py-1 text-[11px] tracking-widest text-outline uppercase">Quick Navigation</span>
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="rounded-xl px-3 py-2 text-sm font-semibold text-on-surface hover:bg-surface-container hover:text-primary">
                  {item.label}
                </a>
              ))}
            </div>
          </aside>
          <div className="flex flex-col gap-10 lg:col-span-9">
            <LegalCard id="section-promises" n={1} title="What We Promise vs What We Never Do">
              <p>
                Standard commercial wellness trackers frequently monetise micro-habits and auction behavioural telemetry. QuitLoop repudiates this model. Nicotine dependence is a clinical dependency; rehabilitation telemetry remains strictly non-commercial.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <ul className="space-y-3 rounded-2xl bg-surface-container p-6 text-sm">
                  <li><strong>End-to-end encryption:</strong> AES-256-GCM on device before cloud backup.</li>
                  <li><strong>100% UK residency:</strong> AWS London (eu-west-2) sovereign jurisdiction.</li>
                  <li><strong>Edge model execution:</strong> Craving prediction on-device, not on ad clusters.</li>
                  <li><strong>Right to portability:</strong> JSON and CSV export at zero cost.</li>
                </ul>
                <ul className="space-y-3 rounded-2xl bg-surface-container p-6 text-sm">
                  <li><strong>Zero data brokerage:</strong> We never sell puff histories or habit profiles.</li>
                  <li><strong>No ad pixels:</strong> No Meta, TikTok, Google Ads or fingerprinting scripts.</li>
                  <li><strong>No insurer linkage:</strong> Cessation pace is never shared with underwriters.</li>
                  <li><strong>No raw audio archive:</strong> SOS voice notes transcribe on-device then purge.</li>
                </ul>
              </div>
            </LegalCard>

            <LegalCard id="section-data-inventory" n={2} title="Exact Data Collected & Clinical Purpose">
              <p>
                In accordance with UK GDPR Article 5(1)(c) (data minimisation), QuitLoop collects only the telemetry required for personalised neuro-tapering and patient support.
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="bg-surface-container text-on-surface">
                      <th className="rounded-l-xl px-4 py-3">Data Category</th>
                      <th className="px-4 py-3">Telemetry</th>
                      <th className="px-4 py-3">Statutory Basis</th>
                      <th className="rounded-r-xl px-4 py-3">Retention</th>
                    </tr>
                  </thead>
                  <tbody className="text-on-surface-variant">
                    <tr>
                      <td className="px-4 py-4 font-semibold text-on-surface">Identity & Account</td>
                      <td className="px-4 py-4">Optional NHS number, hashed email, salted credential, 18+ age band.</td>
                      <td className="px-4 py-4">Article 6(1)(b) Contract</td>
                      <td className="px-4 py-4">Active account + 30 days post-deletion.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-semibold text-on-surface">Nicotine biomarkers</td>
                      <td className="px-4 py-4">Inhalation timestamps, aerosol volume estimates, mg/ml, taper goals.</td>
                      <td className="px-4 py-4">Article 9(2)(a) Explicit consent</td>
                      <td className="px-4 py-4">Until account life or one-click reset.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-semibold text-on-surface">Sensor band metrics</td>
                      <td className="px-4 py-4">PPG pulse, HRV (RMSSD), skin conductance, hand-to-mouth accelerometer.</td>
                      <td className="px-4 py-4">Article 9(2)(h) Health care</td>
                      <td className="px-4 py-4">Raw 50Hz stream purged every 48 hours.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-4 font-semibold text-on-surface">Craving reflections</td>
                      <td className="px-4 py-4">Trigger context, intensity 1–5, on-device transcription tokens.</td>
                      <td className="px-4 py-4">Article 9(2)(a) Explicit consent</td>
                      <td className="px-4 py-4">Raw audio deleted instantly; tokens 90 days.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </LegalCard>

            <LegalCard id="section-article-9" n={3} title="Article 9 Special Category Safeguards & Caldicott Governance">
              <p>
                Inhalation counts, nicotine titration steps and craving physiological markers are special-category data. Processing is overseen by a designated Clinical Caldicott Guardian in line with the National Data Guardian’s eight principles.
              </p>
            </LegalCard>

            <LegalCard id="section-retention" n={4} title="Data Retention & Automated Purge Cycles">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Retention title="Immediate" body="SOS craving audio is processed in RAM. Raw files are overwritten within 60 seconds of transcription." />
                <Retention title="48 hours" body="Raw 50Hz PPG is aggregated into hourly medians, then discarded." />
                <Retention title="12-month dormant" body="Accounts with no sync for 365 days are notified, then identifying clinical records are purged." />
              </div>
            </LegalCard>

            <LegalCard id="section-storage-cookies" n={5} title="Cookies, Tokens & Local Offline Storage">
              <p>
                QuitLoop uses strictly essential technical tokens to sustain clinical session security and offline breathwork. No advertising cookies are present. Manage preferences on the{" "}
                <Link href="/cookies" className="text-primary hover:underline">
                  cookie page
                </Link>
                .
              </p>
            </LegalCard>

            <LegalCard id="section-dpo-ico" n={6} title="Clinical DPO & Statutory Supervisory Authority (ICO)">
              <p>
                {company.legalName}, Attn: {company.dpoName}, {company.address}. Email{" "}
                <a className="text-primary hover:underline" href={`mailto:${company.dpoEmail}`}>
                  {company.dpoEmail}
                </a>
                . Statutory response SLA: under 72 hours. You may also lodge a complaint with the ICO at ico.org.uk or 0303 123 1113.
              </p>
            </LegalCard>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegalCard({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-[3rem] bg-surface-container-low p-6 shadow-md lg:p-8">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
          {n}
        </span>
        <h2 className="font-display text-2xl font-semibold text-on-surface">{title}</h2>
      </div>
      <div className="text-sm leading-6 text-on-surface-variant">{children}</div>
    </section>
  );
}

function HubCard({
  title,
  body,
  action,
  href,
}: {
  title: string;
  body: string;
  action: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-[2rem] bg-surface-container p-5">
      <div>
        <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        <p className="mt-2 text-[13px] text-on-surface-variant">{body}</p>
      </div>
      {href ? (
        <Link href={href} className="rounded-full bg-surface-container-high py-3 text-center text-sm font-semibold text-tertiary hover:bg-surface-bright">
          {action}
        </Link>
      ) : (
        <p className="text-[11px] text-outline">{action}</p>
      )}
    </div>
  );
}

function Retention({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-surface-container p-5">
      <span className="rounded-full bg-secondary-container/40 px-2.5 py-1 text-[11px] font-semibold text-secondary">
        {title}
      </span>
      <p className="mt-3 text-[13px] text-on-surface-variant">{body}</p>
    </div>
  );
}
