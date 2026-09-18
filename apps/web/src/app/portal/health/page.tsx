"use client";

import { PortalNav } from "@/components/portal/PortalNav";

const weeks = [
  { title: "Week 1: Baseline Taper", detail: "Daily limit: 90 puffs • Stabilised autonomic triggers", status: "Completed" },
  { title: "Week 2: Trigger Disruption", detail: "Goal: 70 puffs • 4 days remaining (On track)", status: "Active" },
  { title: "Week 3: Nicotine Step-Down", detail: "Goal: 45 puffs/day • oral substitute habits", status: "Upcoming" },
  { title: "Weeks 4–6: Zero Nicotine & Horizon", detail: "Zero dependency • dopamine receptor resensitisation", status: "Upcoming" },
];

export default function HealthPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
      <PortalNav />
      <p className="text-[11px] font-semibold tracking-widest text-secondary uppercase">Evidence-led taper</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-on-surface">Your 6-Week Tapering Programme</h1>
      <p className="mt-3 max-w-2xl text-sm text-on-surface-variant">
        Phase 2: Habit Decoupling. Gentle neurochemical tapering designed to minimise receptor shock while retraining daily reflexive routines.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="Today logged" value="42 / 70" />
        <Stat label="Hours remaining" value="10" />
        <Stat label="Min interval" value="45 min" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {weeks.map((week) => (
          <article key={week.title} className="rounded-[2rem] bg-surface-container-low p-5">
            <span className="text-[11px] font-semibold text-primary">{week.status}</span>
            <h2 className="mt-1 font-semibold text-on-surface">{week.title}</h2>
            <p className="text-sm text-on-surface-variant">{week.detail}</p>
          </article>
        ))}
      </div>
      <blockquote className="mt-8 rounded-[2rem] bg-surface-container p-6 text-sm leading-6 text-on-surface">
        “A craving peak lasts 3 to 5 minutes like an ocean wave, then naturally dissipates.” — Dr Sarah Jenkins, Chartered Behavioural Psychologist, HCPC
      </blockquote>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[2rem] bg-surface-container-low p-5">
      <p className="text-[11px] text-on-surface-variant">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-on-surface">{value}</p>
    </div>
  );
}
