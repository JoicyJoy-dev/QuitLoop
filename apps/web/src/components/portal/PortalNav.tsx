"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, HeartPulse, Home, LogOut, Waves } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSos } from "@/components/site/SosContext";

export const SESSION_KEY = "quitloop-demo-session";

const tabs = [
  { href: "/portal", label: "Journey", icon: Home },
  { href: "/portal/track", label: "Toolkit", icon: Activity },
  { href: "/portal/sos", label: "SOS", icon: Waves },
  { href: "/portal/health", label: "Health", icon: HeartPulse },
];

export function PortalNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpen } = useSos();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = window.localStorage.getItem(SESSION_KEY);
    if (!session) {
      router.replace("/login");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return <div className="h-20" />;
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 pb-6">
      <nav className="flex flex-wrap gap-2 rounded-full bg-surface-container-lowest/70 p-1.5">
        {tabs.map((tab) => {
          const active = tab.href === "/portal" ? pathname === "/portal" : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                active ? "bg-surface-container-high text-primary" : "text-on-surface-variant hover:text-on-surface",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Link>
          );
        })}
      </nav>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="material-pulse rounded-full bg-tertiary-container px-4 py-2 text-sm font-semibold text-on-tertiary-container"
        >
          Urge SOS
        </button>
        <button
          type="button"
          onClick={() => {
            window.localStorage.removeItem(SESSION_KEY);
            router.push("/");
          }}
          className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-4 py-2 text-sm font-semibold text-on-surface-variant"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );
}
