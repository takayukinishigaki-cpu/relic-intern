import { Loader2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { createInquiry, logEvent } from "@/lib/repository";
import { isValidEmail } from "@/lib/utils";
import type { InquiryInput } from "@/types";

type Errors = Partial<Record<keyof InquiryInput, string>>;

const EMPTY: InquiryInput = { company: "", name: "", email: "", message: "" };

function validate(v: InquiryInput): Errors {
  const e: Errors = {};
  if (!v.company.trim()) e.company = "会社名を入力してください";
  if (!v.name.trim()) e.name = "お名前を入力してください";
  if (!v.email.trim()) e.email = "メールアドレスを入力してください";
  else if (!isValidEmail(v.email)) e.email = "メールアドレスの形式をご確認ください";
  if (!v.message.trim()) e.message = "お問い合わせ内容を入力してください";
  return e;
}

export default function Contact() {
  const [values, setValues] = useState<InquiryInput>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set =
    (key: keyof InquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const fieldProps = (key: keyof InquiryInput) => ({
    id: key,
    value: values[key],
    onChange: set(key),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

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
      await createInquiry(values);
      await logEvent("inquiry");
      setValues(EMPTY);
      toast({ title: "お問い合わせありがとうございます。担当よりご連絡します" });
    } catch {
      toast({ variant: "destructive", title: "送信できませんでした。時間をおいてもう一度お試しください。" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 pb-16 pt-8">
      <p className="text-xs font-bold tracking-[0.2em] text-accent">CONTACT</p>
      <h1 className="mt-1 text-2xl font-black leading-snug text-primary">お問い合わせ</h1>
      <p className="mt-2 text-[15px] text-muted-foreground">
        実施時期・人数・会場のご相談など、どんなことでもお気軽にどうぞ。担当者よりメールでご連絡します。
      </p>

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
        <FormField id="message" label="お問い合わせ内容" required error={errors.message}>
          <Textarea
            {...fieldProps("message")}
            placeholder="例）来年3月ごろ、社員15名ほどで実施したいと考えています。会場は本社の駐車場を想定しています。"
          />
        </FormField>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? <Loader2 className="animate-spin" /> : <Send />}
          {submitting ? "送信しています…" : "送信する"}
        </Button>
      </form>
    </div>
  );
}
