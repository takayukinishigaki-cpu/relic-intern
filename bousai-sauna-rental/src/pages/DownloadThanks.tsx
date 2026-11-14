import { Check, CheckCircle2, Copy, Download, FileText, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { DOCS, manYen, PRICING, SCALE } from "@/content";
import { logEvent } from "@/lib/repository";

type ThanksState = { name?: string; company?: string } | null;

function buildMessage(senderName?: string) {
  const url = window.location.origin + "/";
  const subject = "防災サウナ訓練の企画書・見積書を取り寄せました";
  const body = [
    "お疲れさまです。",
    "",
    "先日お話のあった「防災サウナ」を使った防災訓練について、資料を取り寄せました。",
    "",
    "■ 概要",
    "・キット・マニュアル・動画のセットを借りて、自社で実施する訓練です",
    `・担当者${SCALE.staffMin}〜${SCALE.staffMax}名で、社員${SCALE.participantsMin}〜${SCALE.participantsMax}名に実施できます`,
    "・災害時に止まりがちな「お風呂」を、省エネ・節水型で用意する方法を体験で学べます",
    "",
    "■ 費用（1回あたり）",
    `・基本プラン：${manYen(PRICING.basic)}（遠隔支援つき）`,
    `・講師派遣つき：＋${manYen(PRICING.instructorOption)}（旅費込み）`,
    "",
    "企画書と見積書を添付しますので、ご確認いただけますでしょうか。",
    `サービス紹介ページ：${url}`,
    "",
    senderName ?? "",
  ].join("\n");
  return { subject, body };
}

export default function DownloadThanks() {
  const state = useLocation().state as ThanksState;
  const { subject, body } = buildMessage(state?.name);
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(`件名：${subject}\n\n${body}`);
      setCopied(true);
      toast({ title: "文面をコピーしました", description: "メールやチャットに貼り付けてお使いください。" });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({ variant: "destructive", title: "コピーできませんでした。文面を長押しして選択してください。" });
    }
  }

  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-16 pt-6">
      <ol className="mb-6 flex items-center gap-2 text-xs font-bold" aria-label="手続きの進み具合">
        <li className="flex items-center gap-1.5 text-muted-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Check className="h-3.5 w-3.5" />
          </span>
          入力
        </li>
        <li aria-hidden className="h-px flex-1 bg-accent" />
        <li className="flex items-center gap-1.5 text-primary">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">2</span>
          ダウンロード
        </li>
      </ol>

      <div className="flex flex-col items-center text-center">
        <CheckCircle2 className="h-12 w-12 text-accent" />
        <h1 className="mt-3 text-2xl font-black leading-snug text-primary">ご登録ありがとうございます</h1>
        <p className="mt-2 text-[15px] text-muted-foreground">
          {state?.name ? `${state.name} 様、` : ""}下のボタンから資料をダウンロードしてください。
        </p>
      </div>

      <div className="mt-8 space-y-3">
        {DOCS.map((doc) => (
          <Card key={doc.href}>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-7 w-7 shrink-0 text-accent" />
                <div>
                  <p className="font-bold">{doc.title}（PDF）</p>
                  <p className="text-sm text-muted-foreground">{doc.body}</p>
                </div>
              </div>
              <Button asChild variant="accent" className="w-full">
                <a href={doc.href} download={doc.filename} onClick={() => void logEvent("download")}>
                  <Download />
                  {doc.title}をダウンロード
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 稟議サポート：上司・社長への共有文面 */}
      <section className="mt-10">
        <p className="text-xs font-bold tracking-[0.2em] text-accent">FOR YOUR TEAM</p>
        <h2 className="mt-1 text-xl font-black leading-snug text-primary">上司・社長への共有に使える文面</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          資料と一緒に送れる文面を用意しました。必要に応じて書き換えてお使いください。
        </p>
        <div className="mt-4 max-h-64 overflow-y-auto whitespace-pre-wrap rounded-2xl border bg-white p-4 text-sm leading-relaxed">
          <p className="mb-2 font-bold">件名：{subject}</p>
          {body}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button type="button" variant="outline" onClick={copyMessage}>
            {copied ? <Check /> : <Copy />}
            {copied ? "コピー済み" : "文面をコピー"}
          </Button>
          <Button asChild variant="outline">
            <a href={mailto}>
              <Mail />
              メールで開く
            </a>
          </Button>
        </div>
        <ShareButton variant="ghost" size="sm" className="mt-2 w-full text-muted-foreground" label="サイトのURLだけ共有する" />
      </section>

      <div className="mt-10 rounded-2xl bg-primary/5 p-5">
        <p className="font-bold text-primary">このあとの流れ</p>
        <ol className="mt-3 space-y-2 text-sm">
          {[
            "企画書・見積書をもとに、社内でご検討ください",
            "実施時期や人数が決まりましたら、お問い合わせください",
            "担当者が個別に日程・条件をご相談し、正式なお申し込みとなります",
          ].map((text, i) => (
            <li key={text} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              {text}
            </li>
          ))}
        </ol>
        <Button asChild variant="outline" className="mt-5 w-full">
          <Link to="/contact">
            <MessageCircle />
            問い合わせる
          </Link>
        </Button>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="inline-flex min-h-11 items-center text-sm font-bold text-primary underline underline-offset-4">
          トップページに戻る
        </Link>
      </div>
    </div>
  );
}
