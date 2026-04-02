import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
}

const SITE_NAME = "orb株式会社";
const BASE_URL = "https://xxxx.co.jp";

export function useSEO({ title, description, path = "" }: SEOProps) {
  useEffect(() => {
    const fullTitle = path === "/"
      ? title
      : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // OGP
    const ogTags: Record<string, string> = {
      "og:title": fullTitle,
      "og:description": description,
      "og:type": "website",
      "og:url": `${BASE_URL}${path}`,
      "og:site_name": SITE_NAME,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    return () => {};
  }, [title, description, path]);
}
