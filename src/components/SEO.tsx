import { useEffect } from "react";

type Props = {
  title: string;
  description: string;
  image?: string;
  path?: string;
};

const SITE = "https://sheatales.com";
const DEFAULT_IMG = `${SITE}/Template-1/assets/brand-lifestyle-ritual.webp`;

export default function SEO({ title, description, image = DEFAULT_IMG, path = "" }: Props) {
  useEffect(() => {
    const fullTitle = `${title} | Shea Tales`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.content = content;
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", image, true);
    setMeta("og:url", `${SITE}${path}`, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);
  }, [title, description, image, path]);

  return null;
}
