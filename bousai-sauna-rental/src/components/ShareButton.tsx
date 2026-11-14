import { Share2 } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const SHARE_TITLE = "防災サウナレンタル（仮）｜楽しくてためになる防災訓練";
const SHARE_TEXT = "キット・マニュアル・動画のセットで、防災サウナ訓練を自社で実施できるサービスです。";

/** このサイトのURLを上司・社長に共有する（スマホは共有シート、PCはURLコピー） */
export function ShareButton({ label = "このページを上司に共有", ...props }: ButtonProps & { label?: string }) {
  async function onClick() {
    const url = window.location.origin + "/";
    if (navigator.share) {
      try {
        await navigator.share({ title: SHARE_TITLE, text: SHARE_TEXT, url });
      } catch {
        // キャンセル時は何もしない
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "ページのURLをコピーしました", description: "メールやチャットに貼り付けて共有できます。" });
    } catch {
      toast({ title: "コピーできませんでした", description: url });
    }
  }

  return (
    <Button type="button" onClick={onClick} {...props}>
      <Share2 />
      {label}
    </Button>
  );
}
