"use client";

import { Heart } from "lucide-react";
import { useSos } from "@/components/site/SosContext";
import { helplines } from "@/lib/site";

export function CrisisBanner({
  body = "You are not alone in this wave. If you are experiencing distress, take a breath before deciding. NHS stop-smoking support remains available around the clock.",
}: {
  body?: string;
}) {
  const { setOpen } = useSos();

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-surface-container p-6 shadow-xl md:p-8">
      <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-tertiary-container/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex max-w-2xl items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tertiary-container/20 text-tertiary shadow-[0_0_24px_0_rgba(240,128,106,0.25)]">
            <Heart className="h-6 w-6 fill-current" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold tracking-wider text-tertiary uppercase">
                Immediate Neuro-Support
              </span>
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary" />
            </div>
            <h2 className="font-display text-2xl font-medium text-on-surface">
              Experiencing an acute craving or withdrawal setback?
            </h2>
            <p className="text-sm leading-6 text-on-surface-variant">{body}</p>
          </div>
        </div>
        <div className="flex w-full shrink-0 flex-wrap items-center gap-3 lg:w-auto">
          <a
            href={`tel:${helplines.nhsQuitline.replaceAll(" ", "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-surface-container-high px-5 py-3 text-sm font-semibold text-on-surface shadow-sm transition-all hover:bg-surface-container-highest active:scale-95"
          >
            NHS 24/7 Helpline (Freephone)
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="material-pulse inline-flex items-center justify-center gap-2 rounded-full bg-tertiary-container px-6 py-3 text-sm font-semibold text-on-tertiary-container transition-all hover:bg-tertiary active:scale-95"
          >
            Open Urge Surfing SOS
          </button>
        </div>
      </div>
    </section>
  );
}
