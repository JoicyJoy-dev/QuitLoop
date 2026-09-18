"use client";

import { PortalNav } from "@/components/portal/PortalNav";
import { useSos } from "@/components/site/SosContext";

const tools = [
  ["5-4-3-2-1 Sensory Ground", "Spot 5 blue items, touch 4 textures nearby."],
  ["Physical Reset", "Drink a chilled glass of water or splash cold water on your wrists."],
  ["Urge Delay Timer", "Postpone the decision for 5 minutes. Watch the urge lose its edge."],
  ["Call Accountability Buddy", "One ring triggers an immediate supportive check-in."],
];

export default function SosPage() {
  const { setOpen } = useSos();
  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-12">
      <PortalNav />
      <p className="text-[11px] font-semibold tracking-widest text-tertiary uppercase">Emergency wave sanctuary</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-on-surface">Ride the Wave. You are in control.</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant">
        Acute nicotine surges last fewer than 180 seconds. Let your parasympathetic nervous system take over.
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="material-pulse mt-6 rounded-full bg-tertiary-container px-6 py-3 text-sm font-semibold text-on-tertiary-container"
      >
        Begin 180s protocol
      </button>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map(([title, body]) => (
          <article key={title} className="rounded-[2rem] bg-surface-container-low p-6">
            <h2 className="font-semibold text-on-surface">{title}</h2>
            <p className="mt-2 text-sm text-on-surface-variant">{body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
