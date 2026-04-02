/*
 * Design: Swiss Precision
 * 資料詳細＋DLフォーム /download/[slug] — 概要→おすすめ→わかること→フォーム（2カラム）
 * UI参照: MFライブラリ詳細（完全コピー禁止、UIパターンのみ参考）
 */
import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import LeadForm from "@/components/LeadForm";
import { useSEO } from "@/hooks/useSEO";
import StructuredData, { breadcrumbSchema } from "@/components/StructuredData";
import { downloads } from "@/lib/data";
import NotFound from "./NotFound";

export default function DownloadDetail() {
  const { slug } = useParams<{ slug: string }>();
  const dl = downloads.find((d) => d.slug === slug);

  useSEO({
    title: dl ? `${dl.title} | 資料ダウンロード` : "資料ダウンロード",
    description: dl ? dl.description.slice(0, 120) : "",
    path: `/download/${slug}`,
  });

  // 関連資料（同カテゴリ、自身除く、最大3件）
  const relatedDownloads = useMemo(() => {
    if (!dl) return [];
    return downloads
      .filter((d) => d.slug !== dl.slug)
      .sort((a, b) => {
        const aMatch = a.tags.some((t) => dl.tags.includes(t)) ? 1 : 0;
        const bMatch = b.tags.some((t) => dl.tags.includes(t)) ? 1 : 0;
        return bMatch - aMatch;
      })
      .slice(0, 3);
  }, [dl]);

  if (!dl) return <NotFound />;

  return (
    <Layout>
      <StructuredData
        data={breadcrumbSchema([
          { name: "ホーム", url: "https://xxxx.co.jp/" },
          { name: "資料ダウンロード", url: "https://xxxx.co.jp/download" },
          { name: dl.title, url: `https://xxxx.co.jp/download/${dl.slug}` },
        ])}
      />

      {/* パンくず付きヘッダー */}
      <div className="bg-secondary border-b border-border">
        <div className="container py-6">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-navy transition-colors">
              ホーム
            </Link>
            <span>/</span>
            <Link href="/download" className="hover:text-navy transition-colors">
              資料ダウンロード
            </Link>
            <span>/</span>
            <span className="text-foreground">{dl.title}</span>
          </nav>
          <div className="flex flex-wrap gap-2 mb-3">
            {dl.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 bg-navy/10 text-navy rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
            {dl.title}
          </h1>
        </div>
      </div>

      <section className="py-12 md:py-16">
        <div className="container">
          {/* 2カラムレイアウト: 左=説明、右=フォーム */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* 左カラム: 資料説明 */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              {/* サムネイル */}
              <AnimatedSection>
                <div className="aspect-[16/10] overflow-hidden bg-muted rounded-sm mb-8 border border-border">
                  <img
                    src={dl.image}
                    alt={dl.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </AnimatedSection>

              {/* 概要 */}
              <AnimatedSection>
                <section className="mb-8">
                  <h2 className="text-base font-bold text-foreground mb-3 pb-2 border-b-2 border-navy">
                    資料の概要
                  </h2>
                  <p className="text-sm text-muted-foreground leading-[1.9]">
                    {dl.description}
                  </p>
                </section>
              </AnimatedSection>

              {/* こんな方におすすめ */}
              <AnimatedSection>
                <section className="mb-8">
                  <h2 className="text-base font-bold text-foreground mb-3 pb-2 border-b-2 border-navy">
                    こんな方におすすめ
                  </h2>
                  <ul className="space-y-2">
                    {dl.targetAudience.map((t, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 bg-navy rounded-full mt-2 shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimatedSection>

              {/* この資料でわかること */}
              <AnimatedSection>
                <section className="mb-8">
                  <h2 className="text-base font-bold text-foreground mb-3 pb-2 border-b-2 border-navy">
                    この資料でわかること
                  </h2>
                  <ul className="space-y-2">
                    {dl.contents.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-navy shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </section>
              </AnimatedSection>

              {/* 一覧へ戻る */}
              <div className="pt-4">
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline"
                >
                  資料一覧へ戻る
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* 右カラム: フォーム（スティッキー） */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="lg:sticky lg:top-24">
                <AnimatedSection>
                  <LeadForm variant="download" itemTitle={dl.title} />
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 関連資料 */}
      {relatedDownloads.length > 0 && (
        <section className="py-14 bg-secondary border-t border-border">
          <div className="container">
            <h2 className="text-lg font-bold text-foreground mb-6">
              その他の資料
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedDownloads.map((rd, i) => (
                <AnimatedSection key={rd.slug} delay={i * 80}>
                  <Link
                    href={`/download/${rd.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-white border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={rd.image}
                          alt={rd.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {rd.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 bg-navy/10 text-navy rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-sm font-semibold text-foreground leading-relaxed mb-2 group-hover:text-navy transition-colors flex-1">
                          {rd.title}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-navy">
                          <Download className="w-3.5 h-3.5" />
                          無料でダウンロード
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </Layout>
  );
}
