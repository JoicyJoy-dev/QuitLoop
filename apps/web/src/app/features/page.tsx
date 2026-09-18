import type { Metadata } from "next";
import Link from "next/link";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { PageHero } from "@/components/site/PageHero";
import { ProgressRing } from "@/components/site/ProgressRing";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/features");

const features = [
  {
    id: "journey",
    kicker: "Journey tab",
    title: "Dashboard that greets the nervous system first",
    body: "Good morning, remaining allowance, streak phase, savings, oxygen recovery and a UK-method tip of the day — the same Journey home as the mobile app.",
  },
  {
    id: "sos",
    kicker: "Centre SOS",
    title: "Craving SOS Intervention",
    body: "Ride the wave for 180 seconds with inhale / hold / exhale pacing, sensory grounding, a five-minute delay timer, and an accountability buddy call.",
  },
  {
    id: "health",
    kicker: "Health tab",
    title: "Plan Health & 6-week roadmap",
    body: "Phase 2 habit decoupling, daily cap versus logged puffs, clinician audio on urge surfing, and NICE-informed week-by-week goals.",
  },
  {
    id: "track",
    kicker: "Toolkit tab",
    title: "Usage & pattern analytics",
    body: "Today / week / month views, ceiling bars, adherence, trigger times, and neuro-mapping of work stress, social cues and idle boredom.",
  },
  {
    id: "calibrate",
    kicker: "Onboarding",
    title: "Roadmap calibration",
    body: "Identify when the urge is strongest, set a UK-standard baseline, and choose Gentle Neuro Taper, Structured 14-Day Shift, or Social Vape Interception.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-12">
        <PageHero
          eyebrow="Mobile app, translated"
          title="Every screen in the QuitLoop app has a web counterpart."
          body="The website is the public face of the same behavioural system: Journey, Urge Surfing SOS, Plan Health, Tracking Analytics, and Roadmap Calibration — without vape imagery, without shame."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="rounded-[2rem] bg-surface-container-low p-8 lg:col-span-5">
            <ProgressRing value={42} max={80} caption="Safe remainder" label="Daily allowance" />
            <p className="mt-6 text-sm text-on-surface-variant">
              Dual rings show logged puffs against the daily ceiling, plus a recovery interval so the next inhale is delayed rather than forbidden.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-full bg-primary-container px-5 py-2.5 text-sm font-semibold text-on-primary"
            >
              Open web companion
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {features.map((feature) => (
              <article key={feature.id} className="rounded-[2rem] bg-surface-container-low p-6">
                <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">
                  {feature.kicker}
                </span>
                <h2 className="mt-2 text-lg font-semibold text-on-surface">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
        <section className="rounded-[2rem] bg-surface-container-low p-8">
          <h2 className="font-display text-2xl font-semibold text-on-surface">SOS toolkit, always within thumb reach</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["5-4-3-2-1 Sensory Ground", "Spot 5 blue items, touch 4 textures nearby."],
              ["Physical Reset", "Drink chilled water or splash cold water on your wrists."],
              ["Urge Delay Timer", "Postpone the decision for 5 minutes and watch the edge fade."],
              ["Accountability Buddy", "One ring triggers an immediate supportive check-in."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl bg-surface-container p-5">
                <h3 className="font-semibold text-on-surface">{title}</h3>
                <p className="mt-2 text-sm text-on-surface-variant">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
