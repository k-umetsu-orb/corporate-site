/*
 * Design: Swiss Precision
 * リード獲得フォーム — セミナー申込・資料DL兼用
 * variant: "seminar" | "download"
 */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Download, CheckCircle } from "lucide-react";

interface LeadFormProps {
  variant: "seminar" | "download";
  itemTitle: string;
  onSuccess?: () => void;
}

interface FormData {
  company: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  position: string;
  purpose: string;
  theme: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function LeadForm({ variant, itemTitle, onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    position: "",
    purpose: "",
    theme: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.company.trim()) newErrors.company = "会社名は必須です";
    if (!formData.lastName.trim()) newErrors.lastName = "姓は必須です";
    if (!formData.firstName.trim()) newErrors.firstName = "名は必須です";
    if (!formData.phone.trim()) newErrors.phone = "電話番号は必須です";
    else if (!/^[\d\-+()]+$/.test(formData.phone)) newErrors.phone = "正しい電話番号を入力してください";
    if (!formData.email.trim()) newErrors.email = "メールアドレスは必須です";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "正しいメールアドレスを入力してください";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ variant, itemTitle, ...formData }),
      });
      if (!res.ok) throw new Error();
      setIsSubmitted(true);
      onSuccess?.();
    } catch {
      setErrors({ form: "送信に失敗しました。時間をおいて再度お試しください。" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-border rounded-sm p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-foreground mb-2">
          {variant === "seminar" ? "お申し込みありがとうございます" : "ダウンロードありがとうございます"}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {variant === "seminar"
            ? "セミナーの詳細情報をご登録のメールアドレスにお送りしました。当日のご参加をお待ちしております。"
            : "資料のダウンロードリンクをご登録のメールアドレスにお送りしました。"}
        </p>
        {variant === "download" && (
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors mb-4"
          >
            <Download className="w-4 h-4" />
            資料をダウンロード（デモ）
          </a>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-navy font-medium hover:underline"
          >
            無料相談に申し込む
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 text-sm text-navy font-medium hover:underline"
          >
            他の資料を見る
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-3 py-2.5 text-sm border rounded-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy ${
      errors[field] ? "border-red-400" : "border-border"
    }`;

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-sm p-6 md:p-8" noValidate>
      <h3 className="text-base font-bold text-foreground mb-1">
        {variant === "seminar" ? "セミナーに申し込む" : "無料資料ダウンロード"}
      </h3>
      <p className="text-xs text-muted-foreground mb-6">
        {variant === "seminar"
          ? `「${itemTitle}」への参加をお申し込みいただけます。`
          : `「${itemTitle}」を無料でダウンロードいただけます。`}
      </p>

      <div className="space-y-4">
        {/* 会社名 */}
        <div>
          <label htmlFor="company" className="block text-xs font-medium text-foreground mb-1">
            会社名 <span className="text-red-500">*</span>
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={inputClass("company")}
            placeholder="例：会計事務所〇〇"
          />
          {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
        </div>

        {/* 姓・名 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="lastName" className="block text-xs font-medium text-foreground mb-1">
              姓 <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className={inputClass("lastName")}
              placeholder="山田"
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="firstName" className="block text-xs font-medium text-foreground mb-1">
              名 <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={inputClass("firstName")}
              placeholder="太郎"
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
          </div>
        </div>

        {/* 電話番号 */}
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-1">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={inputClass("phone")}
            placeholder="03-1234-5678"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* メールアドレス */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={inputClass("email")}
            placeholder="yamada@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* 役職（任意） */}
        <div>
          <label htmlFor="position" className="block text-xs font-medium text-foreground mb-1">
            役職
          </label>
          <input
            id="position"
            type="text"
            value={formData.position}
            onChange={(e) => handleChange("position", e.target.value)}
            className={inputClass("position")}
            placeholder="例：代表、マネージャー"
          />
        </div>

        {/* 参加目的 / 興味テーマ（任意） */}
        <div>
          <label htmlFor="purpose" className="block text-xs font-medium text-foreground mb-1">
            {variant === "seminar" ? "参加目的" : "興味のあるテーマ"}
          </label>
          <textarea
            id="purpose"
            value={formData.purpose}
            onChange={(e) => handleChange("purpose", e.target.value)}
            className={`${inputClass("purpose")} resize-none`}
            rows={3}
            placeholder={
              variant === "seminar"
                ? "セミナーで特に聞きたいことがあればご記入ください"
                : "興味のあるテーマや課題があればご記入ください"
            }
          />
        </div>
      </div>

      {/* プライバシーポリシー同意 */}
      <p className="text-xs text-muted-foreground mt-5 mb-4">
        <Link href="/privacy-policy" className="text-navy underline hover:no-underline">
          プライバシーポリシー
        </Link>
        に同意の上、送信してください。
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            送信中...
          </>
        ) : variant === "seminar" ? (
          <>
            申し込む
            <ArrowRight className="w-4 h-4" />
          </>
        ) : (
          <>
            無料でダウンロード
            <Download className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
