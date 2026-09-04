const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

const STORAGE_KEY = "cna_tracking_params";

type Params = Record<string, string>;

export function captureTrackingParams(): Params {
  if (typeof window === "undefined") return {};
  let stored: Params = {};
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Params;
  } catch {
    stored = {};
  }
  const search = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) stored[key] = value;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* ignore */
  }
  return stored;
}

export function withTrackingParams(url: string): string {
  const params = captureTrackingParams();
  if (!Object.keys(params).length) return url;
  try {
    const parsed = new URL(url, window.location.origin);
    for (const [key, value] of Object.entries(params)) {
      parsed.searchParams.set(key, value);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

const fired = new Set<string>();

/** Fires a funnel event to fbq / dataLayer when available. Never fires Purchase. */
export function track(event: string, data?: Record<string, unknown>, once = false) {
  if (typeof window === "undefined") return;
  if (once) {
    if (fired.has(event)) return;
    fired.add(event);
  }
  const w = window as unknown as {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  };
  const standard = event === "PageView" || event === "InitiateCheckout";
  try {
    w.fbq?.(standard ? "track" : "trackCustom", event, { ...captureTrackingParams(), ...data });
  } catch {
    /* ignore */
  }
  w.dataLayer?.push({ event, ...data });
  if (import.meta.env.DEV) console.info("[track]", event, data ?? "");
}
