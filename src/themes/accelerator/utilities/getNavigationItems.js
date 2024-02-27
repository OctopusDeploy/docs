import { Accelerator } from "astro-accelerator-utils";
import { SITE } from "@config";
import { menu } from "@data/navigation";

export async function getNavigationItems(currentUrl, lang) {
  const accelerator = new Accelerator(SITE);
  const pages = accelerator.navigation.menu(
    new URL(currentUrl),
    SITE.subfolder,
    menu
  );

  return pages.sort((a, b) => a.order - b.order);
}
