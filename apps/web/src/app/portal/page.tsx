"use client";

import { useEffect, useMemo, useState } from "react";
import { PortalNav } from "@/components/portal/PortalNav";
import { ProgressRing } from "@/components/site/ProgressRing";
import { useSos } from "@/components/site/SosContext";
import { firstNameFrom, readSession } from "@/lib/auth";

export default function PortalPage() {
  const { setOpen } = useSos();
  const [logged, setLogged] = useState(42);
  const limit = 80;
  const remaining = useMemo(() => Math.round(((limit - logged) / limit) * 100), [logged]);
  const [firstName, setFirstName] = useState("there");

  useEffect(() => {
    const session = readSession();
    if (session) {
      setFirstName(firstNameFrom(session.user));
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
      <PortalNav />
      <div className="mb-6">
        <p className="text-[11px] font-semibold tracking-widest text-secondary uppercase">Sanctuary mode</p>
        <h1 className="font-display text-3xl font-semibold text-on-surface">Good morning, {firstName}.</h1>
        <p className="mt-1 text-sm text-on-surface-variant">Breathe easy today. Your mind is adapting.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="rounded-[2rem] bg-surface-container-low p-6 lg:col-span-7">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ProgressRing value={logged} max={limit} caption={`${remaining}% remaining`} label="Daily allowance" />
            <div className="flex flex-1 flex-col gap-3">
              <Metric label="Clean days" value="14" />
              <Metric label="Hours until reset" value="12" />
              <Metric label="Weekly change" value="-15%" tone="text-secondary" />
              <button
                type="button"
                className="rounded-full bg-primary-container py-3 text-sm font-semibold text-on-primary disabled:opacity-40"
                disabled={logged >= limit}
                onClick={() => setLogged((value) => Math.min(limit, value + 1))}
              >
                Log a puff
              </button>
            </div>
          </div>
        </section>
        <section className="flex flex-col justify-between rounded-[2rem] bg-surface-container-low p-6 lg:col-span-5">
          <div>
            <p className="text-[11px] font-semibold tracking-widest text-tertiary uppercase">Urge forecast</p>
            <h2 className="mt-2 font-display text-2xl text-on-surface">Low right now</h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              Next predicted peak 18:30 on the commute. A 180-second reset is ready.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 rounded-full bg-tertiary-container py-3 text-sm font-semibold text-on-tertiary-container"
          >
            Start 2-minute reset
          </button>
        </section>
        <MetricCard className="lg:col-span-4" label="Saved this fortnight" value="£114.80" body="19 pods avoided" />
        <MetricCard className="lg:col-span-4" label="Cilia recovery" value="88%" body="Bronchial clearance active" />
        <MetricCard className="lg:col-span-4" label="Neuro-Reset Day" value="14" body="Streak phase" />
        <section className="rounded-[2rem] bg-surface-container-low p-6 lg:col-span-12">
          <p className="text-[11px] font-semibold tracking-widest text-primary uppercase">UK Method · Tip of the day</p>
          <p className="mt-3 text-sm leading-6 text-on-surface">
            Craving dopamine at 11am? Swap the vape trigger with cold water and a 3-minute brisk walk. Ice shocks the vagus nerve and competes with compulsion.
          </p>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, tone = "text-on-surface" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-surface-container px-4 py-3">
      <span className="text-sm text-on-surface-variant">{label}</span>
      <span className={`text-sm font-semibold ${tone}`}>{value}</span>
    </div>
  );
}

function MetricCard({
  label,
  value,
  body,
  className,
}: {
  label: string;
  value: string;
  body: string;
  className?: string;
}) {
  return (
    <section className={`rounded-[2rem] bg-surface-container-low p-6 ${className ?? ""}`}>
      <p className="text-[11px] text-on-surface-variant">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold text-on-surface">{value}</p>
      <p className="mt-1 text-sm text-on-surface-variant">{body}</p>
    </section>
  );
}
