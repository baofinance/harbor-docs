import siteConfig from "@generated/docusaurus.config";

export default function prismIncludeLanguages(
  PrismObject: typeof import("prismjs")
): void {
  const {
    themeConfig: { prism },
  } = siteConfig;
  const { additionalLanguages } = prism as { additionalLanguages?: string[] };

  const PrismBefore = (globalThis as { Prism?: unknown }).Prism;
  (globalThis as { Prism?: unknown }).Prism = PrismObject;

  additionalLanguages?.forEach((lang) => {
    if (lang === "php") {
      require("prismjs/components/prism-markup-templating.js");
    }
    require(`prismjs/components/prism-${lang}`);
  });

  // Static requires so webpack bundles these (dynamic `prism-solidity` is not in the default context).
  require("prismjs/components/prism-clike");
  require("prismjs/components/prism-solidity");

  delete (globalThis as { Prism?: unknown }).Prism;
  if (typeof PrismBefore !== "undefined") {
    (globalThis as { Prism?: unknown }).Prism = PrismBefore;
  }
}
