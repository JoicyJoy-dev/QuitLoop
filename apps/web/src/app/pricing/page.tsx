import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { PageHero } from "@/components/site/PageHero";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/pricing");

const plans = [
  {
    name: "Sanctuary Core",
    price: "Free",
    detail: "Self-directed",
    cta: "Start on the web",
    href: "/login",
    features: [
      "Daily allowance dual ring",
      "180-second Urge Surfing SOS",
      "14-day journey tracking",
      "UK NHS quitline shortcuts",
    ],
  },
  {
    name: "Neuro-Taper",
    price: "£7.99",
    detail: "per month, incl. VAT",
    highlight: true,
    cta: "Start 14-day statutory trial",
    href: "/download",
    features: [
      "Full 6-week tapering roadmap",
      "Trigger analytics and neuro-mapping",
      "Savings ledger in GBP",
      "Cloud sync across iOS, Android and web",
      "Cancel 24 hours before renewal",
    ],
  },
  {
    name: "NHS Access",
    price: "Covered",
    detail: "Prescription or ICB token",
    cta: "Redeem NHS token",
    href: "/login",
    features: [
      "Everything in Neuro-Taper",
      "Named clinical supervisor pathway",
      "No self-funded billing",
      "Occupational health verification",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-12">
        <PageHero
          eyebrow="Self-funded & NHS access"
          title="Pay yourself, or arrive with an NHS token."
          body="QuitLoop does not sell nicotine, pods or advertising. Self-funded memberships renew in GBP including 20% VAT. NHS prescription tokens unlock the same clinical tier without a personal invoice."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-[2rem] p-8 shadow-xl ${plan.highlight ? "bg-surface-container ring-1 ring-primary/30" : "bg-surface-container-low"}`}
            >
              <span className="text-[11px] font-semibold tracking-widest text-secondary uppercase">
                {plan.name}
              </span>
              <div className="mt-3 font-display text-4xl font-semibold text-on-surface">{plan.price}</div>
              <p className="mt-1 text-sm text-on-surface-variant">{plan.detail}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-on-surface">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold ${plan.highlight ? "bg-primary-container text-on-primary hover:bg-primary" : "bg-surface-container-high text-on-surface hover:bg-surface-bright"}`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
        <section className="rounded-[2rem] bg-surface-container-low p-8">
          <h2 className="font-display text-2xl font-semibold text-on-surface">Optional Pulse Band</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-on-surface-variant">
            The QuitLoop Pulse & Motion sensor wristband is a twelve-month warrantied accessory under the Consumer Rights Act 2015. It is never required to complete a taper. Hardware carries a 14-day statutory return. Submersion beyond IP68 or disassembly voids the warranty.
          </p>
        </section>
      </div>
    </div>
  );
}
