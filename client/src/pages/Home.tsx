/*
 * Design: Swiss Precision — スイスタイポグラフィ × ジャパニーズミニマリズム
 * TOPページ: Hero → Mission → サービス紹介 → 支援実績 → セミナー → 資料DL → お知らせ → Company導線 → CTA
 */
import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, ChevronRight, Cpu } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { IMAGES, seminars, newsItems } from "@/lib/data";
import { useSEO } from "@/hooks/useSEO";
import StructuredData, { organizationSchema } from "@/components/StructuredData";

function AnimatedSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-in-up ${isVisible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const recentNews = newsItems.slice(0, 3);

  useSEO({
    title: "orb株式会社",
    description: "orb株式会社のコーポレートサイトです。会計事務所に特化した営業支援・人材紹介・AX支援を提供しています。紹介に依存しない営業の仕組みと、優秀な人材を惹きつける採用の仕組みで、貴社の持続的な成長を支援します。",
    path: "/",
  });

  return (
    <Layout>
      <StructuredData data={organizationSchema} />
      {/* ===== Hero ===== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/70" />
        </div>
        <div className="relative container py-20">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-semibold tracking-[0.3em] uppercase text-navy/60">
              For Tax Accounting Firms
            </p>
            <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15]">
              会計事務所の成長を<br />
              <span className="text-navy">仕組みで支える</span>
            </h1>
            <p className="mt-6 text-sm md:text-base text-foreground/70 leading-relaxed max-w-lg">
              専門性を持つ会計事務所が、その価値を最大限に発揮できる環境をつくる。
              orbは会計事務所に特化した支援で、貴事務所の持続的な成長を後押しします。
            </p>
            <div className="mt-10">
              <Link
                href="/company"
                className="group inline-flex items-center gap-5"
              >
                <span className="w-16 h-16 rounded-full border-2 border-navy/30 group-hover:border-navy group-hover:bg-navy flex items-center justify-center transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-navy group-hover:text-white transition-colors duration-300" />
                </span>
                <span className="text-base font-semibold text-foreground group-hover:text-navy transition-colors duration-300">
                  私たちについて
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* ===== サービス紹介 ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Services"
              title="会計事務所に特化した支援"
              description="業界特有の課題を深く理解しているからこそ、実効性の高い戦略をご提案できます。"
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* 営業支援 */}
            <AnimatedSection>
              <Link href="/service/sales-support" className="group block h-full">
                <div className="relative h-full border border-border rounded-sm p-8 md:p-10 bg-white hover:shadow-xl hover:border-navy/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-navy/[0.04] to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl md:text-6xl font-display font-bold text-navy/[0.08] leading-none select-none">01</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-navy/[0.06] flex items-center justify-center mb-6 group-hover:bg-navy/[0.10] transition-colors">
                    <TrendingUp className="w-6 h-6 text-navy" />
                  </div>
                  <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                    Sales Support
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-navy transition-colors">
                    営業支援
                  </h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    紹介や顧問契約に依存した経営から脱却し、安定的に新規顧客を獲得する仕組みを構築します。
                    Webマーケティング戦略の立案、リード獲得、提案の標準化まで、一気通貫でサポートします。
                  </p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:gap-2 transition-all">
                      詳しく見る <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
            {/* 人材紹介 */}
            <AnimatedSection>
              <Link href="/service/recruitment-support" className="group block h-full">
                <div className="relative h-full border border-border rounded-sm p-8 md:p-10 bg-white hover:shadow-xl hover:border-navy/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-navy/[0.04] to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl md:text-6xl font-display font-bold text-navy/[0.08] leading-none select-none">02</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-navy/[0.06] flex items-center justify-center mb-6 group-hover:bg-navy/[0.10] transition-colors">
                    <Users className="w-6 h-6 text-navy" />
                  </div>
                  <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                    Recruitment Support
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-navy transition-colors">
                    人材紹介
                  </h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    採用市場で「選ばれる事務所」になるための最適な人材をご紹介します。
                    求める人材像の明確化から、候補者のご紹介、選考プロセスのサポート、入所後の定着支援まで、トータルでご支援します。
                  </p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:gap-2 transition-all">
                      詳しく見る <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
            {/* AX支援 */}
            <AnimatedSection>
              <Link href="/service/ai-transformation-support" className="group block h-full">
                <div className="relative h-full border border-border rounded-sm p-8 md:p-10 bg-white hover:shadow-xl hover:border-navy/20 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-navy/[0.04] to-transparent rounded-bl-full pointer-events-none" />
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl md:text-6xl font-display font-bold text-navy/[0.08] leading-none select-none">03</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-navy/[0.06] flex items-center justify-center mb-6 group-hover:bg-navy/[0.10] transition-colors">
                    <Cpu className="w-6 h-6 text-navy" />
                  </div>
                  <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                    AI Transformation Support
                  </p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-navy transition-colors">
                    AX支援
                  </h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    AIを活用した業務効率化・自動化で、スタッフの生産性を高め、本来の専門業務に集中できる環境をつくります。
                  </p>
                  <div className="mt-6 pt-5 border-t border-border">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-navy group-hover:gap-2 transition-all">
                      詳しく見る <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>



      {/* ===== 支援実績 ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <SectionHeading
                label="Works"
                title="支援実績"
                description="会計事務所様とorbの具体的なお取り組み事例をご紹介します。"
              />
              <Link
                href="/works"
                className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
              >
                実績一覧を見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="py-14 text-center">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-navy mb-3">
                Coming Soon...
              </p>
              <p className="text-sm text-muted-foreground">支援実績は現在準備中です。公開までしばらくお待ちください。</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== セミナー ===== */}
      {seminars.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container">
            <AnimatedSection>
              <div className="flex items-end justify-between mb-10 md:mb-14">
                <SectionHeading
                  label="Seminars"
                  title="開催予定のセミナー"
                  description="会計事務所の営業・採用・AX推進に役立つ無料セミナーを定期開催しています。"
                />
                <Link
                  href="/seminar"
                  className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
                >
                  セミナー一覧 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {seminars.slice(0, 4).map((sem) => (
                <AnimatedSection key={sem.id}>
                  <Link href={`/seminar/${sem.id}`} className="group block bg-white rounded-sm border border-border overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="overflow-hidden aspect-[3/2]">
                      <img
                        src={sem.image}
                        alt={sem.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm ${
                          sem.status === "upcoming" ? "bg-navy text-white" : "bg-muted text-muted-foreground"
                        }`}>
                          {sem.status === "upcoming" ? "受付中" : "開催済み"}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{sem.date}</span>
                      </div>
                      <h3 className="text-sm font-bold tracking-tight text-foreground group-hover:text-navy transition-colors leading-snug line-clamp-2 flex-1">
                        {sem.title}
                      </h3>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/seminar"
                className="inline-flex items-center gap-1 text-sm font-medium text-navy"
              >
                セミナー一覧 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== 資料ダウンロード ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <SectionHeading
                label="Downloads"
                title="お役立ち資料"
                description="会計事務所の経営に役立つ資料を無料でダウンロードいただけます。"
              />
              <Link
                href="/download"
                className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
              >
                資料一覧 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="py-14 text-center">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-navy mb-3">
                Coming Soon...
              </p>
              <p className="text-sm text-muted-foreground">お役立ち資料は現在準備中です。公開までしばらくお待ちください。</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== お知らせ ===== */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <SectionHeading label="News" title="お知らせ" />
              <Link
                href="/news"
                className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
              >
                すべて見る <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
          <div className="space-y-0 divide-y divide-border">
            {recentNews.map((news) => (
              <AnimatedSection key={news.id}>
                <Link
                  href={`/news/${news.id}`}
                  className="group flex items-center gap-4 py-4 hover:bg-white/50 transition-colors px-2 -mx-2 rounded-sm"
                >
                  <time className="hidden sm:block text-xs text-muted-foreground font-display w-24 shrink-0">
                    {news.date}
                  </time>
                  <span className="px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy rounded-sm shrink-0">
                    {news.category}
                  </span>
                  <span className="text-sm text-foreground group-hover:text-navy transition-colors truncate">
                    {news.title}
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 ml-auto" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Company 導線 ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              {/* 左: オフィス写真 */}
              <div className="overflow-hidden rounded-sm">
                <img
                  src="/staff-photo.jpg"
                  alt="社員集合写真"
                  className="w-full h-64 md:h-[400px] object-cover"
                />
              </div>
              {/* 右: 会社情報 + リンクリスト */}
              <div>
                <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                  Company
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground leading-snug">
                  会社について
                </h2>
                <div className="mt-4 h-px w-12 bg-navy" />
                <p className="mt-6 text-sm md:text-base text-muted-foreground leading-relaxed">
                  会計事務所に特化した支援内容で、貴事務所の持続的な成長を実現します。
                </p>
                <div className="mt-8 grid grid-cols-2 gap-0">
                  {[
                    { label: "会社概要", href: "/company" },
                    { label: "代表メッセージ", href: "/company/message" },
                    { label: "サービス", href: "/service" },
                    { label: "お問い合わせ", href: "/contact" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="group flex items-center justify-between py-4 border-b border-border hover:bg-secondary/50 transition-colors px-2"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-navy transition-colors">
                        {item.label}
                      </span>
                      <span className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center group-hover:bg-navy transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-navy group-hover:text-white transition-colors" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <CTASection />
    </Layout>
  );
}
