// データの保存・読み込みはすべてこのファイルに集約する。
// 画面側は localStorage を直接触らず、ここの関数だけを呼ぶ。
// Supabase に移すときは、このファイルの中身だけを差し替える（関数名・引数・戻り値は変えない）。

import type { Event, EventType, Inquiry, InquiryInput, Lead, LeadInput } from "@/types";

const KEYS = {
  leads: "bsr.leads",
  inquiries: "bsr.inquiries",
  events: "bsr.events",
} as const;

function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // 古いブラウザ向けの簡易フォールバック
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function readList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function append<T>(key: string, item: T): void {
  try {
    const list = readList<T>(key);
    list.push(item);
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    // プライベートモード等で保存できない場合も、画面の操作は止めない
  }
}

export async function createLead(input: LeadInput): Promise<Lead> {
  const lead: Lead = {
    id: uuid(),
    company: input.company.trim(),
    name: input.name.trim(),
    email: input.email.trim(),
    department: input.department?.trim() || undefined,
    created_at: new Date().toISOString(),
  };
  append(KEYS.leads, lead);
  return lead;
}

export async function createInquiry(input: InquiryInput): Promise<Inquiry> {
  const inquiry: Inquiry = {
    id: uuid(),
    company: input.company.trim(),
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    created_at: new Date().toISOString(),
  };
  append(KEYS.inquiries, inquiry);
  return inquiry;
}

export async function logEvent(type: EventType): Promise<Event> {
  const event: Event = {
    id: uuid(),
    type,
    created_at: new Date().toISOString(),
  };
  append(KEYS.events, event);
  return event;
}
