import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import { AmbientGlow } from "@/components/site/AmbientGlow";
import { PageHero } from "@/components/site/PageHero";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata("/download");

export default function DownloadPage() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12 lg:px-12">
        <PageHero
          eyebrow="iOS · Android · Web companion"
          title="Take the sanctuary with you."
          body="The QuitLoop mobile app is the primary clinical surface. The web companion mirrors Journey, SOS, Plan Health and analytics so you can continue a taper from a laptop when the phone is in another room."
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <StoreCard title="Apple App Store" body="iPhone and iPad. Face ID session lock recommended. Requires iOS 16 or later." />
          <StoreCard title="Google Play" body="Android 12+. On-device craving prediction uses the NPU where available." />
          <article className="rounded-[2rem] bg-surface-container-low p-8">
            <Smartphone className="mb-4 h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-on-surface">Web companion</h2>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Log in with the same NHS or email identity. Demo portal available immediately for product walkthroughs.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex rounded-full bg-primary-container px-5 py-2.5 text-sm font-semibold text-on-primary"
            >
              Open patient portal
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
}

function StoreCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[2rem] bg-surface-container-low p-8">
      <h2 className="text-xl font-semibold text-on-surface">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{body}</p>
      <p className="mt-6 text-[11px] font-semibold tracking-wide text-outline uppercase">
        Store listing pending UK launch
      </p>
    </article>
  );
}
