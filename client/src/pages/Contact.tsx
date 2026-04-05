/*
 * Design: Swiss Precision
 * お問い合わせページ — フォーム
 */
import { useState } from "react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { Link } from "wouter";
import { ArrowRight, Download } from "lucide-react";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return <div ref={ref} className={`fade-in-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
}

const inquiryTypes = [
  "営業支援について",
  "人材紹介について",
  "AX支援について",
  "セミナーについて",
  "資料請求",
  "その他",
];

interface FormState {
  inquiryType: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    inquiryType: "",
    company: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useSEO({
    title: "お問い合わせ",
    description: "会計事務所向け営業支援・人材紹介・AX支援に関するお問い合わせ・無料相談のお申し込みはこちらから。",
    path: "/contact",
  });

  const set = (field: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("送信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 text-sm bg-white border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors";

  return (
    <Layout>
      <PageHero
        label="Contact"
        title="お問い合わせ"
        breadcrumbs={[{ label: "お問い合わせ" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-2xl">
          {!submitted ? (
            <AnimatedSection>
              <div className="mb-10">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  サービスに関するご質問、無料相談のお申し込み、資料請求など、
                  お気軽にお問い合わせください。2営業日以内に担当者よりご連絡いたします。
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* お問い合わせ種別 */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    お問い合わせ種別 <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={form.inquiryType}
                    onChange={set("inquiryType")}
                    className={inputClass}
                  >
                    <option value="">選択してください</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* 会社名 */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    法人名 / 事務所名 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={set("company")}
                    placeholder="例：〇〇会計事務所"
                    className={inputClass}
                  />
                </div>

                {/* 氏名 */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    お名前 <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={set("name")}
                    placeholder="例：山田 太郎"
                    className={inputClass}
                  />
                </div>

                {/* メールアドレス */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    メールアドレス <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="例：info@example.com"
                    className={inputClass}
                  />
                </div>

                {/* 電話番号 */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    電話番号
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="例：03-1234-5678"
                    className={inputClass}
                  />
                </div>

                {/* お問い合わせ内容 */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    お問い合わせ内容 <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="お問い合わせ内容をご記入ください"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* プライバシーポリシー同意 */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    id="privacy"
                    className="mt-1 w-4 h-4 rounded-sm border-border text-navy focus:ring-navy"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground">
                    <a href="/privacy-policy" target="_blank" className="text-navy underline hover:no-underline">
                      プライバシーポリシー
                    </a>
                    に同意の上、送信してください。
                  </label>
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-navy text-white font-semibold rounded-sm hover:bg-navy-light transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "送信中..." : "送信する"}
                </Button>
              </form>
            </AnimatedSection>
          ) : (
            <AnimatedSection>
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  お問い合わせありがとうございます
                </h2>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  お問い合わせを受け付けました。<br />
                  担当者より2営業日以内にご連絡いたします。<br />
                  しばらくお待ちくださいませ。
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/download"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors"
                  >
                    資料をダウンロード
                    <Download className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-navy/20 text-navy text-sm font-medium rounded-sm hover:bg-navy/5 transition-colors"
                  >
                    トップページに戻る
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </Layout>
  );
}
