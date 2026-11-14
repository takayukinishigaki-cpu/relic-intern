import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  label: string;
  /** public/images/ に置いた画像のパス（例："/images/fun-build.jpg"）。指定すると画像を表示する */
  src?: string;
  /** 画像生成プロンプト集（docs/image-prompts.md）の番号 */
  promptId?: string;
  className?: string;
};

/** 画像枠。src がなければ「差し替え予定」のダミーを表示する */
export function ImagePlaceholder({ label, src, promptId, className }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        loading="lazy"
        className={cn("aspect-[4/3] w-full rounded-2xl object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${label}（画像は準備中）`}
      className={cn(
        "flex aspect-[4/3] w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-accent/40 bg-gradient-to-br from-orange-50 to-amber-100/60 p-4 text-center text-accent",
        className,
      )}
    >
      <ImageIcon className="h-7 w-7 opacity-70" />
      <span className="text-sm font-bold text-primary/80">{label}</span>
      <span className="text-[11px] text-muted-foreground">
        画像差し替え予定{promptId ? `（${promptId}）` : ""}
      </span>
    </div>
  );
}
