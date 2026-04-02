/*
 * Design: Swiss Precision
 * CTAボタン — ファーストビュー左列に設置
 */
import { Link } from "wouter";
import { ArrowRight, MessageCircle } from "lucide-react";
// import { Download } from "lucide-react"; // TODO: 資料が準備できたら復活させる

export default function DocPreviewCard() {
  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      {/* TODO: 資料が準備できたら以下のコメントアウトを解除する */}
      {/*
      <Link
        href="/download"
        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-navy text-sm font-bold rounded-full hover:bg-white/90 transition-colors shadow-sm"
      >
        <Download className="w-4 h-4 shrink-0" />
        資料を無料でダウンロード
      </Link>
      */}
      <Link
        href="/contact"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-navy text-sm font-bold rounded-full hover:bg-white/90 transition-colors shadow-sm"
      >
        <MessageCircle className="w-4 h-4 shrink-0" />
        無料相談はこちら
        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
      </Link>
    </div>
  );
}
