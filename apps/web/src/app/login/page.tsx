"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AmbientGlow } from "@/components/site/AmbientGlow";

const SESSION_KEY = "quitloop-demo-session";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("alex.morgan@nhs.net");
  const [token, setToken] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ email, firstName: "Alex", enteredAt: Date.now() }),
    );
    router.push("/portal");
  };

  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-2 lg:px-12">
        <div>
          <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">
            Patient portal
          </span>
          <h1 className="mt-3 font-display text-[34px] leading-10 font-semibold text-on-surface lg:text-[44px] lg:leading-[52px]">
            Continue your neuro-taper from any screen.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-on-surface-variant">
            Sign in with your QuitLoop email or NHS Login ID. This demo portal mirrors the mobile Journey dashboard and does not contact live clinical systems.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 rounded-[2rem] bg-surface-container p-8 shadow-xl"
        >
          <label className="flex flex-col gap-2 text-sm font-semibold text-on-surface">
            Email or NHS Login ID
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-full bg-surface-container-lowest px-5 text-sm font-normal text-on-surface outline-none ring-0 focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-on-surface">
            Passcode or NHS token
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="Optional for this demo"
              className="h-12 rounded-full bg-surface-container-lowest px-5 text-sm font-normal text-on-surface outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-primary-container py-3.5 text-sm font-semibold text-on-primary shadow-[0_0_24px_-2px_rgba(25,181,165,0.28)] hover:bg-primary"
          >
            Enter sanctuary
          </button>
          <p className="text-center text-[13px] text-outline">
            By continuing you agree to the{" "}
            <a href="/terms" className="text-primary hover:underline">
              clinical terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary hover:underline">
              privacy protocol
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
