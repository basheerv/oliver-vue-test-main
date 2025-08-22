// -----------------------------------------------------------------------------
// IMPORTANT CONTRACTS (READ FIRST)
// -----------------------------------------------------------------------------
// 1) BASE is ALWAYS taken from the current browser URL (window.location.origin).
//    You never pass base into any function.
// 2) ENV is NEVER encoded into URLs. ENV is chosen BEFORE this file runs.
//    You must define a global constant on the page BEFORE this file loads:
//       window.__ASSET_ENV__ = 'dev' | 'stage' | 'prod'
//    If not set, we default to 'prod' as a safe fallback.
// 3) LOCALE is ONLY for link-type entries; it is inserted right after the root
//    (the domain) for INTERNAL links only (paths starting with "/").
//    LOCALE can change at runtime. We read it dynamically from:
//       window.__ASSET_LOCALE__  (string, e.g. "zh-tw", or "" to disable)
//    If not set or empty, we DO NOT add locale. External links are never changed.
// 4) VERSION is appended as ?v=... to NON-LINK assets only (icons/images/videos/scripts/fonts).
//    It is read dynamically from:
//       window.__ASSET_VERSION__ (string, e.g. "2025.08.22")
//    If not set or empty, we skip adding ?v.
//
// Summary of globals you set OUTSIDE (before this file is evaluated):
//   window.__ASSET_ENV__     = "dev" | "stage" | "prod"
//   window.__ASSET_LOCALE__  = "zh-tw" | ""     ("" disables locale prefixing)
//   window.__ASSET_VERSION__ = "1" | ""         ("" disables cache-busting)
// -----------------------------------------------------------------------------

// ----------------------
// Types & JSON import
// ----------------------
import rawAssets from "./assets.json"; // <-- flat JSON registry with optional per-env paths

export type Env = "dev" | "stage" | "prod"; // allowed environment labels
export type AssetType = "icon" | "image" | "video" | "script" | "font" | "link"; // supported types

type EnvMap = { dev?: string; stage?: string; prod?: string }; // optional per-env path map
type PathDef = string | EnvMap; // a path can be simple string or per-env map

type AssetItem = {
  name: string;   // unique key for the asset
  type: AssetType; // kind of asset
  path: PathDef;   // path or per-env map
};

const ASSETS: AssetItem[] = rawAssets as AssetItem[]; // cast imported JSON to our type

// ----------------------
// Locale rules (stub)
// ----------------------
// We only consider locales that exist in this map as "known" to avoid
// accidentally treating normal path segments as locales.
// For now, per your instruction, we only recognize "zh-tw".
const LOCALE_MAP: Record<string, true> = { "zh-tw": true }; // later move to translations class

// ----------------------
// Tiny in-memory cache
// ----------------------
// We cache resolved absolute URLs by a key of (name,type,env,base,version,maybe-locale).
const CACHE = new Map<string, string>(); // speeds up repeated lookups

// ----------------------
// SAFE helpers (all pure)
// ----------------------

/** Return the current origin (protocol + host + optional port) without trailing slash. */
function getBase(): string {
  // Validate presence of window and location to prevent runtime errors in SSR.
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    return window.location.origin.replace(/\/$/, ""); // remove trailing slash if present
  }
  return "https://website.com"; // SSR fallback (never used in browser)
}

/** Read ENV that was set before this file was run; default to 'prod' if missing. */
function getEnv(): Env {
  // @ts-expect-error: we intentionally read a global provided by the host app
  const env: unknown = (typeof window !== "undefined" && (window as any).__ASSET_ENV__) || "prod";
  // Ensure only valid values are returned; otherwise, use 'prod'.
  return (env === "dev" || env === "stage" || env === "prod") ? env : "prod";
}

/** Read VERSION string set by the host app; empty string disables cache-busting. */
function getVersion(): string {
  // @ts-expect-error: we intentionally read a global provided by the host app
  const v: unknown = (typeof window !== "undefined" && (window as any).__ASSET_VERSION__) || "";
  return typeof v === "string" ? v : "";
}

/** Read LOCALE string set by the host app; empty/undefined disables locale prefixing. */
function getLocale(): string {
  // @ts-expect-error: we intentionally read a global provided by the host app
  const l: unknown = (typeof window !== "undefined" && (window as any).__ASSET_LOCALE__) || "";
  return typeof l === "string" ? l.toLowerCase() : "";
}

/** Return true if a URL is absolute HTTP(S). */
function isExternal(u: string): boolean {
  return /^https?:\/\//i.test(u); // fast check: starts with http:// or https://
}

/** Ensure a path starts with a single leading slash. */
function normalizeLeadingSlash(p: string): string {
  return p.startsWith("/") ? p : `/${p}`; // add leading slash if missing
}

/** Get the first path segment AFTER removing the leading slash(es). */
function firstSegment(path: string): string {
  const clean = path.replace(/^\/+/, ""); // strip all leading slashes
  const seg = clean.split("/")[0] || "";  // take text up to the next slash
  return seg.toLowerCase();               // normalize for comparison
}

/** Check if a path already starts with a known locale. */
function hasKnownLocalePrefix(path: string): boolean {
  const seg = firstSegment(path);   // read the first segment of the path
  return !!LOCALE_MAP[seg];         // return true if it matches a known locale
}

