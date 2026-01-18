export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://continuum.app";
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Continuum",
    url: siteUrl,
    logo: `${siteUrl}/Continuum_Logo.png`,
    description:
      "Unified Intelligence for Teams - Stop context switching between your tools. Continuum orchestrates the platforms your team already uses through natural language in Slack.",
    sameAs: [
      "https://x.com/avyukt_soni",
      "https://github.com/avyuktsoni0731",
      "https://www.linkedin.com/in/avyuktsoni0731/",
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Continuum",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Slack",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "An intelligent productivity agent that unifies Jira, GitHub, and other dev tools in Slack. Features smart delegation, always-on context, and intelligent automation.",
    featureList: [
      "Smart Delegation Engine",
      "Always-on Context",
      "Multi-Step Orchestration",
      "Policy Engine",
      "Natural Language Interface",
      "Smart Triggers",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Continuum",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
