"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";
import { useSos } from "@/components/site/SosContext";
import { helplines } from "@/lib/site";

const phases = [
  { label: "Inhale", seconds: 4 },
  { label: "Hold", seconds: 2 },
  { label: "Exhale", seconds: 6 },
];

export function UrgeSurfingModal() {
  const { open, setOpen } = useSos();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [remaining, setRemaining] = useState(180);

  useEffect(() => {
    if (!open) {
      setPhaseIndex(0);
      setRemaining(180);
      return;
    }

    const tick = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
      setPhaseIndex((value) => (value + 1) % phases.length);
    }, 1000);

    return () => window.clearInterval(tick);
  }, [open]);

  if (!open) {
    return null;
  }

  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");
  const phase = phases[phaseIndex];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-surface-container-lowest/80 p-4 backdrop-blur-md">
      <div className="relative flex w-full max-w-lg flex-col items-center gap-6 rounded-[2rem] bg-surface-container p-8 text-center shadow-2xl">
        <button
          type="button"
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
          onClick={() => setOpen(false)}
          aria-label="Close urge surfing"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-bold tracking-[0.2em] text-tertiary uppercase">
            Urge Surfing Protocol
          </span>
          <h3 className="font-display text-2xl font-semibold text-on-surface">
            Ground into this 3-minute breath
          </h3>
          <p className="max-w-xs text-sm text-on-surface-variant">
            Nicotine urge signals peak within 180 seconds, then fade naturally. Follow the expanding circle.
          </p>
        </div>
        <div className="relative my-2 flex h-48 w-48 items-center justify-center">
          <div className="breathe-ring flex h-36 w-36 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 shadow-[0_0_32px_0_rgba(25,181,165,0.3)]">
            <span className="text-sm font-semibold tracking-wider text-primary uppercase">
              {phase.label}
            </span>
            <span className="font-display text-2xl font-semibold text-on-surface">
              {mins}:{secs}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            className="w-full rounded-full bg-primary-container py-3.5 text-sm font-semibold text-on-primary shadow-md transition-all hover:bg-primary"
            onClick={() => setOpen(false)}
          >
            I feel steady now
          </button>
          <a
            href={`tel:${helplines.nhsQuitline.replaceAll(" ", "")}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-surface-container-high py-3 text-xs font-semibold text-on-surface transition-all hover:bg-surface-bright"
          >
            <Phone className="h-4 w-4 text-secondary" />
            Call NHS Quitline ({helplines.nhsQuitline})
          </a>
        </div>
      </div>
    </div>
  );
}
