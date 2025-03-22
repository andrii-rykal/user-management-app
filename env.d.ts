/// <reference types="vite/client" />

interface ImportMetaEnv {
  PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
