export {};

declare global {
  interface Window {
    __ASSET_ENV__?: string;
    __ASSET_LOCALE__?: string;
    __ASSET_VERSION__?: string;
  }
}
