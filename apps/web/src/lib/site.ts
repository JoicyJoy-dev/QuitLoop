import type { Metadata } from "next";

export const siteUrl = "https://quitloop.org";

export const company = {
  name: "QuitLoop",
  legalName: "QuitLoop Health Ltd",
  number: "14298101",
  address: "100 Victoria Embankment, London, EC4Y 0DH",
  ico: "ZA892110",
  dpoEmail: "dpo@quitloop.org",
  dpoPhone: "+44 (0)20 7946 0912",
  dpoName: "Dr Simon Vance",
  year: 2026,
};

export const helplines = {
  nhsQuitline: "0300 123 1044",
  nhs111: "111",
  emergency: "999",
  scotland: "0800 84 84 84",
  wales: "0800 085 2219",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/science", label: "Science & Tapering" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/clinical-trust", label: "Clinical Trust" },
] as const;

export const footerPlatform = [
  { href: "/science", label: "Science & Tapering" },
  { href: "/features", label: "Neuro-Adaptive Tools" },
  { href: "/pricing", label: "Self-Funded & NHS Access" },
  { href: "/download", label: "Mobile Application" },
];

export const footerClinical = [
  { href: "/clinical-trust", label: "Clinical Advisory Board" },
  { href: "/clinical-trust#nhs", label: "NHS Partnership" },
  { href: "/clinical-trust#nice", label: "NICE NG209 Alignment" },
  { href: "/clinical-trust#research", label: "Research Protocols" },
];

export const footerLegal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/account-deletion", label: "Account Deletion (UK GDPR)" },
  { href: "/cookies", label: "Cookie Preferences" },
];

export const metadataBase = {
  title: "QuitLoop — Rewire the Reflex. Reclaim Your Breath.",
  description:
    "The UK’s evidence-led neuro-tapering programme for adults reducing or quitting vaping. Gentle dopamine rebalancing, 180-second urge surfing, and NHS-aligned behavioural support.",
};

export const publicRoutes = [
  { path: "/", title: metadataBase.title, description: metadataBase.description, changeFrequency: "weekly" as const, priority: 1 },
  {
    path: "/science",
    title: "Science & Tapering",
    description:
      "How QuitLoop’s six-week neuro-taper steps down nicotine without cold-turkey shock, using 180-second urge surfing and NICE NG209 guidance.",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/features",
    title: "Features",
    description:
      "Explore Journey, Craving SOS, Plan Health, tracking analytics and roadmap calibration — the same tools as the QuitLoop mobile app.",
    changeFrequency: "monthly" as const,
    priority: 0.9,
  },
  {
    path: "/pricing",
    title: "Pricing",
    description:
      "Self-funded Neuro-Taper from £7.99/month including VAT, a free Sanctuary Core, and NHS token access. No nicotine sales or advertising.",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/clinical-trust",
    title: "Clinical Trust",
    description:
      "Class I medical device software aligned to NICE NG209, DTAC assessed, UK GDPR compliant, with a UK clinical advisory board.",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  },
  {
    path: "/download",
    title: "Download the App",
    description:
      "Download QuitLoop on iOS and Android, or continue your taper in the encrypted web companion dashboard.",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  },
  {
    path: "/login",
    title: "Patient Portal Login",
    description:
      "Sign in to the QuitLoop patient portal with your email to continue your neuro-taper.",
    changeFrequency: "yearly" as const,
    priority: 0.4,
  },
  {
    path: "/signup",
    title: "Create a QuitLoop account",
    description: "Create a QuitLoop account to start a UK neuro-taper and sync progress across web and mobile.",
    changeFrequency: "yearly" as const,
    priority: 0.4,
  },
  {
    path: "/forgot-password",
    title: "Forgot password",
    description: "Reset your QuitLoop password if you cannot sign in to the patient portal.",
    changeFrequency: "yearly" as const,
    priority: 0.2,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "QuitLoop privacy policy: UK GDPR, Article 9 special-category safeguards, Caldicott principles, and UK data residency in AWS London.",
    changeFrequency: "yearly" as const,
    priority: 0.5,
  },
  {
    path: "/terms",
    title: "Terms & Conditions",
    description:
      "QuitLoop terms of service and clinical agreement for UK adults aged 18+, covering eligibility, subscriptions and medical disclaimer.",
    changeFrequency: "yearly" as const,
    priority: 0.5,
  },
  {
    path: "/account-deletion",
    title: "Account Deletion & Data Erasure",
    description:
      "Request UK GDPR Article 17 deletion of your QuitLoop account, telemetry and habit logs. Immediate wipe with 30-day backup rotation.",
    changeFrequency: "yearly" as const,
    priority: 0.6,
  },
  {
    path: "/cookies",
    title: "Cookie Preferences",
    description:
      "Manage QuitLoop cookie preferences. We use strictly essential clinical session tokens and no advertising pixels.",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
];

export function pageMetadata(
  path: string,
  extras: Metadata = {},
): Metadata {
  const route = publicRoutes.find((item) => item.path === path);
  const title = route?.title ?? metadataBase.title;
  const description = route?.description ?? metadataBase.description;
  const url = `${siteUrl}${path === "/" ? "" : path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: company.name,
      title,
      description,
      images: [
        {
          url: "/brand/quitloop-emblem.png",
          width: 1024,
          height: 1024,
          alt: "QuitLoop emblem",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/quitloop-emblem.png"],
    },
    ...extras,
  };
}
