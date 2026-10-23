// Consentimiento de cookies guardado en el navegador. Solo hay una categoría opcional: análisis.
export type Consent = { analitica: boolean; fecha: string };

const KEY = "sbp-cookies-v2";
export const CONSENT_EVENT = "sbp:consent";
export const OPEN_SETTINGS_EVENT = "sbp:cookies-config";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

export function saveConsent(analitica: boolean) {
  const c: Consent = { analitica, fecha: new Date().toISOString() };
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {}
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
}

export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
