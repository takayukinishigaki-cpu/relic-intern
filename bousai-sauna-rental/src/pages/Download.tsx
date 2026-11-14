import { ChevronDown, FileDown, FileText, Loader2, Lock } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { DOCS } from "@/content";
import { createLead } from "@/lib/repository";
import { isValidEmail } from "@/lib/utils";
import type { LeadInput } from "@/types";

type Errors = Partial<Record<keyof LeadInput, string>>;

function validate(v: LeadInput): Errors {
  const e: Errors = {};
  if (!v.company.trim()) e.company = "会社名を入力してください";
  if (!v.name.trim()) e.name = "お名前を入力してください";
  if (!v.email.trim()) e.email = "メールアドレスを入力してください";
  else if (!isValidEmail(v.email)) e.email = "メールアドレスの形式をご確認ください";
  return e;
}

export default function Download() {
  const navigate = useNavigate();
  const [values, setValues] = useState<LeadInput>({ company: "", name: "", email: "", department: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof LeadInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const lead = await createLead(values);
      navigate("/download/thanks", { state: { name: lead.name, company: lead.company } });
    } catch {
      toast({ variant: "destructive", title: "送信できませんでした。時間をおいてもう一度お試しください。" });
      setSubmitting(false);
    }
  }

  const fieldProps = (key: keyof LeadInput) => ({
    id: key,
    value: values[key] ?? "",
    onChange: set(key),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-16 pt-6">
      <ol className="mb-6 flex items-center gap-2 text-xs font-bold" aria-label="手続きの進み具合">
        <li className="flex items-center gap-1.5 text-primary">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">1</span>
          入力
        </li>
        <li aria-hidden className="h-px flex-1 bg-border" />
        <li className="flex items-center gap-1.5 text-muted-foreground">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">2</span>
          ダウンロード
        </li>
      </ol>

      <p className="text-xs font-bold tracking-[0.2em] text-accent">DOWNLOAD</p>
      <h1 className="mt-1 text-2xl font-black leading-snug text-primary">企画書・見積書のダウンロード</h1>
      <p className="mt-2 text-[15px] text-muted-foreground">
        4つの項目を入力すると、次の画面ですぐにダウンロードできます（約30秒）。
      </p>

      <details className="group mt-5 rounded-xl border bg-card">
        <summary className="flex min-h-12 cursor-pointer list-none items-center gap-2 px-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
          <FileText className="h-5 w-5 shrink-0 text-accent" />
          <span className="flex-1">資料に載っている内容を見る</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="space-y-3 px-4 pb-4 text-sm">
          {DOCS.map((doc) => (
            <div key={doc.href}>
              <p className="font-bold text-primary">{doc.title}（PDF）</p>
              <ul className="mt-1 space-y-0.5 text-muted-foreground">
                {doc.toc.map((item) => (
                  <li key={item} className="flex gap-1.5">
                    <span className="text-accent">・</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>

      <form noValidate onSubmit={onSubmit} className="mt-8 space-y-5">
        <FormField id="company" label="会社名" required error={errors.company}>
          <Input {...fieldProps("company")} autoComplete="organization" placeholder="例）株式会社○○" />
        </FormField>
        <FormField id="name" label="お名前" required error={errors.name}>
          <Input {...fieldProps("name")} autoComplete="name" placeholder="例）山田 花子" />
        </FormField>
        <FormField id="email" label="メールアドレス" required error={errors.email}>
          <Input
            {...fieldProps("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            placeholder="例）hanako@example.co.jp"
          />
        </FormField>
        <FormField id="department" label="部署" hint="例）総務部、人事部など">
          <Input {...fieldProps("department")} autoComplete="organization-title" placeholder="例）総務部" />
        </FormField>

        <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting}>
          {submitting ? <Loader2 className="animate-spin" /> : <FileDown />}
          {submitting ? "送信しています…" : "登録して資料をダウンロード"}
        </Button>
        <p className="flex items-start justify-center gap-1.5 text-center text-xs text-muted-foreground">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          ご入力いただいた情報は、資料に関するご連絡にのみ使用します。
        </p>
      </form>
    </div>
  );
}
