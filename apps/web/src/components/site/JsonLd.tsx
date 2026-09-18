import { company, metadataBase, siteUrl } from "@/lib/site";

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organisation`,
        name: company.name,
        legalName: company.legalName,
        url: siteUrl,
        logo: `${siteUrl}/brand/quitloop-emblem.png`,
        email: company.dpoEmail,
        telephone: company.dpoPhone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "100 Victoria Embankment",
          addressLocality: "London",
          postalCode: "EC4Y 0DH",
          addressCountry: "GB",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#app`,
        name: company.name,
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android, Web",
        description: metadataBase.description,
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organisation` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "GBP",
          description: "Sanctuary Core is free. Neuro-Taper is £7.99 per month including VAT.",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: company.name,
        inLanguage: "en-GB",
        publisher: { "@id": `${siteUrl}/#organisation` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
