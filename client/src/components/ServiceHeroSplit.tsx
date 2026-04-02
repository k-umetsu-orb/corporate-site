/*
 * Design: Swiss Precision
 * サービスヒーロー — 2カラム分割レイアウト + SVGウェーブ背景
 * 左列: パンくず + H1 + サブコピー + 説明 + CTAボタン
 * 右列: StepFormCard
 * SP: テキスト → フォーム の縦積み
 */
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import DocPreviewCard from "./DocPreviewCard";
// import StepFormCard from "./StepFormCard"; // TODO: 資料が準備できたら復活させる
import type { Service } from "@/lib/data";

interface ServiceHeroSplitProps {
  service: Service;
  breadcrumbs: { label: string; href?: string }[];
}

export default function ServiceHeroSplit({
  service,
  breadcrumbs,
}: ServiceHeroSplitProps) {
  return (
    <div className="relative bg-navy overflow-hidden">
      {/* Decorative SVG wave pattern */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M0,320 C240,200 480,440 720,320 C960,200 1200,440 1440,320 L1440,640 L0,640 Z"
          fill="white"
        />
        <path
          d="M0,420 C360,300 720,540 1080,420 C1260,360 1380,480 1440,420 L1440,640 L0,640 Z"
          fill="white"
          opacity="0.5"
        />
      </svg>

      {/* Bottom wave — transitions to white page background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 72"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full block"
          preserveAspectRatio="none"
        >
          <path d="M0,36 C360,72 1080,0 1440,36 L1440,72 L0,72 Z" fill="white" />
        </svg>
      </div>

      <div className="relative container pt-8 pb-24 md:pb-28">
        {/* Breadcrumb */}
        <nav aria-label="パンくずリスト" className="mb-8">
          <ol className="flex items-center flex-wrap gap-1.5 text-[11px] text-white/50">
            <li>
              <Link href="/" className="hover:text-white/80 transition-colors">
                ホーム
              </Link>
            </li>
            {breadcrumbs.map((bc, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3" aria-hidden="true" />
                {bc.href ? (
                  <Link href={bc.href} className="hover:text-white/80 transition-colors">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{bc.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-2xl">
          {/* ── Left: テキスト + CTAボタン ── */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/50 mb-3">
            {service.titleEn}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-snug">
            {service.catchphrase}
          </h1>
          <div className="mt-5 h-px w-12 bg-white/30" />
          <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-lg">
            {service.subcopy}
          </p>
          <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed max-w-lg">
            {service.description}
          </p>
          <DocPreviewCard />
        </div>

        {/* ── Right: StepFormCard ── */}
        {/* TODO: 資料が準備できたら以下のコメントアウトを解除する */}
        {/*
        <div className="w-full">
          <StepFormCard serviceTitle={service.title} />
        </div>
        */}
      </div>
    </div>
  );
}
