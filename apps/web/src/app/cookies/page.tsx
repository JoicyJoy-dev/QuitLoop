"use client";

import { useEffect, useState } from "react";
import { AmbientGlow } from "@/components/site/AmbientGlow";

const STORAGE_KEY = "quitloop-cookie-preference";

export default function CookiesPage() {
  const [choice, setChoice] = useState<"essential" | "accepted">("essential");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "essential") {
      setChoice(stored);
    }
  }, []);

  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12 lg:px-12">
        <div>
          <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">PECR Regulation 6</span>
          <h1 className="mt-3 font-display text-[34px] leading-10 font-semibold text-on-surface">Cookie preferences</h1>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">
            QuitLoop uses strictly essential session tokens so the patient portal stays signed in and offline breathwork remains available. We do not deploy Google Analytics, Hotjar, Mixpanel or advertising pixels.
          </p>
        </div>
        <div className="rounded-[2rem] bg-surface-container-low p-6">
          <label className="flex items-start justify-between gap-4">
            <span>
              <strong className="text-on-surface">Essential clinical tokens</strong>
              <p className="mt-1 text-sm text-on-surface-variant">
                HttpOnly session cookie, IndexedDB breath waveforms, local taper cadence cache.
              </p>
            </span>
            <span className="text-xs font-semibold text-secondary">Always on</span>
          </label>
          <label className="mt-6 flex items-start justify-between gap-4">
            <span>
              <strong className="text-on-surface">Product improvement pings</strong>
              <p className="mt-1 text-sm text-on-surface-variant">
                Aggregate, non-identifying counters of which sanctuary tools were opened. Never sold.
              </p>
            </span>
            <input
              type="checkbox"
              checked={choice === "accepted"}
              onChange={(event) => setChoice(event.target.checked ? "accepted" : "essential")}
              className="mt-1 h-5 w-5 accent-primary"
            />
          </label>
          <button
            type="button"
            className="mt-8 rounded-full bg-primary-container px-6 py-3 text-sm font-semibold text-on-primary"
            onClick={() => {
              window.localStorage.setItem(STORAGE_KEY, choice);
              setSaved(true);
            }}
          >
            Save preferences
          </button>
          {saved ? <p className="mt-3 text-sm text-secondary">Saved on this device.</p> : null}
        </div>
      </div>
    </div>
  );
}
