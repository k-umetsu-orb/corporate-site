import { useEffect } from "react";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null;
}

// Organization schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "orb RESOURCE&TECH",
  url: "https://xxxx.co.jp",
  description: "実効性の高い支援で、企業の持続的な成長を後押しするコンサルティングファーム",
  address: {
    "@type": "PostalAddress",
    addressLocality: "東京都",
    addressCountry: "JP",
  },
};

// BreadcrumbList helper
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
