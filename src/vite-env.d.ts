/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENGINE_PORT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
