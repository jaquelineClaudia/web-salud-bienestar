import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-[56px] items-center gap-2 rounded-full bg-ink px-5 text-paper shadow-[0_10px_30px_rgb(15_38_34/0.25)] transition-transform duration-500 ease-calm hover:-translate-y-0.5"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
    >
      <WhatsappLogo size={26} weight="light" aria-hidden />
      <span className="hidden sm:inline">Escríbenos</span>
    </a>
  );
}
