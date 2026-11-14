# 防災サウナレンタル（仮）プロトタイプ

「ほかの防災訓練にはない、防災サウナならではの、楽しくてめちゃくちゃためになる防災訓練」を、キット・マニュアル・動画のセットを借りて自社で実施できるレンタルサービスの紹介サイトです。

- 想定ユーザー：社長から「防災サウナをやってみよう」と言われた企業の訓練担当者（総務など）。案内メールのリンクからスマホで初めて開く
- 検証したいこと：企業が訓練予算を取ってレンタル料を払ってくれるか
- ゴール導線：トップ → 資料ダウンロード登録 → 企画書・見積書（PDF）のダウンロード（正式な発注はサイト外で個別交渉）
- バックエンドなし。データはブラウザの localStorage に保存

## 起動方法

Node.js 18 以上が必要です。

```bash
npm install
npm run dev      # 開発サーバー（http://localhost:5173）
npm run build    # 本番ビルド（dist/ に出力）
npm run preview  # ビルド結果の確認
```

スマホ実機で確認するときは `npm run dev -- --host` で起動し、同じWi-Fiのスマホから表示されたIPアドレスを開きます。

## ページ構成

| パス | 画面 | 内容 |
| --- | --- | --- |
| `/` | トップ | ①ファーストビュー＋DLボタン（湯気のイラスト） ・ほかの防災訓練との違い（比較表） ②ためになる（お風呂問題・サウナの効果と出典） ③楽しい（画像枠・仲間・食事） ④セット内容・当日の流れ（例）・料金・1人あたり費用の試算 ・よくある質問 ⑤DLボタン＋上司への共有ボタン＋問い合わせリンク。スマホでは画面下に「資料ダウンロード」ボタンを固定表示（最初と最後のDLボタンが見えている間は隠す） |
| `/download` | 資料ダウンロード登録 | 進み具合（1 入力 → 2 ダウンロード）、資料の目次プレビュー、会社名・お名前・メールアドレス（必須）、部署（任意）。送信で Lead を保存し `/download/thanks` へ |
| `/download/thanks` | ダウンロード | 企画書・見積書（PDF）のダウンロードボタン。押すと `download` イベントを記録。上司・社長への共有文面（コピー／メールで開く）、このあとの流れと問い合わせ導線 |
| `/contact` | 問い合わせ | 会社名・お名前・メールアドレス・内容（すべて必須）。送信で Inquiry を保存し、`inquiry` イベントを記録してトースト表示 |

計測：すべての画面遷移で `page_view` イベントを記録します。

## ファイル構成

```
bousai-sauna-rental/
├── index.html                  # Google Fonts（Zen Kaku Gothic New）の読み込み
├── public/
│   ├── favicon.svg
│   └── docs/
│       ├── proposal.pdf        # 企画書（ダミー）← 同じ名前で差し替え
│       └── estimate.pdf        # 見積書（ダミー）← 同じ名前で差し替え
├── src/
│   ├── main.tsx
│   ├── App.tsx                 # ルーティング
│   ├── index.css               # 色（紺・オレンジ・オフホワイト）の定義
│   ├── types.ts                # Lead / Inquiry / Event の型
│   ├── content.ts              # 料金・人数・資料の情報（数値はここだけ直せば全画面に反映）
│   ├── hooks/useInView.ts      # 画面に入ったかの判定（固定ボタン・ふわっと表示）
│   ├── lib/
│   │   ├── repository.ts       # データの保存（localStorage）← Supabase 移行時に差し替え
│   │   └── utils.ts
│   ├── components/
│   │   ├── Layout.tsx          # ヘッダー・フッター
│   │   ├── PageViewTracker.tsx # page_view の記録
│   │   ├── FormField.tsx       # ラベル・必須表示・エラー表示
│   │   ├── ImagePlaceholder.tsx# 画像枠（src を渡すと画像を表示）
│   │   ├── SaunaIllustration.tsx # ファーストビューのイラスト
│   │   ├── CostSimulator.tsx   # 1人あたり費用の試算
│   │   ├── Faq.tsx             # よくある質問（回答は仮の文言）
│   │   ├── ShareButton.tsx     # URLの共有（スマホは共有シート）
│   │   ├── Reveal.tsx          # スクロール時のふわっと表示
│   │   └── ui/                 # shadcn/ui（button, card, input, textarea, dialog, toast, toaster, use-toast）
│   └── pages/
│       ├── Home.tsx
│       ├── Download.tsx
│       ├── DownloadThanks.tsx
│       └── Contact.tsx
├── tailwind.config.js
└── vite.config.ts
```

## 差し替えが必要なダミー

- `public/docs/proposal.pdf` / `estimate.pdf`：正式な企画書・見積書（同じファイル名で上書き）
- `src/pages/Home.tsx` の `benefits`：効果の文言と出典（現在はダミー）
- 画像（`public/images/`）：AI生成の仮画像を設定済み。差し替えるときは同じファイル名で上書き（作り直す場合は `docs/image-prompts.md` のプロンプトを使う）
  - `hero-tent.webp`（ファーストビュー・OGP）、`fun-build.webp`、`fun-sauna.webp`、`fun-cooldown.webp`、`fun-meal.webp`
- OGP画像：公開URLが決まったら `index.html` の `og:image` を有効にする（PNG/JPGへの変換がおすすめ）
- `src/components/Faq.tsx`：よくある質問の回答（仮の文言）
- `src/pages/Home.tsx` の `timeline`：当日の流れ（例）の時刻と内容

## localStorage に保存されるデータ

| キー | 中身 |
| --- | --- |
| `bsr.leads` | Lead の配列 |
| `bsr.inquiries` | Inquiry の配列 |
| `bsr.events` | Event の配列 |

ブラウザの開発者ツール（Application → Local Storage）で確認できます。

## Supabase に移すとき

**差し替えるのは `src/lib/repository.ts` だけです。** 画面は `createLead` / `createInquiry` / `logEvent` の3関数しか呼んでいないため、関数名・引数・戻り値（Promise）を変えずに中身を Supabase の呼び出しに置き換えれば、画面側の修正は不要です。

1. `npm install @supabase/supabase-js`
2. `.env.local` に `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` を設定
3. `src/types.ts` の型に合わせてテーブルを作成

```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  name text not null,
  email text not null,
  department text,
  created_at timestamptz not null default now()
);

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('page_view', 'download', 'inquiry')),
  created_at timestamptz not null default now()
);
```

4. RLS を有効にし、anon ロールには `insert` のみ許可（`select` は許可しない）
5. `repository.ts` の各関数を、たとえば次のように書き換える

```ts
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export async function createLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = { id: crypto.randomUUID(), ...input, created_at: new Date().toISOString() };
  const { error } = await supabase.from("leads").insert(lead);
  if (error) throw error;
  return lead;
}
```

（anon に `select` を許可しない場合は `.insert().select()` で戻り値を取らず、上のようにクライアント側で作った値を返します）

## 今回作っていないもの

仮予約フォーム、空き状況・在庫管理、請求・決済、配送や当日の実施支援、ログイン、協賛企業向けページ。
