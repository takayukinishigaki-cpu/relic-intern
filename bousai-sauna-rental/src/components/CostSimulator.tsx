import { Calculator } from "lucide-react";
import { useState } from "react";

import { PRICING, SCALE, yen } from "@/content";
import { cn } from "@/lib/utils";

type Plan = "basic" | "instructor";

/** 参加人数とプランから、1人あたりの費用を試算する（稟議の説明用） */
export function CostSimulator() {
  const [people, setPeople] = useState<number>(SCALE.participantsMax);
  const [plan, setPlan] = useState<Plan>("basic");

  const total = PRICING.basic + (plan === "instructor" ? PRICING.instructorOption : 0);
  const perPerson = Math.round(total / people / 100) * 100;

  return (
    <div className="rounded-2xl border-2 border-primary/10 bg-white p-5">
      <p className="flex items-center gap-2 font-bold text-primary">
        <Calculator className="h-5 w-5 text-accent" />
        1人あたりの費用を試算する
      </p>

      <div role="radiogroup" aria-label="プラン" className="mt-4 grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
        {(
          [
            ["basic", "基本プラン"],
            ["instructor", "講師派遣つき"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={plan === value}
            onClick={() => setPlan(value)}
            className={cn(
              "h-11 rounded-full text-sm font-bold transition-colors",
              plan === value ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <label htmlFor="people" className="mt-5 flex items-baseline justify-between text-sm font-bold">
        参加人数
        <span className="text-2xl font-black text-primary">
          {people}
          <span className="ml-0.5 text-sm">名</span>
        </span>
      </label>
      <input
        id="people"
        type="range"
        min={SCALE.participantsMin}
        max={SCALE.participantsMax}
        step={1}
        value={people}
        onChange={(e) => setPeople(Number(e.target.value))}
        className="mt-2 h-11 w-full cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{SCALE.participantsMin}名</span>
        <span>{SCALE.participantsMax}名</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-center">
        <div className="rounded-xl bg-muted p-3">
          <p className="text-xs text-muted-foreground">1回の費用</p>
          <p className="text-lg font-black text-primary">{yen(total)}</p>
        </div>
        <div className="rounded-xl bg-accent/10 p-3">
          <p className="text-xs text-muted-foreground">1人あたり（約）</p>
          <p className="text-lg font-black text-accent">{yen(perPerson)}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        ※試算は目安です。会場や日程によって条件が変わる場合があります。正式な金額は見積書でご確認ください。
      </p>
    </div>
  );
}
