// データ型の定義。Supabase に移すときは各テーブルの列と 1 対 1 で対応させる。

/** 資料ダウンロード登録 */
export type Lead = {
  id: string; // uuid
  company: string;
  name: string;
  email: string;
  department?: string; // 任意
  created_at: string; // ISO 文字列
};

/** 問い合わせ */
export type Inquiry = {
  id: string; // uuid
  company: string;
  name: string;
  email: string;
  message: string;
  created_at: string; // ISO 文字列
};

export type EventType = "page_view" | "download" | "inquiry";

/** 計測イベント */
export type Event = {
  id: string; // uuid
  type: EventType;
  created_at: string; // ISO 文字列
};

/** 登録時に画面から渡す値（id と created_at は repository 側で付与する） */
export type LeadInput = Omit<Lead, "id" | "created_at">;
export type InquiryInput = Omit<Inquiry, "id" | "created_at">;
