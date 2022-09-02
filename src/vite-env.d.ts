/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENGINE_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
