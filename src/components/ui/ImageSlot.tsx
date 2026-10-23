import Image from "next/image";
import { Camera } from "@phosphor-icons/react/dist/ssr";
import { resolveSlot } from "@/lib/media";

type Props = {
  slot: string;
  alt: string;
  ratio?: string; // "4/5", "16/9"...
  tone?: "sage" | "mint" | "night";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const tones = {
  sage: "bg-sage text-ink",
  mint: "bg-mint text-ink",
  night: "bg-[#1a3a34] text-night-ink",
};

/** Hueco de foto intercambiable. Sin foto, muestra un panel con lo que debe ir en él. */
export function ImageSlot({ slot, alt, ratio = "4/5", tone = "sage", className = "", priority, sizes = "100vw" }: Props) {
  const { src, brief, cutout } = resolveSlot(slot);
  return (
    <div
      className={`relative overflow-hidden rounded-[20px] ${tones[tone]} ${className}`}
      style={{ aspectRatio: ratio }}
      data-slot={slot}
    >
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cutout ? "object-contain p-[9%] drop-shadow-[0_18px_24px_rgb(15_38_34/0.18)]" : "object-cover"} />
      ) : (
        <div role="img" aria-label={alt} className="absolute inset-0 flex items-end p-5">
          <span className="flex max-w-[30ch] items-start gap-2 text-[0.8125rem] leading-snug opacity-75">
            <Camera aria-hidden size={18} weight="light" className="mt-[1px] shrink-0" />
            <span>Foto: {brief}</span>
          </span>
        </div>
      )}
    </div>
  );
}
