import { ChevronDown } from "lucide-react";

// ※回答は仮の文言です。正式な条件が決まったら差し替えてください。
const FAQS = [
  {
    q: "サウナの知識がなくても実施できますか？",
    a: "はい。マニュアルと解説動画で、組み立てから当日の進行までを手順どおりに進められるようにしています。当日はオンラインでの遠隔支援もつきます。不安な場合は講師派遣オプションもお選びいただけます。",
  },
  {
    q: "どんな場所で実施できますか？",
    a: "会社の駐車場や敷地内の空きスペースなど、テントを張れる屋外の平らな場所を想定しています。必要な広さや条件は、企画書のチェックリストでご確認いただけます。",
  },
  {
    q: "安全面が心配です。",
    a: "マニュアルに、体調確認・水分補給・火の取り扱いなどの安全上の注意点をまとめています。体調のすぐれない方や持病のある方は、無理に入らず見学や組み立てだけの参加もできます。",
  },
  {
    q: "雨の日はどうなりますか？",
    a: "小雨であれば実施できる場合がありますが、荒天時は日程の変更をご相談ください。変更の条件は、お申し込み前に個別にご案内します。",
  },
  {
    q: "社内の稟議には何を出せばよいですか？",
    a: "このサイトからダウンロードできる「企画書」と「見積書」をそのままお使いいただけます。目的・当日の流れ・費用がまとまっているので、決裁者への説明資料として活用ください。",
  },
  {
    q: "申し込みから実施までどれくらいかかりますか？",
    a: "ご希望の日程と在庫の状況によって変わります。実施時期の目安が決まりましたら、お早めにお問い合わせください。",
  },
];

export function Faq() {
  return (
    <div className="divide-y rounded-2xl border bg-card">
      {FAQS.map(({ q, a }) => (
        <details key={q} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-5 py-3 font-bold [&::-webkit-details-marker]:hidden">
            <span className="text-accent">Q</span>
            <span className="flex-1 text-[15px] leading-snug">{q}</span>
            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
          </summary>
          <div className="flex gap-3 px-5 pb-5 text-sm">
            <span className="font-bold text-primary">A</span>
            <p className="flex-1">{a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
