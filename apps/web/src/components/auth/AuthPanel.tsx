import { ReactNode } from "react";
import { AmbientGlow } from "@/components/site/AmbientGlow";

type AuthPanelProps = {
  kicker: string;
  title: string;
  body: string;
  children: ReactNode;
};

export function AuthPanel({ kicker, title, body, children }: AuthPanelProps) {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-2 lg:px-12">
        <div>
          <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">
            {kicker}
          </span>
          <h1 className="mt-3 font-display text-[34px] leading-10 font-semibold text-on-surface lg:text-[44px] lg:leading-[52px]">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-on-surface-variant">{body}</p>
        </div>
        <div className="flex flex-col gap-5 rounded-[2rem] bg-surface-container p-8 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

type AuthFieldProps = {
  label: string;
  children: ReactNode;
};

export function AuthField({ label, children }: AuthFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-on-surface">
      {label}
      {children}
    </label>
  );
}

export const authInputClassName =
  "h-12 rounded-full bg-surface-container-lowest px-5 text-sm font-normal text-on-surface outline-none ring-0 focus:ring-2 focus:ring-primary";

export const authButtonClassName =
  "rounded-full bg-primary-container py-3.5 text-sm font-semibold text-on-primary shadow-[0_0_24px_-2px_rgba(25,181,165,0.28)] hover:bg-primary disabled:opacity-50";
