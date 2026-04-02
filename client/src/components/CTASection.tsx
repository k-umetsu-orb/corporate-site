/*
 * Design: Swiss Precision
 * CTAセクション — 背景画像 + ダークオーバーレイ、白テキスト、2つのCTAボタン
 */
import { Link } from "wouter";
import { ArrowRight, Download } from "lucide-react";
import { IMAGES } from "@/lib/data";

interface CTASectionProps {
  variant?: "full" | "compact";
}

export default function CTASection({ variant: _variant = "full" }: CTASectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGES.ctaBg})` }}
      />
      <div className="absolute inset-0 bg-navy-dark/85" />
      <div className="relative container text-center">
        <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-white/50">
          Contact Us
        </p>
        <h2 className="mt-3 text-2xl md:text-4xl font-bold text-white tracking-tight">
          まずはお気軽に<br className="md:hidden" />
          ご相談ください
        </h2>
        <p className="mt-4 text-sm md:text-base text-white/70 max-w-xl mx-auto leading-relaxed">
          課題を抱える会計事務所様へ。まずは無料相談で、貴事務所の現状と課題をお聞かせください。
          最適なソリューションをご提案いたします。
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-navy text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors shadow-lg"
          >
            無料相談に申し込む
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium rounded-sm hover:bg-white/10 transition-colors"
          >
            資料をダウンロード
            <Download className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
