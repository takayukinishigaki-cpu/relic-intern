import {
  Bath,
  BookOpen,
  CheckCircle2,
  Droplets,
  FileDown,
  Flame,
  HeartPulse,
  Info,
  MessageCircle,
  Package,
  PlayCircle,
  ShieldCheck,
  Soup,
  Users,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { CostSimulator } from "@/components/CostSimulator";
import { Faq } from "@/components/Faq";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { manYen, PRICING, SCALE } from "@/content";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

function DownloadButton({ className }: { className?: string }) {
  return (
    <Button asChild variant="accent" size="lg" className={className}>
      <Link to="/download">
        <FileDown />
        企画書・見積書をダウンロード
      </Link>
    </Button>
  );
}

function SectionHeading({ en, title, lead }: { en: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <Reveal className="mb-6 space-y-2">
      <p className="text-xs font-bold tracking-[0.2em] text-accent">{en}</p>
      <h2 className="text-2xl font-black leading-snug text-primary">{title}</h2>
      {lead && <p className="text-[15px] text-muted-foreground">{lead}</p>}
    </Reveal>
  );
}

const P = ({ children }: { children: ReactNode }) => <span className="phrase">{children}</span>;

const comparisons = [
  { label: "参加のしかた", normal: "説明を聞く・見るが中心", sauna: "自分たちで組み立て、使ってみる" },
  { label: "学べること", normal: "避難経路や消火器の使い方", sauna: "避難生活の「お風呂問題」まで実体験" },
  { label: "雰囲気", normal: "毎年同じ内容になりがち", sauna: "「また参加したい」と言われる楽しさ" },
  { label: "チームづくり", normal: "部署ごとに参加して終わり", sauna: "食事も囲み、部署をこえて仲良くなる" },
];

const benefits = [
  {
    icon: HeartPulse,
    title: "からだを温め、緊張をほぐす",
    body: "温熱による血行の促進や、筋肉のこわばりの緩和が期待できると報告されています。",
    source: "出典：○○大学 ○○研究室「温熱刺激と末梢血流に関する研究」（20XX年）※ダミー",
  },
  {
    icon: ShieldCheck,
    title: "避難生活のストレスをやわらげる",
    body: "入浴やサウナには、気分の落ち込みや不安感の軽減に関わる可能性が示されています。",
    source: "出典：○○学会誌 Vol.XX「入浴習慣と精神的健康」（20XX年）※ダミー",
  },
  {
    icon: Bath,
    title: "清潔を保ち、体調不良を防ぐ",
    body: "長期間入浴できない状況での皮膚トラブルや感染症対策として、身体を清潔に保つことの重要性が指摘されています。",
    source: "出典：○○省「避難所における衛生管理の手引き」（20XX年）※ダミー",
  },
];

const kitItems = [
  { icon: Package, title: "防災サウナキット", body: "テント・ストーブなど、組み立てに必要な一式" },
  { icon: BookOpen, title: "実施マニュアル", body: "準備から当日の進行、片付けまでを手順で解説" },
  { icon: PlayCircle, title: "解説動画", body: "組み立て方と訓練の進め方を、動画で事前に確認" },
];

// 当日の流れ（例）。正式なタイムテーブルは企画書に記載
const timeline = [
  { time: "事前", title: "動画で予習", body: "担当者が組み立て方と進行を確認（約30分）" },
  { time: "13:00", title: "説明・安全確認", body: "目的の共有と体調チェック" },
  { time: "13:20", title: "みんなで組み立て", body: "燃料と水が限られる想定で、手を動かして学ぶ" },
  { time: "14:00", title: "サウナ体験・外気浴", body: "交代で入り、温まる・清潔を保つを体感" },
  { time: "15:00", title: "防災食で振り返り", body: "食事を囲みながら、気づきを共有" },
  { time: "15:45", title: "片付け", body: "撤収までが訓練。次回の担当者も育つ" },
];

export default function Home() {
  // 読み込み直後に固定ボタンが一瞬出ないよう、最初は「見えている」扱いにする
  const [heroCtaRef, heroCtaInView] = useInView<HTMLDivElement>({ initial: true });
  const [finalCtaRef, finalCtaInView] = useInView<HTMLDivElement>();
  // 最初のボタンが見えなくなったら表示し、最後のボタンが見えたら隠す
  const showStickyCta = !heroCtaInView && !finalCtaInView;

  return (
    <div>
      {/* 1. ファーストビュー */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        />
        <img
          src="/images/hero-tent.webp"
          alt=""
          aria-hidden
          fetchPriority="high"
          className="pointer-events-none absolute right-0 top-0 w-[72%] max-w-[620px] [mask-image:radial-gradient(ellipse_at_75%_50%,black_55%,transparent_80%)] sm:w-[55%]"
        />
        <div className="relative mx-auto w-full max-w-2xl px-5 pb-12 pt-10">
          {/* スマホではテントのイラストと見出しが重ならないよう、見出しを少し下げる */}
          <p className="mb-[76px] inline-flex sm:mb-5 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
            <Flame className="h-4 w-4 text-accent" />
            企業向け 防災訓練キットのレンタル
          </p>
          <h1 className="text-[28px] font-black leading-[1.45] tracking-tight sm:text-4xl">
            <P>ほかの防災訓練にはない、</P>
            <br />
            <P>防災サウナならではの、</P>
            <br />
            <span className="text-accent">楽しくてめちゃくちゃ</span>
            <br />
            <span className="text-accent">ためになる</span>防災訓練
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed opacity-90">
            <P>キット・マニュアル・動画の</P>
            <P>セットをお貸しします。</P>
            <br />
            <P>
              担当者{SCALE.staffMin}〜{SCALE.staffMax}名で、
            </P>
            <P>
              社員{SCALE.participantsMin}〜{SCALE.participantsMax}名への訓練を
            </P>
            <P>自社で実施できます。</P>
          </p>

          <ul className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-bold">
            <li className="rounded-xl bg-white/10 px-2 py-3">
              <span className="block text-lg font-black text-accent">{manYen(PRICING.basic)}</span>1回あたり
            </li>
            <li className="rounded-xl bg-white/10 px-2 py-3">
              <span className="block text-lg font-black text-accent">
                {SCALE.staffMin}〜{SCALE.staffMax}名
              </span>
              で運営
            </li>
            <li className="rounded-xl bg-white/10 px-2 py-3">
              <span className="block text-lg font-black text-accent">遠隔支援</span>つき
            </li>
          </ul>

          <div ref={heroCtaRef} className="mt-8 space-y-3">
            <DownloadButton className="w-full" />
            <p className="text-center text-xs opacity-80">
              <P>社内でそのまま使える企画書と見積書（PDF）を、</P>
              <P>4項目の入力ですぐにダウンロードできます</P>
            </p>
          </div>
        </div>
      </section>

      {/* ほかの防災訓練との違い */}
      <section className="mx-auto w-full max-w-2xl px-5 pt-14">
        <SectionHeading
          en="DIFFERENCE"
          title={
            <>
              <P>ほかの防災訓練と、</P>
              <P>ここが違います</P>
            </>
          }
        />
        <Reveal>
          <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="grid grid-cols-2 bg-primary text-center text-xs font-bold text-primary-foreground">
              <p className="px-2 py-2.5 opacity-80">一般的な防災訓練</p>
              <p className="flex items-center justify-center gap-1 bg-accent px-2 py-2.5">
                <Flame className="h-4 w-4" />
                防災サウナ訓練
              </p>
            </div>
            {comparisons.map(({ label, normal, sauna }) => (
              <div key={label} className="border-t">
                <p className="px-4 pt-3 text-xs font-bold text-muted-foreground">{label}</p>
                <div className="grid grid-cols-2 gap-3 px-4 pb-3 pt-1 text-sm leading-snug">
                  <p className="text-muted-foreground">{normal}</p>
                  <p className="font-bold text-primary">{sauna}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* 2. ためになる */}
      <section className="mx-auto w-full max-w-2xl px-5 py-14">
        <SectionHeading
          en="USEFUL"
          title={
            <>
              <P>災害時、いちばん困ることの</P>
              <P>ひとつが「お風呂」です</P>
            </>
          }
        />

        <Reveal>
          <Card className="mb-5 border-primary/15">
            <CardContent className="space-y-4 p-5">
              <p className="text-[15px]">
                大きな災害では、<strong>燃料・水・ガス・水道</strong>
                が止まり、長いあいだお風呂に入れない状況が続くことがあります。
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-primary">
                {[
                  { icon: Flame, label: "燃料" },
                  { icon: Droplets, label: "水" },
                  { icon: Zap, label: "ガス" },
                  { icon: Bath, label: "水道" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="relative rounded-xl bg-muted py-3">
                    <Icon className="mx-auto mb-1 h-5 w-5 text-destructive/80" />
                    {label}
                    <span className="absolute right-1.5 top-1 text-[10px] text-destructive">停止</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-accent/10 p-4">
                <p className="font-bold text-primary">
                  防災サウナは、少ない燃料と水で使える
                  <span className="text-accent">「省エネ・節水型のお風呂」</span>になります。
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  訓練で一度組み立てておけば、いざというときに社員自身の手で動かせます。
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <h3 className="mb-3 mt-10 text-lg font-bold text-primary">サウナのメリットと、期待される効果</h3>
        <div className="space-y-3">
          {benefits.map(({ icon: Icon, title, body, source }, i) => (
            <Reveal key={title} delay={i * 80}>
              <Card>
                <CardContent className="flex gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="space-y-1">
                    <p className="font-bold">{title}</p>
                    <p className="text-sm">{body}</p>
                    <p className="text-xs text-muted-foreground">{source}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="mt-3 w-full text-muted-foreground">
              <Info />
              効果の表記と出典について
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>効果の表記と出典について</DialogTitle>
              <DialogDescription>社内でご説明いただく際の参考にしてください。</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <p>
                本サイトに記載している効果は、研究や公的資料で報告・指摘されている内容をご紹介したもので、すべての方に同じ効果を保証するものではありません。
              </p>
              <p>
                体調のすぐれない方、持病のある方、妊娠中の方などは、事前に医師にご相談のうえご参加ください。マニュアルにも安全上の注意点をまとめています。
              </p>
              <p className="rounded-xl bg-muted p-3 text-xs text-muted-foreground">
                ※現在の出典はダミーです。正式な出典は企画書に記載予定です。
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* 3. 楽しい */}
      <section className="bg-gradient-to-b from-orange-50/80 to-background">
        <div className="mx-auto w-full max-w-2xl px-5 py-14">
          <SectionHeading
            en="FUN"
            title={
              <>
                <P>「やらされる訓練」から</P>
                <P>「また参加したい訓練」へ</P>
              </>
            }
            lead={
              <>
                <P>防災サウナは、普段の遊びにもそのまま使えます。</P>
                <P>楽しいから、身につく。</P>
              </>
            }
          />

          <Reveal className="grid grid-cols-2 gap-3">
            <ImagePlaceholder label="みんなで組み立て" promptId="画像①" src="/images/fun-build.webp" className="col-span-2 aspect-[16/9]" />
            <ImagePlaceholder label="サウナでととのう" promptId="画像②" src="/images/fun-sauna.webp" />
            <ImagePlaceholder label="外気浴でひと息" promptId="画像③" src="/images/fun-cooldown.webp" />
          </Reveal>

          <div className="mt-8 space-y-5">
            {[
              {
                icon: Users,
                title: "身近な仲間と、一緒に取り組む",
                body: "災害時に頼りになるのは、普段から顔を合わせている職場の仲間です。部署をこえて手を動かす時間が、いざというときの連携につながります。",
              },
              {
                icon: Soup,
                title: "食事と組み合わせて、仲良くなりながら",
                body: "防災食の試食や炊き出しと組み合わせれば、懇親会のような雰囲気に。楽しく過ごすうちに、備えの知識が自然と身につきます。",
              },
            ].map(({ icon: Icon, title, body }) => (
              <Reveal key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-primary">{title}</p>
                  <p className="text-sm">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <ImagePlaceholder label="防災食を囲んで振り返り" promptId="画像④" src="/images/fun-meal.webp" className="aspect-[16/9]" />
          </Reveal>
        </div>
      </section>

      {/* 4. セット内容 */}
      <section className="mx-auto w-full max-w-2xl px-5 py-14">
        <SectionHeading
          en="WHAT'S INCLUDED"
          title={
            <>
              <P>借りるのは、</P>
              <P>訓練に必要なものすべて</P>
            </>
          }
          lead="キット・マニュアル・動画のセットで、専門知識がなくても実施できます。"
        />

        <div className="space-y-3">
          {kitItems.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="flex items-center gap-4 rounded-2xl border bg-card p-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-bold">{title}</p>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-primary/5 p-4 text-sm font-bold text-primary">
          <Users className="h-6 w-6 shrink-0 text-accent" />
          担当者{SCALE.staffMin}〜{SCALE.staffMax}名で、{SCALE.participantsMin}〜{SCALE.participantsMax}
          名への訓練を実施できます
        </div>

        {/* 当日の流れ */}
        <h3 className="mb-1 mt-12 text-lg font-bold text-primary">当日の流れ（例）</h3>
        <p className="mb-4 text-sm text-muted-foreground">午後の半日で、組み立てから振り返りまで実施できます。</p>
        <Reveal>
          <ol className="relative space-y-4 border-l-2 border-dashed border-accent/40 pl-6">
            {timeline.map(({ time, title, body }) => (
              <li key={title} className="relative">
                <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-background bg-accent" />
                <p className="text-xs font-bold text-accent">{time}</p>
                <p className="font-bold">{title}</p>
                <p className="text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* 料金 */}
        <h3 className="mb-3 mt-12 text-lg font-bold text-primary">料金（1回あたり）</h3>
        <div className="space-y-3">
          <Reveal>
            <Card className="border-2 border-accent">
              <CardHeader className="pb-2">
                <p className="w-fit rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">
                  基本プラン
                </p>
                <CardTitle>自分たちで組み立てるプラン</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-3xl font-black text-primary">
                  {PRICING.basic / 10_000}
                  <span className="text-lg">万円</span>
                </p>
                <ul className="space-y-1.5 text-sm">
                  {["キット・マニュアル・動画のセット", "当日の遠隔支援つき（オンライン）"].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={80}>
            <Card>
              <CardHeader className="pb-2">
                <p className="w-fit rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-primary">
                  オプション
                </p>
                <CardTitle>講師派遣つきプラン</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-3xl font-black text-primary">
                  ＋{PRICING.instructorOption / 10_000}
                  <span className="text-lg">万円</span>
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    （合計{manYen(PRICING.basic + PRICING.instructorOption)}）
                  </span>
                </p>
                <ul className="space-y-1.5 text-sm">
                  {["講師が現地で組み立て・進行をサポート", "講師の旅費込み"].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={120}>
            <CostSimulator />
          </Reveal>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          ※料金・条件の詳細は見積書をご確認ください。正式なお申し込みは、個別にご相談のうえ承ります。
        </p>
      </section>

      {/* よくある質問 */}
      <section className="bg-secondary/40">
        <div className="mx-auto w-full max-w-2xl px-5 py-14">
          <SectionHeading
            en="FAQ"
            title="ご担当者さまからよくある質問"
            lead="はじめて企画される方が、気にされるポイントをまとめました。"
          />
          <Reveal>
            <Faq />
          </Reveal>
        </div>
      </section>

      {/* 5. 最後のCTA */}
      <section className="bg-primary text-primary-foreground">
        <div ref={finalCtaRef} className="mx-auto w-full max-w-2xl space-y-5 px-5 py-14 text-center">
          <h2 className="text-xl font-black leading-snug">
            <P>まずは資料で、</P>
            <br />
            <P>社内のご検討に</P>
            <P>お役立てください</P>
          </h2>
          <ul className="mx-auto w-fit space-y-1.5 text-left text-sm">
            {["稟議にそのまま使える企画書", "料金の内訳がわかる見積書", "入力は4項目・約30秒"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                {t}
              </li>
            ))}
          </ul>
          <DownloadButton className="w-full" />
          <ShareButton
            variant="outline"
            className="w-full border-white/40 text-primary-foreground hover:bg-white/10"
          />
          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-bold underline underline-offset-4 opacity-90 hover:opacity-100"
          >
            <MessageCircle className="h-4 w-4" />
            ご不明点は、お気軽にお問い合わせください
          </Link>
        </div>
      </section>

      {/* スマホ用：画面下に固定する資料ダウンロードボタン */}
      <div
        aria-hidden={!showStickyCta}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden",
          showStickyCta ? "translate-y-0" : "pointer-events-none translate-y-full",
        )}
      >
        <Button asChild variant="accent" className="w-full" tabIndex={showStickyCta ? 0 : -1}>
          <Link to="/download">
            <FileDown />
            資料ダウンロード（無料・約30秒）
          </Link>
        </Button>
      </div>
    </div>
  );
}
