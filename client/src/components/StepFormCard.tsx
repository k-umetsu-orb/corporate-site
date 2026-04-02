/*
 * Design: Swiss Precision
 * 資料ダウンロード用 3ステップフォームカード
 */
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Position = "経営者・役員" | "部長・マネージャー" | "担当者" | "その他";
type Stage = "考え始め" | "比較検討中" | "導入意欲あり";

interface FormData {
  email: string;
  position: Position | "";
  stage: Stage | "";
  company: string;
  name: string;
  themes: string[];
  message: string;
}

const POSITIONS: Position[] = ["経営者・役員", "部長・マネージャー", "担当者", "その他"];
const STAGES: Stage[] = ["考え始め", "比較検討中", "導入意欲あり"];
const THEMES = ["営業体制の整備", "採用強化", "コスト削減", "人材育成", "DX推進", "その他"];
const STEP_LABELS = ["連絡先", "会社情報", "テーマ"];

export default function StepFormCard({ serviceTitle }: { serviceTitle?: string }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [data, setData] = useState<FormData>({
    email: "",
    position: "",
    stage: "",
    company: "",
    name: "",
    themes: [],
    message: "",
  });

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep1() {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "有効なメールアドレスを入力してください";
    if (!data.position) errs.position = "役職を選択してください";
    if (!data.stage) errs.stage = "検討段階を選択してください";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2() {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!data.company.trim()) errs.company = "会社名を入力してください";
    if (!data.name.trim()) errs.name = "お名前を入力してください";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      try {
        const res = await fetch("/api/step-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceTitle, ...data }),
        });
        if (!res.ok) throw new Error();
      } catch {
        // 送信失敗してもユーザー体験を損なわないよう続行
      }
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
  }

  if (done) {
    return (
      <div className="bg-white rounded-sm border border-border shadow-md p-8 text-center">
        <div className="w-14 h-14 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-navy" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">ご申請ありがとうございます</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          ご入力いただいたメールアドレスへ資料をお送りします。
          <br />
          数分以内に届かない場合は迷惑メールフォルダをご確認ください。
        </p>
      </div>
    );
  }

  const inputBase =
    "w-full px-3 py-2.5 text-sm border rounded-sm outline-none focus:ring-2 focus:ring-navy/30 transition-colors";

  return (
    <div className="bg-white rounded-sm border border-border shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-navy px-6 py-4">
        <p className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-1">
          Free Download
        </p>
        <p className="text-sm font-bold text-white">
          {serviceTitle
            ? `${serviceTitle}の資料を無料でダウンロード`
            : "サービス資料を無料でダウンロード"}
        </p>
      </div>

      {/* Step progress */}
      <div className="px-6 pt-5 pb-1">
        <div className="flex items-center">
          {STEP_LABELS.map((label, i) => {
            const idx = i + 1;
            const isActive = step === idx;
            const isDone = step > idx;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isDone || isActive
                        ? "bg-navy text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5" /> : idx}
                  </div>
                  <span
                    className={`text-[10px] mt-1 font-medium ${
                      isActive ? "text-navy" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-2 mb-4 transition-colors ${
                      isDone ? "bg-navy" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form body */}
      <div className="px-6 pb-6 pt-2 space-y-4">
        {/* ── Step 1: 連絡先 ── */}
        {step === 1 && (
          <>
            <div>
              <label
                htmlFor="sf-email"
                className="block text-xs font-semibold text-foreground mb-1.5"
              >
                メールアドレス <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="sf-email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="your@example.com"
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "sf-email-err" : undefined}
                className={`${inputBase} ${
                  errors.email ? "border-red-400 bg-red-50" : "border-border"
                }`}
              />
              {errors.email && (
                <p id="sf-email-err" role="alert" className="mt-1 text-[11px] text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <fieldset>
              <legend className="block text-xs font-semibold text-foreground mb-2">
                役職 <span className="text-red-500" aria-hidden="true">*</span>
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {POSITIONS.map((pos) => (
                  <label
                    key={pos}
                    className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-xs cursor-pointer transition-colors ${
                      data.position === pos
                        ? "border-navy bg-navy/5 text-navy font-semibold"
                        : "border-border text-foreground/70 hover:border-navy/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="position"
                      value={pos}
                      checked={data.position === pos}
                      onChange={() => update("position", pos as Position)}
                      className="sr-only"
                    />
                    {pos}
                  </label>
                ))}
              </div>
              {errors.position && (
                <p role="alert" className="mt-1 text-[11px] text-red-500">
                  {errors.position}
                </p>
              )}
            </fieldset>

            <fieldset>
              <legend className="block text-xs font-semibold text-foreground mb-2">
                検討段階 <span className="text-red-500" aria-hidden="true">*</span>
              </legend>
              <div className="flex flex-col gap-2">
                {STAGES.map((s) => (
                  <label
                    key={s}
                    className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-xs cursor-pointer transition-colors ${
                      data.stage === s
                        ? "border-navy bg-navy/5 text-navy font-semibold"
                        : "border-border text-foreground/70 hover:border-navy/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="stage"
                      value={s}
                      checked={data.stage === s}
                      onChange={() => update("stage", s as Stage)}
                      className="sr-only"
                    />
                    {s}
                  </label>
                ))}
              </div>
              {errors.stage && (
                <p role="alert" className="mt-1 text-[11px] text-red-500">
                  {errors.stage}
                </p>
              )}
            </fieldset>
          </>
        )}

        {/* ── Step 2: 会社情報 ── */}
        {step === 2 && (
          <>
            <div>
              <label
                htmlFor="sf-company"
                className="block text-xs font-semibold text-foreground mb-1.5"
              >
                会社名 <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="sf-company"
                type="text"
                autoComplete="organization"
                value={data.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="株式会社〇〇"
                aria-required="true"
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "sf-company-err" : undefined}
                className={`${inputBase} ${
                  errors.company ? "border-red-400 bg-red-50" : "border-border"
                }`}
              />
              {errors.company && (
                <p id="sf-company-err" role="alert" className="mt-1 text-[11px] text-red-500">
                  {errors.company}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="sf-name"
                className="block text-xs font-semibold text-foreground mb-1.5"
              >
                お名前 <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="sf-name"
                type="text"
                autoComplete="name"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="山田 太郎"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "sf-name-err" : undefined}
                className={`${inputBase} ${
                  errors.name ? "border-red-400 bg-red-50" : "border-border"
                }`}
              />
              {errors.name && (
                <p id="sf-name-err" role="alert" className="mt-1 text-[11px] text-red-500">
                  {errors.name}
                </p>
              )}
            </div>
          </>
        )}

        {/* ── Step 3: テーマ・メッセージ ── */}
        {step === 3 && (
          <>
            <fieldset>
              <legend className="block text-xs font-semibold text-foreground mb-2">
                関心のあるテーマ（複数選択可）
              </legend>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((theme) => {
                  const checked = data.themes.includes(theme);
                  return (
                    <label
                      key={theme}
                      className={`flex items-center gap-2 px-3 py-2 rounded-sm border text-xs cursor-pointer transition-colors ${
                        checked
                          ? "border-navy bg-navy/5 text-navy font-semibold"
                          : "border-border text-foreground/70 hover:border-navy/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={theme}
                        checked={checked}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...data.themes, theme]
                            : data.themes.filter((t) => t !== theme);
                          update("themes", next);
                        }}
                        className="sr-only"
                      />
                      {checked && <Check className="w-3 h-3 shrink-0" />}
                      {theme}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="sf-message"
                className="block text-xs font-semibold text-foreground mb-1.5"
              >
                ご質問・ご要望（任意）
              </label>
              <textarea
                id="sf-message"
                rows={3}
                value={data.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="お気軽にご記入ください"
                className={`${inputBase} resize-none`}
              />
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3 pt-1">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← 戻る
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors"
          >
            {step === 3 ? "資料をダウンロード" : "次へ"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
          ご入力いただいた情報は資料送付にのみ使用します。{" "}
          <a href="/privacy-policy" className="underline hover:text-navy transition-colors">
            プライバシーポリシー
          </a>
          に同意の上ご送信ください。
        </p>
      </div>
    </div>
  );
}
