import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type BrandMarkProps = {
  href?: string;
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

export function BrandMark({
  href = "/",
  size = 32,
  showWordmark = true,
  className,
}: BrandMarkProps) {
  const mark = (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src="/brand/quitloop-emblem.png"
        alt="QuitLoop"
        width={size}
        height={size}
        className="rounded-lg object-cover"
        priority
      />
      {showWordmark ? (
        <span className="font-display text-[20px] font-semibold leading-7 tracking-tight text-on-surface">
          QuitLoop
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return mark;
  }

  return (
    <Link href={href} className="transition-transform active:scale-95">
      {mark}
    </Link>
  );
}
