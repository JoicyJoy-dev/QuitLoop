import Link from "next/link";
import { ShieldCheck, HeartPulse } from "lucide-react";
import { BrandMark } from "@/components/site/BrandMark";
import {
  company,
  footerClinical,
  footerLegal,
  footerPlatform,
} from "@/lib/site";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest pt-16 pb-12 text-on-surface-variant">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 pb-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <BrandMark />
            <p className="max-w-sm text-sm leading-6">
              Evidence-led neuro-tapering &amp; behavioural cessation platform engineered specifically for nicotine independence across the United Kingdom.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center rounded-full bg-surface-container px-3 py-1 text-[11px] font-semibold text-secondary">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                ICO Registered {company.ico}
              </span>
              <span className="inline-flex items-center rounded-full bg-surface-container px-3 py-1 text-[11px] font-semibold text-primary">
                <HeartPulse className="mr-1.5 h-3.5 w-3.5" />
                UK GDPR Compliant
              </span>
            </div>
          </div>
          <FooterColumn title="Platform" links={footerPlatform} />
          <FooterColumn title="Clinical Governance" links={footerClinical} />
          <FooterColumn title="Legal & Privacy" links={footerLegal} />
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-outline md:flex-row">
          <p>
            © {company.year} {company.legalName}. Registered in England &amp; Wales (No. {company.number}). {company.address}.
          </p>
          <p className="text-right">CE &amp; UKCA Class I Medical Device Software compliant.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-sans text-lg font-semibold text-on-surface">{title}</h3>
      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={link.href}
          className="text-sm text-on-surface-variant transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
