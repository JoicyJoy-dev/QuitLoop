import Link from "next/link";
import {
  AirVent,
  Brain,
  CheckCircle2,
  Lock,
  Network,
  Shield,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { ProgressRing } from "@/components/site/ProgressRing";
import { BreatheDemo } from "@/components/home/BreatheDemo";

const weekBars = [
  { day: "Mon", ceiling: 85, intake: 80, surplus: false },
  { day: "Tue", ceiling: 80, intake: 72, surplus: false },
  { day: "Wed", ceiling: 75, intake: 65, surplus: false },
  { day: "Thu", ceiling: 70, intake: 68, surplus: false },
  { day: "Fri", ceiling: 65, intake: 52, surplus: true },
  { day: "Sat", ceiling: 60, intake: 46, surplus: true },
  { day: "Sun", ceiling: 55, intake: 40, surplus: false, today: true },
];

const triggers = [
  { label: "Deep work / screen fatigue", value: 44, tone: "text-primary", bar: "bg-primary" },
  { label: "Social drinks / evening out", value: 32, tone: "text-tertiary", bar: "bg-tertiary" },
  { label: "Idle boredom / transit", value: 24, tone: "text-secondary", bar: "bg-secondary" },
];

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      <AmbientGlow />
      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-12 lg:pt-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-surface-container-high px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-semibold tracking-wide text-secondary uppercase">
              NICE NG209 Aligned
            </span>
            <span className="text-outline-variant">•</span>
            <span className="text-xs font-semibold text-on-surface-variant">
              Class I Medical Software
            </span>
          </div>
          <h1 className="max-w-3xl font-display text-[34px] leading-10 font-semibold tracking-tight text-on-surface lg:text-[62px] lg:leading-[68px]">
            Rewire the Reflex. <br />
            <span className="bg-gradient-to-r from-primary via-primary-fixed to-secondary bg-clip-text text-transparent">
              Reclaim Your Breath.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-on-surface-variant">
            The UK’s evidence-led neuro-tapering programme for young adults. Decouple dopamine spikes, soothe acute vagal withdrawal without cold-turkey willpower depletion, and regain biological autonomy.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary-container px-8 py-3.5 text-sm font-semibold text-on-primary shadow-lg shadow-primary-container/20 transition-all hover:bg-primary active:scale-95"
            >
              <Sparkles className="h-5 w-5" />
              Get QuitLoop Free
            </Link>
            <Link
              href="/clinical-trust"
              className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-7 py-3.5 text-sm font-semibold text-on-surface shadow-sm transition-all hover:bg-surface-bright"
            >
              <Stethoscope className="h-5 w-5 text-primary" />
              Explore NHS Clinical Evidence
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-outline-variant/20 pt-8 text-[11px] font-semibold text-on-surface-variant">
            <TrustChip icon={<CheckCircle2 className="h-4 w-4 text-secondary" />} label="Zero Device Advertising" />
            <TrustChip icon={<Lock className="h-4 w-4 text-secondary" />} label="UK Caldicott Principles" />
            <TrustChip icon={<Brain className="h-4 w-4 text-secondary" />} label="CBT & Somatic Vagal Protocols" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
              Mobile Ergonomics Translated
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-on-surface">
              The Clinically Validated System
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-on-surface-variant">
            A bespoke behavioural toolkit engineered for high-craving moments, real-time nicotine decumulation, and non-punitive tracking.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-8 shadow-xl lg:col-span-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <IconBubble icon={<Network className="h-5 w-5" />} />
                <div>
                  <span className="text-[11px] tracking-wider text-on-surface-variant uppercase">
                    Pillar 01 / Intake Regulation
                  </span>
                  <h3 className="text-lg font-semibold text-on-surface">Daily Allowance Dual Ring</h3>
                </div>
              </div>
              <span className="rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold text-on-secondary-container">
                Safe Floor Active
              </span>
            </div>
            <div className="my-8 flex flex-col items-center justify-center gap-8 sm:flex-row">
              <ProgressRing value={42} max={80} caption="52% Safe Remainder" label="Daily allowance" />
              <div className="flex min-w-[200px] flex-col gap-3">
                <MetricRow label="Last inhale spacing" value="48 mins ago" />
                <MetricRow label="Target interval" value="60 mins floor" valueClass="text-secondary" />
                <MetricRow label="Daily decumulation" value="-8% vs Mon" valueClass="text-primary" />
              </div>
            </div>
            <p className="text-[13px] leading-5 text-on-surface-variant">
              Adaptive rate limiter dynamically lengthens compulsory recovery windows between pods, stabilising serum nicotine without panic response.
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-8 shadow-xl lg:col-span-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <IconBubble icon={<AirVent className="h-5 w-5" />} tone="text-tertiary" />
                <div>
                  <span className="text-[11px] tracking-wider text-tertiary uppercase">
                    Pillar 02 / Somatic Reset
                  </span>
                  <h3 className="text-lg font-semibold text-on-surface">180s Urge Surfing Sanctuary</h3>
                </div>
              </div>
              <span className="rounded-full bg-tertiary-container/30 px-3 py-1 text-[11px] font-semibold text-tertiary">
                Parasympathetic Mode
              </span>
            </div>
            <BreatheDemo />
            <div className="flex items-center justify-between pt-2 text-[13px] text-on-surface-variant">
              <span>Somatic protocol: Box 4-7-8</span>
              <span className="font-semibold text-tertiary">91.4% Urge Extinction Rate</span>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-8 shadow-xl lg:col-span-7">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <IconBubble icon={<Sparkles className="h-5 w-5" />} />
                <div>
                  <span className="text-[11px] tracking-wider text-on-surface-variant uppercase">
                    Pillar 03 / Trajectory Control
                  </span>
                  <h3 className="text-lg font-semibold text-on-surface">7-Day Tapering Ceiling</h3>
                </div>
              </div>
              <span className="rounded-full bg-surface-container px-3 py-1 text-[11px] font-semibold text-primary">
                71% Strict Adherence
              </span>
            </div>
            <div className="my-6">
              <div className="flex h-44 items-end justify-between gap-3 px-2 pt-6 pb-2">
                {weekBars.map((bar) => (
                  <div key={bar.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <div
                      className="relative w-full max-w-[36px] rounded-t bg-primary/40"
                      style={{ height: `${bar.ceiling}%` }}
                    >
                      <div
                        className={`w-full rounded-t ${bar.surplus ? "bg-secondary" : bar.today ? "bg-primary-fixed" : "bg-primary"}`}
                        style={{ height: `${(bar.intake / bar.ceiling) * 100}%` }}
                      />
                    </div>
                    <span className={`text-[11px] ${bar.today ? "font-bold text-primary" : "text-on-surface-variant"}`}>
                      {bar.today ? "Today" : bar.day}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/30 px-3 pt-3 text-xs text-on-surface-variant">
                <Legend swatch="bg-primary/40" label="Programmed Ceiling" />
                <Legend swatch="bg-primary" label="Logged Inhales" />
                <Legend swatch="bg-secondary" label="Surplus Substituted" />
              </div>
            </div>
            <p className="text-[13px] leading-5 text-on-surface-variant">
              Ceiling adjusts automatically by minus 3% to 7% per bi-weekly cycle depending on biometric craving severity logs.
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-8 shadow-xl lg:col-span-5">
            <div className="flex items-center gap-3">
              <IconBubble icon={<Brain className="h-5 w-5" />} tone="text-secondary" />
              <div>
                <span className="text-[11px] tracking-wider text-on-surface-variant uppercase">
                  Pillar 04 / Cue Disruption
                </span>
                <h3 className="text-lg font-semibold text-on-surface">Neuro-Trigger Mapping</h3>
              </div>
            </div>
            <div className="my-6 flex flex-col gap-4">
              {triggers.map((item) => (
                <div key={item.label}>
                  <div className="mb-1.5 flex justify-between text-xs font-semibold">
                    <span className="text-on-surface">{item.label}</span>
                    <span className={item.tone}>{item.value}%</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                    <div className={`h-full rounded-full ${item.bar}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-surface-container p-3.5">
              <Sparkles className="h-5 w-5 text-secondary" />
              <p className="text-[13px] leading-5 text-on-surface-variant">
                System replaces automatic hand-to-mouth reflex with tactile sensory stones and breath counting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-secondary uppercase">
            The Clinical Foundation
          </span>
          <h2 className="mt-2 font-display text-[34px] leading-10 font-semibold text-on-surface lg:text-[44px] lg:leading-[52px]">
            Engineered with neuroscientists, not algorithm marketers.
          </h2>
          <p className="mt-4 text-base leading-7 text-on-surface-variant">
            Most cessation programmes rely on cold-turkey agony, leading to an 88% relapse within two weeks. QuitLoop retrains autonomic nervous responses step-by-step.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <ScienceCard
            icon={<Network className="h-6 w-6" />}
            kicker="Pillar One"
            title="Gentle Neuro-Tapering"
            body="We mathematically step down serum nicotine concentrations in micro-increments of 0.2mg/ml equivalents, preventing acute cortisol surges and sleep disruption."
            footer="Zero Willpower Depletion"
          />
          <ScienceCard
            icon={<AirVent className="h-6 w-6" />}
            kicker="Pillar Two"
            kickerClass="text-tertiary"
            title="180s Vagus Reset"
            body="Real-time somatic interventions that activate the cholinergic anti-inflammatory pathway through prolonged exhalation and tactile grounding pulses."
            footer="Heart Rate Recovery"
            footerClass="text-tertiary"
          />
          <ScienceCard
            icon={<Brain className="h-6 w-6" />}
            kicker="Pillar Three"
            kickerClass="text-secondary"
            title="Contextual Trigger Mapping"
            body="Identify cognitive blind spots: associating morning coffee, social anxiety, or deadlines with oral dopamine reflex. Decouple cues via targeted CBT micro-prompts."
            footer="Automatic Reflex Decoupling"
          />
          <ScienceCard
            icon={<Shield className="h-6 w-6" />}
            kicker="Pillar Four"
            title="NHS & Caldicott Trust"
            body="Class I compliant, fully encrypted on UK sovereign cloud infrastructure. Zero behavioural advertising, third-party trackers, or consumer data brokers."
            footer="UK GDPR & ICO Certified"
          />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-12 lg:px-12">
        <div className="relative overflow-hidden rounded-[3rem] bg-surface-container-low p-10 shadow-2xl lg:p-14">
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-primary/10 blur-[90px]" />
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:divide-x md:divide-y-0 md:text-left divide-y divide-outline-variant/20">
            <Stat value="£1.42M+" title="Saved by UK Members" body="Based on average UK monthly spend of £168 on disposable devices and nic-salts redirected into personal savings." />
            <Stat value="14,280+" title="Cravings Defused in Real-Time" titleClass="text-secondary" body="Neutralised during acute 180-second vagal breathwork wave sessions without relapse." />
            <Stat value="88%" title="Cilia Bronchial Recovery" titleClass="text-primary-fixed" body="Reported significant lung capacity and morning throat clearance improvement by Day 21 of safe tapering." />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-8 shadow-xl lg:col-span-7 lg:p-10">
            <div>
              <div className="mb-6 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                  Clinical Perspective
                </span>
              </div>
              <blockquote className="font-display text-xl leading-snug font-normal text-on-surface">
                “Nicotine vape addiction among young UK adults differs profoundly from combustible tobacco: the intake is frictionless, desk-bound, and high-frequency. QuitLoop is the first digital therapeutic to address the autonomic dopamine loop through neuro-adaptation rather than shameful restriction.”
              </blockquote>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-outline-variant/30 pt-8">
              <Initials name="SJ" />
              <div>
                <h4 className="text-lg font-semibold text-on-surface">Dr Sarah Jenkins, DClinPsy, CPsychol</h4>
                <p className="text-[13px] text-on-surface-variant">
                  Chartered Behavioural Psychologist & Former NHS Trust Consultant
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-8 shadow-xl lg:col-span-5 lg:p-10">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex text-primary">★★★★★</div>
                <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-[11px] font-semibold text-on-secondary-container">
                  Verified NHS Self-Referral
                </span>
              </div>
              <p className="text-base leading-7 text-on-surface">
                “I spent three years glued to 20mg disposable vapes while programming in Bristol. Cold turkey turned me into an anxious wreck after 6 hours. QuitLoop let me taper smoothly to 3mg over 6 weeks with zero brain fog. I haven’t touched a device in 4 months.”
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="rounded-xl bg-surface-container px-3 py-1 text-[11px] font-semibold text-secondary">
                  48 Days Vape-Free
                </span>
                <span className="rounded-xl bg-surface-container px-3 py-1 text-[11px] font-semibold text-primary">
                  £340.00 Saved
                </span>
                <span className="rounded-xl bg-surface-container px-3 py-1 text-[11px] font-semibold text-on-surface-variant">
                  Resting HR: -9 bpm
                </span>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-outline-variant/30 pt-8">
              <Initials name="MD" />
              <div>
                <h4 className="text-sm font-semibold text-on-surface">Marcus Davies</h4>
                <p className="text-[13px] text-on-surface-variant">Bristol • Member since October 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pt-8 pb-24 lg:px-12">
        <div className="relative flex flex-col items-center justify-between gap-10 overflow-hidden rounded-[3rem] bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-lowest p-10 shadow-2xl lg:flex-row lg:p-16">
          <div className="z-10 max-w-xl text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold text-on-secondary-container">
              Cross-Platform Cloud Sync
            </div>
            <h2 className="font-display text-[34px] leading-10 font-bold tracking-tight text-on-surface lg:text-[44px] lg:leading-[52px]">
              Start Your Neuro-Taper Free Today.
            </h2>
            <p className="mt-4 text-base leading-7 text-on-surface-variant">
              Available on iOS, Android, and web companion dashboard. No prescription required for self-directed access. NHS prescription token accepted at onboarding.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <StoreBadge kicker="Download on the" name="Apple App Store" href="/download" />
              <StoreBadge kicker="Get it on" name="Google Play" href="/download" />
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-primary-container px-6 py-3 text-sm font-semibold text-on-primary transition-all hover:bg-primary"
              >
                Web Onboarding →
              </Link>
            </div>
          </div>
          <div className="z-10 w-full max-w-sm shrink-0">
            <div className="rounded-[2rem] bg-surface-container-lowest p-6 shadow-2xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-secondary">Live Patient Session</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
                  <span className="h-2 w-2 animate-ping rounded-full bg-primary" />
                  Safe Protocol
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <MetricRow label="Daily Trajectory" value="On Target (-12%)" valueClass="text-secondary" />
                <MetricRow label="Next Inhale Unlock" value="14m 20s" />
                <div className="flex items-center justify-between rounded-2xl bg-tertiary-container/20 p-3.5">
                  <span className="text-[11px] font-semibold text-tertiary">Urge Surfing Tool</span>
                  <span className="text-[11px] font-bold text-tertiary">180s Ready</span>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-outline-variant/20 pt-4 text-xs text-on-surface-variant">
                <span>Encrypted Session</span>
                <span className="font-mono text-secondary">NHS NG209 Ver. 3.2</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function IconBubble({ icon, tone = "text-primary" }: { icon: React.ReactNode; tone?: string }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high ${tone}`}>
      {icon}
    </div>
  );
}

function MetricRow({
  label,
  value,
  valueClass = "text-on-surface",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-surface-container p-3.5">
      <span className="text-[13px] text-on-surface-variant">{label}</span>
      <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-sm ${swatch}`} />
      <span>{label}</span>
    </div>
  );
}

function ScienceCard({
  icon,
  kicker,
  kickerClass = "text-primary",
  title,
  body,
  footer,
  footerClass = "text-secondary",
}: {
  icon: React.ReactNode;
  kicker: string;
  kickerClass?: string;
  title: string;
  body: string;
  footer: string;
  footerClass?: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-8 shadow-md transition-colors hover:bg-surface-container">
      <div>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-primary">
          {icon}
        </div>
        <span className={`text-[11px] tracking-wider uppercase ${kickerClass}`}>{kicker}</span>
        <h3 className="mt-2 mb-3 font-display text-xl font-semibold text-on-surface">{title}</h3>
        <p className="text-sm leading-6 text-on-surface-variant">{body}</p>
      </div>
      <div className="mt-6 border-t border-outline-variant/30 pt-6">
        <span className={`text-[11px] font-semibold ${footerClass}`}>{footer}</span>
      </div>
    </div>
  );
}

function Stat({
  value,
  title,
  titleClass = "text-primary",
  body,
}: {
  value: string;
  title: string;
  titleClass?: string;
  body: string;
}) {
  return (
    <div className="flex flex-col items-center pt-4 md:items-start md:px-8 md:pt-0 first:md:pl-0 last:md:pr-0">
      <span className="font-display text-[44px] leading-[52px] font-bold text-on-surface lg:text-[54px] lg:leading-[58px]">
        {value}
      </span>
      <span className={`mt-2 text-lg font-semibold ${titleClass}`}>{title}</span>
      <p className="mt-2 max-w-xs text-[13px] leading-5 text-on-surface-variant">{body}</p>
    </div>
  );
}

function Initials({ name }: { name: string }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-sm font-semibold text-on-primary shadow-sm">
      {name}
    </div>
  );
}

function StoreBadge({ kicker, name, href }: { kicker: string; name: string; href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3 rounded-full bg-surface-container-lowest px-6 py-3 text-on-surface shadow-md transition-all hover:bg-surface-container-highest"
    >
      <div className="flex flex-col text-left">
        <span className="text-[10px] leading-none text-on-surface-variant">{kicker}</span>
        <span className="text-sm font-semibold leading-tight">{name}</span>
      </div>
    </Link>
  );
}
