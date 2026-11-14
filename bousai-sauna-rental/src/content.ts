// サイト全体で使う料金・規模などの数値。変更するときはここだけ直せば、
// トップ・試算・共有文面のすべてに反映される。

export const PRICING = {
  basic: 150_000, // 自分たちで組み立てる方式（遠隔支援つき）
  instructorOption: 150_000, // 講師派遣オプション（旅費込み）
} as const;

export const SCALE = {
  staffMin: 1,
  staffMax: 2,
  participantsMin: 10,
  participantsMax: 15,
} as const;

export const DOCS = [
  {
    href: "/docs/proposal.pdf",
    filename: "防災サウナ訓練_企画書.pdf",
    title: "企画書",
    body: "訓練の目的・当日の流れ・必要な準備。社内の稟議にそのままお使いいただけます。",
    toc: ["訓練の目的と期待できる効果", "当日のタイムテーブル（例）", "会場・準備物のチェックリスト", "安全管理の考え方"],
  },
  {
    href: "/docs/estimate.pdf",
    filename: "防災サウナ訓練_見積書.pdf",
    title: "見積書",
    body: "基本プランと講師派遣オプションの料金内訳。",
    toc: ["基本プラン（キット・マニュアル・動画・遠隔支援）", "講師派遣オプション（旅費込み）"],
  },
] as const;

export function yen(value: number): string {
  return `${value.toLocaleString("ja-JP")}円`;
}

export function manYen(value: number): string {
  return `${(value / 10_000).toLocaleString("ja-JP")}万円`;
}
