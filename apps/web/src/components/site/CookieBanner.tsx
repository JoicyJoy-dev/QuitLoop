"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "quitloop-cookie-preference";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  if (!visible) {
    return null;
  }

  const choose = (value: "essential" | "accepted") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-3xl border border-outline-variant/20 bg-surface-container p-5 shadow-[0_8px_32px_-4px_rgba(0,8,12,0.5)] md:flex-row md:items-center">
        <p className="flex-1 text-sm leading-6 text-on-surface-variant">
          QuitLoop uses strictly essential session tokens to keep your clinical portal signed in. We do not run advertising pixels.{" "}
          <Link href="/cookies" className="font-semibold text-primary hover:underline">
            Cookie preferences
          </Link>
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface hover:bg-surface-bright"
            onClick={() => choose("essential")}
          >
            Essential only
          </button>
          <button
            type="button"
            className="rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary"
            onClick={() => choose("accepted")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
