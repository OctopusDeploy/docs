/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FOOTER_FRAGMENT_URL: string;
  readonly SHARED_ASSETS_BASE_URL: string;
  readonly SHARED_ASSETS_ORIGIN: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
