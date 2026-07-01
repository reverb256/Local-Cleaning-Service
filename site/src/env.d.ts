/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PHONE?: string;
  readonly PUBLIC_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
