"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/site/BrandMark";
import { cn } from "@/lib/cn";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const inPortal = pathname.startsWith("/portal");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface/85 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">
        <div className="flex items-center gap-6">
          <BrandMark />
          <div className="hidden items-center gap-2 border-l border-outline-variant/30 pl-4 xl:flex">
            <span className="inline-flex items-center rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-semibold tracking-wide text-secondary">
              NICE NG209 Aligned
            </span>
            <span className="inline-flex items-center rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-semibold tracking-wide text-primary">
              NHS Backed
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full bg-surface-container-lowest/60 px-3 py-1.5 lg:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  active
                    ? "bg-surface-container-high text-primary"
                    : "text-on-surface-variant hover:text-on-surface",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={inPortal ? "/portal" : "/login"}
            className="hidden rounded-full px-4 py-2.5 text-sm font-semibold text-on-surface-variant transition-all hover:bg-surface-container hover:text-on-surface sm:inline-flex"
          >
            Patient Portal / Log In
          </Link>
          <Link
            href="/download"
            className="inline-flex items-center rounded-full bg-primary-container px-5 py-2.5 text-sm font-semibold text-on-primary shadow-[0_0_24px_-2px_rgba(25,181,165,0.28)] transition-all hover:bg-primary active:scale-95"
          >
            Download App
          </Link>
          <Link
            href="/login"
            className="hidden h-8 w-8 items-center justify-center rounded-full bg-surface-container-high text-primary sm:flex"
            aria-label="Patient profile"
          >
            <UserRound className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-on-surface lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-outline-variant/20 bg-surface-container-lowest px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-xl px-3 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container"
              onClick={() => setOpen(false)}
            >
              Patient Portal / Log In
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
