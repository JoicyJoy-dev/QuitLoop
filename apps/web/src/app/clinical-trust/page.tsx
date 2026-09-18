import type { Metadata } from "next";
import { ShieldCheck, Stethoscope, University } from "lucide-react";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { PageHero } from "@/components/site/PageHero";
import { company, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/clinical-trust");

export default function ClinicalTrustPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-12">
        <PageHero
          eyebrow="Clinical governance"
          title="Built to sit beside the NHS, not above it."
          body="QuitLoop is Class I medical device software, aligned to NICE NG209 and assessed against NHS Digital Technology Assessment Criteria. Behavioural content is reviewed by a UK clinical advisory board every six months."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <TrustCard
            id="nice"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="NICE NG209"
            body="Tobacco: preventing uptake, promoting quitting and treating dependence. Tapering ceilings, NRT mapping and craving-defusion scripts follow this guideline rather than influencer playbooks."
          />
          <TrustCard
            id="nhs"
            icon={<Stethoscope className="h-5 w-5" />}
            title="NHS partnership"
            body="Self-referral and ICB tokens are accepted at onboarding. Named clinical supervisors can onboard 16–17 year-olds only through NHS Trust safeguarding pathways. Adults 18+ remain the direct-to-consumer cohort."
          />
          <TrustCard
            id="research"
            icon={<University className="h-5 w-5" />}
            title="Research protocols"
            body="Any proposed change to behavioural models undergoes Caldicott clinical review. We do not run advertising SDKs, insurer linkages, or third-party habit auctions."
          />
        </div>
        <section className="rounded-[2rem] bg-surface-container-low p-8 lg:p-10">
          <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">
            Clinical Advisory Board
          </span>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Advisor
              initials="SJ"
              name="Dr Sarah Jenkins, DClinPsy, CPsychol"
              role="Chartered behavioural psychologist & former NHS Trust consultant"
              quote="A craving peak lasts three to five minutes like an ocean wave, then naturally dissipates. Notice tightness in the chest as sensation rather than a demand for action."
            />
            <Advisor
              initials="SV"
              name={company.dpoName}
              role="Lead Clinical Information Officer & Data Protection Officer"
              quote="Special-category health data stays in AWS London (eu-west-2). Edge models run on-device. The DPO inbox answers under 72 hours."
            />
          </div>
        </section>
        <section className="rounded-[2rem] bg-surface-container p-8">
          <h2 className="font-display text-2xl font-semibold text-on-surface">Statutory registrations</h2>
          <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-on-surface-variant md:grid-cols-2">
            <li>ICO registration {company.ico}</li>
            <li>Companies House {company.number}</li>
            <li>UK GDPR & Data Protection Act 2018</li>
            <li>CE & UKCA Class I Medical Device Software</li>
            <li>MHRA Class I MDDS (habit-reversal software)</li>
            <li>DTAC v2.1 assessed</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

function TrustCard({
  id,
  icon,
  title,
  body,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <article id={id} className="scroll-mt-28 rounded-[2rem] bg-surface-container-low p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-primary">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-on-surface">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{body}</p>
    </article>
  );
}

function Advisor({
  initials,
  name,
  role,
  quote,
}: {
  initials: string;
  name: string;
  role: string;
  quote: string;
}) {
  return (
    <div className="rounded-2xl bg-surface-container p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-sm font-semibold text-on-primary">
          {initials}
        </div>
        <div>
          <h3 className="font-semibold text-on-surface">{name}</h3>
          <p className="text-[13px] text-on-surface-variant">{role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-on-surface">{quote}</p>
    </div>
  );
}