/** Append ?v=VERSION if version is a non-empty string; otherwise return URL unchanged. */
function withVersion(url: string, version: string): string {
  if (!version) return url;                  // no versioning desired
  const sep = url.includes("?") ? "&" : "?"; // choose correct separator
  return `${url}${sep}v=${encodeURIComponent(version)}`; // append version safely
}

/** Resolve final path for the current env from a string or env-map. */
function resolveEnvPath(p: PathDef, env: Env): string {
  if (typeof p === "string") return p;           // simple path
  return p[env] || p.prod || p.stage || p.dev || ""; // prefer current env, else fallbacks
}

// ----------------------
// CORE API
// ----------------------

/**
 * getAsset(name, type)
 * - BASE is taken from the current URL automatically.
 * - ENV is taken from window.__ASSET_ENV__ that YOU set before this file runs.
 * - VERSION is taken from window.__ASSET_VERSION__ and is appended ONLY to non-link assets.
 * - LOCALE is taken from window.__ASSET_LOCALE__ and applies ONLY to link assets:
 *     Inserts '/{locale}' right after the root for INTERNAL paths (starting with '/')
 *     ONLY if locale is non-empty AND the first segment is not already a known locale.
 *     External links (https://...) are returned untouched.
 */
export function getAsset(name: string, type: AssetType): string {
  // Read context values at call time (so locale or version can change dynamically).
  const base    = getBase();      // current origin (e.g., "https://mysite.com")
  const env     = getEnv();       // "dev" | "stage" | "prod" (provided by you before load)
  const version = getVersion();   // e.g., "2025.08.22" or "" to disable
  const locale  = (type === "link") ? getLocale() : ""; // only links care about locale

  // Build a stable cache key using only values that affect output for this call.
  const key = JSON.stringify({ name, type, base, env, version, locale });

  // Fast path: return from cache if present.
  const hit = CACHE.get(key);
  if (hit) return hit;

  // Look up the asset entry by name + type.
  const entry = ASSETS.find(a => a.name === name && a.type === type);
  if (!entry) return ""; // not found → empty string per your "validate before use" rule

  // Resolve the environment-specific raw path (may be a simple string or per-env map).
  const raw = resolveEnvPath(entry.path, env);
  if (!raw) return ""; // nothing to resolve → empty

  // If it's a LINK, apply locale logic for INTERNAL paths only.
  if (type === "link") {
    // External link? Return as-is (NO version by default for links).
    if (isExternal(raw)) {
      CACHE.set(key, raw); // cache the exact external URL
      return raw;          // return it unchanged
    }

    // Internal link: ensure it begins with a single slash.
    let p = normalizeLeadingSlash(raw);

    // If a non-empty locale is set and path isn't already locale-prefixed, insert it.
    if (locale && !hasKnownLocalePrefix(p)) {
      p = `/${locale}${p}`; // insert '/{locale}' right after root
    }

    // Compose absolute URL using current origin.
    const absolute = `${base}${p}`;

    // Cache and return.
    CACHE.set(key, absolute);
    return absolute;
  }

  // For NON-LINK assets (icons/images/videos/scripts/fonts):
  // If the raw path is external, we only apply version (if provided) and return.
  if (isExternal(raw)) {
    const externalUrl = withVersion(raw, version); // append ?v=... if version set
    CACHE.set(key, externalUrl);                   // cache
    return externalUrl;                            // return final URL
  }

  // Otherwise, it's an internal asset: build absolute URL and append version (if any).
  const absoluteAsset = withVersion(`${base}${normalizeLeadingSlash(raw)}`, version);

  // Cache and return the final URL.
  CACHE.set(key, absoluteAsset);
  return absoluteAsset;
}

// ----------------------
// EXPECTED OUTPUTS (EXAMPLES)
// ----------------------
// Assume the browser is currently at:     https://website.com/products
// Assume globals were set BEFORE this file loaded:
//   window.__ASSET_ENV__     = "stage"
//   window.__ASSET_VERSION__ = "2025.08.22"
//   window.__ASSET_LOCALE__  = "zh-tw"   // (or "" to disable locale)
// Then:
//   getAsset("logo", "icon")
//     => "https://website.com/assets/icons/logo.svg?v=2025.08.22"
//   getAsset("heroBanner", "image")
//     => "https://website.com/assets/images/stage/hero.webp?v=2025.08.22"
//   getAsset("introVideo", "video")
//     => "https://website.com/assets/videos/stage/intro.webm?v=2025.08.22"
//   getAsset("sliderScript", "script")
//     => "https://website.com/assets/scripts/sliderscripts.js?v=2025.08.22"
//   getAsset("terms", "link")
//     => "https://website.com/zh-tw/legal/terms"
// If window.__ASSET_LOCALE__ = "" (empty), then:
//   getAsset("terms", "link")
//     => "https://website.com/legal/terms"
// If assets.json contained an external link like "https://example.com/tos":
//   getAsset("terms", "link") for that entry
//     => "https://example.com/tos"  (unchanged, no locale, no version)
// -----------------------------------------------------------------------------
