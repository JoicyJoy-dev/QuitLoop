"use client";

import { PortalNav } from "@/components/portal/PortalNav";

const bars = [
  { day: "M", puffs: 58 },
  { day: "T", puffs: 64 },
  { day: "W", puffs: 49 },
  { day: "T2", puffs: 71 },
  { day: "F", puffs: 96 },
  { day: "S", puffs: 41 },
  { day: "S2", puffs: 36 },
];

const neuro = [
  { label: "Work stress & screen fatigue", percent: 42 },
  { label: "Socialising & alcohol cues", percent: 35 },
  { label: "Restlessness & idle boredom", percent: 23 },
];

export default function TrackPage() {
  const max = 100;
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
      <PortalNav />
      <h1 className="font-display text-3xl font-semibold text-on-surface">Usage & Pattern Analytics</h1>
      <p className="mt-2 text-sm text-on-surface-variant">Cognitive mapping of your neuro-tapering rate. Live sync 4 minutes ago.</p>
      <div className="mt-8 rounded-[2rem] bg-surface-container-low p-6">
        <div className="flex h-48 items-end gap-3">
          {bars.map((bar) => (
            <div key={bar.day} className="flex flex-1 flex-col items-center justify-end gap-2">
              <div className="w-full max-w-[40px] rounded-t bg-primary" style={{ height: `${(bar.puffs / max) * 100}%` }} />
              <span className="text-[11px] text-on-surface-variant">{bar.day.replace("2", "")}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Stat label="This week average" value="68 puffs" body="-32% vs baseline" />
        <Stat label="Saved this week" value="£4.30" body="42mg nicotine avoided" />
        <Stat label="Adherence" value="71%" body="5 of 7 days under ceiling" />
      </div>
      <div className="mt-8 space-y-4">
        {neuro.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-on-surface">{item.label}</span>
              <span className="text-primary">{item.percent}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-surface-container-highest">
              <div className="h-full rounded-full bg-primary" style={{ width: `${item.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, body }: { label: string; value: string; body: string }) {
  return (
    <div className="rounded-[2rem] bg-surface-container-low p-5">
      <p className="text-[11px] text-on-surface-variant">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-on-surface">{value}</p>
      <p className="text-sm text-on-surface-variant">{body}</p>
    </div>
  );
}
