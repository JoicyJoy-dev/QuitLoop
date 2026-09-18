import type { Metadata } from "next";
import Link from "next/link";
import { Activity, Brain, HeartPulse, Leaf, Timer } from "lucide-react";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { PageHero } from "@/components/site/PageHero";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/science");

const weeks = [
  { title: "Week 1: Baseline Taper", detail: "Daily limit: 90 puffs • Stabilised autonomic triggers", status: "Foundation" },
  { title: "Week 2: Trigger Disruption", detail: "Goal: 70 puffs • CBT micro-prompts at known cue windows", status: "Active" },
  { title: "Week 3: Nicotine Step-Down", detail: "Goal: 45 puffs/day • oral substitute habits introduced", status: "Upcoming" },
  { title: "Weeks 4–6: Zero Nicotine & Horizon", detail: "Zero dependency • dopamine receptor resensitisation", status: "Horizon" },
];

export default function SciencePage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-12">
        <PageHero
          eyebrow="NICE NG209 • Behavioural neuro-tapering"
          title="A six-week programme that steps down nicotine without shock."
          body="QuitLoop maps your current puff cadence, then reduces ceiling and interval in micro-increments. The science is simple: keep cortisol quiet while receptors quietly down-regulate."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SciencePoint
            icon={<Timer className="h-5 w-5" />}
            title="180-second urge window"
            body="Acute nicotine surges last fewer than three minutes. Urge surfing occupies that window with paced breath so the parasympathetic system can take over."
          />
          <SciencePoint
            icon={<Brain className="h-5 w-5" />}
            title="Cue decoupling"
            body="Morning coffee, commute, screens and social drinks become mapped triggers. Each cue is paired with a substitute micro-habit instead of a shame prompt."
          />
          <SciencePoint
            icon={<HeartPulse className="h-5 w-5" />}
            title="Vagal recovery"
            body="Prolonged exhalation and cold-water grounding compete with the hand-to-mouth reflex. Heart-rate recovery is tracked as a biomarker of settling, not as a score."
          />
        </div>
        <section className="rounded-[2rem] bg-surface-container-low p-8 shadow-xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-[11px] font-semibold tracking-widest text-secondary uppercase">UK NHS Framework</span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-on-surface">Your 6-week tapering programme</h2>
            </div>
            <p className="max-w-md text-sm text-on-surface-variant">
              Gentle neurochemical tapering designed to minimise receptor shock while retraining daily reflexive routines. Plan templates stay data-driven so regional programmes can differ later without a rewrite.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {weeks.map((week) => (
              <div key={week.title} className="rounded-2xl bg-surface-container p-5">
                <span className="rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-semibold text-primary">
                  {week.status}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-on-surface">{week.title}</h3>
                <p className="mt-1 text-sm text-on-surface-variant">{week.detail}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-surface-container-low p-8">
            <Leaf className="mb-4 h-6 w-6 text-secondary" />
            <h2 className="font-display text-2xl font-semibold text-on-surface">Why not cold turkey?</h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              High-salt disposable vapes deliver frictionless, desk-bound, high-frequency intake. Abrupt cessation spikes cortisol and sleep disruption, which is why so many 18–30 year-olds relapse within a fortnight. QuitLoop steps down 3–7% per cycle instead of asking for a single act of willpower.
            </p>
          </div>
          <div className="rounded-[2rem] bg-surface-container-low p-8">
            <Activity className="mb-4 h-6 w-6 text-primary" />
            <h2 className="font-display text-2xl font-semibold text-on-surface">What the app actually measures</h2>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              Usage events (when, how much, product context), craving logs, savings in GBP minor units, streak adherence, and health insights such as cilia recovery. Timestamps stay in UTC; “day” is interpreted in Europe/London for UK members.
            </p>
            <Link href="/features" className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline">
              See the matching mobile tools →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

function SciencePoint({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[2rem] bg-surface-container-low p-6">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{body}</p>
    </div>
  );
}
