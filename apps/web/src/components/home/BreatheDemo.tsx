"use client";

import { useEffect, useState } from "react";

export function BreatheDemo() {
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(180);
  const [cycleTick, setCycleTick] = useState(0);

  useEffect(() => {
    if (!running) {
      return;
    }
    const id = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
      setCycleTick((value) => (value + 1) % 19);
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const phase =
    cycleTick < 4
      ? { label: `Inhale (${4 - cycleTick}s)`, className: "text-primary" }
      : cycleTick < 11
        ? { label: `Hold (${11 - cycleTick}s)`, className: "text-secondary" }
        : { label: `Vagus exhale (${19 - cycleTick}s)`, className: "text-tertiary" };

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="my-6 flex flex-col items-center rounded-2xl bg-surface-container p-6 text-center">
      <div className="relative my-2 flex h-28 w-28 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-tertiary-container/20 opacity-60" />
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-surface-container-high to-tertiary-container/40 shadow-lg">
          <span className={`text-[11px] font-semibold tracking-wider uppercase ${running ? phase.className : "text-on-surface"}`}>
            {running ? (secondsLeft === 0 ? "Urge extinguished" : phase.label) : "Inhale 4s"}
          </span>
          <span className="font-display text-xl font-bold text-tertiary">
            {secondsLeft === 0 && !running ? "Complete" : `${mins}:${secs}`}
          </span>
        </div>
      </div>
      <p className="mt-3 max-w-sm text-[13px] leading-5 text-on-surface-variant">
        Nicotine cravings peak at 180 seconds before naturally descending. Ground the vagus nerve through paced breath oscillations.
      </p>
      <button
        type="button"
        className="mt-4 rounded-full bg-tertiary-container px-5 py-2 text-[11px] font-semibold text-on-tertiary hover:opacity-90 active:scale-95"
        onClick={() => {
          if (running) {
            setRunning(false);
            setSecondsLeft(180);
            setCycleTick(0);
            return;
          }
          setSecondsLeft(180);
          setCycleTick(0);
          setRunning(true);
        }}
      >
        {running ? "Reset breath cycle" : "Trigger live breath cycle"}
      </button>
    </div>
  );
}
