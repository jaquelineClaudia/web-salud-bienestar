"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type Consent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Google Analytics: solo se carga con un ID configurado y si la persona acepta las cookies de análisis. */
export function Analytics() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(Boolean(readConsent()?.analitica));
    const on = (e: Event) => setOk((e as CustomEvent<Consent>).detail.analitica);
    window.addEventListener(CONSENT_EVENT, on);
    return () => window.removeEventListener(CONSENT_EVENT, on);
  }, []);
  if (!GA_ID || !ok) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
