/*
 * Design: Swiss Precision
 * 支援実績詳細 /works/[slug]
 */
import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { AlertTriangle, CheckCircle2, Clock, List, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import RelatedCards from "@/components/RelatedCards";
import { useSEO } from "@/hooks/useSEO";
import StructuredData, { breadcrumbSchema } from "@/components/StructuredData";
import { works } from "@/lib/data";
import NotFound from "./NotFound";

const TOC_ITEMS = [
  { id: "background",  label: "背景" },
  { id: "challenges",  label: "課題" },
  { id: "approach",    label: "施策" },
  { id: "process",     label: "プロセス" },
  { id: "results",     label: "成果" },
  { id: "outlook",     label: "今後の展望" },
];

export default function WorksDetail() {
  const { slug } = useParams<{ slug: string }>();
  const work = works.find((w) => w.slug === slug);

  useSEO({
    title: work ? `${work.title} | 支援実績` : "実績詳細",
    description: work ? work.background.slice(0, 120) : "",
    path: `/works/${slug}`,
  });

  const relatedWorks = useMemo(() => {
    if (!work) return [];
    return works
      .filter((w) => w.slug !== work.slug)
      .map((w) => ({
        ...w,
        score: w.tags.filter((t) => work.tags.includes(t)).length + (w.area === work.area ? 2 : 0),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [work]);

  if (!work) return <NotFound />;

  return (
    <Layout>
      <StructuredData
        data={breadcrumbSchema([
          { name: "ホーム", url: "https://xxxx.co.jp/" },
          { name: "支援実績", url: "https://xxxx.co.jp/works" },
          { name: work.clientName, url: `https://xxxx.co.jp/works/${work.slug}` },
        ])}
      />

      <PageHero
        label="Works"
        title={work.title}
        breadcrumbs={[
          { label: "支援実績", href: "/works" },
          { label: work.clientName },
        ]}
      />

      <article className="py-16 md:py-24">
        <div className="container max-w-4xl">

          {/* ── クライアント情報 + タグ ── */}
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-semibold text-foreground">{work.clientName}</span>
              <span className="text-xs text-muted-foreground">{work.clientSize}</span>
              <span className="text-xs text-muted-foreground">{work.publishDate}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium bg-navy/10 text-navy rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* ── サマリーカード ── */}
          <AnimatedSection>
            <div className="bg-secondary border border-border rounded-sm p-6 md:p-8 mb-12">
              <div className="grid md:grid-cols-2 gap-6 mb-6">

                {/* 左: 課題 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-navy" />
                    <h3 className="text-sm font-bold text-foreground">課題</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {work.challenges.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs text-muted-foreground leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-navy"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 右: 成果 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-navy" />
                    <h3 className="text-sm font-bold text-foreground">成果</h3>
                  </div>
                  <div className="mb-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      定量
                    </p>
                    <ul className="space-y-1">
                      {work.results.quantitative.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-foreground font-medium leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-navy"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      定性
                    </p>
                    <ul className="space-y-1">
                      {work.results.qualitative.map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground leading-relaxed pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-navy"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* 支援期間 */}
              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <Clock className="w-4 h-4 text-navy" />
                <span className="text-xs font-medium text-foreground">お取り組み期間：</span>
                <span className="text-xs text-muted-foreground">{work.period}</span>
              </div>
            </div>
          </AnimatedSection>

          {/* ── 目次 ── */}
          <AnimatedSection>
            <div className="bg-white border border-border rounded-sm p-5 mb-12">
              <div className="flex items-center gap-2 mb-3">
                <List className="w-4 h-4 text-navy" />
                <h3 className="text-sm font-bold text-foreground">目次</h3>
              </div>
              <ol className="space-y-2">
                {TOC_ITEMS.map(({ id, label }, i) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="text-sm text-navy hover:underline"
                    >
                      {i + 1}. {label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </AnimatedSection>

          {/* ── 本文セクション群 ── */}
          <div className="space-y-12">

            {/* 背景 */}
            <AnimatedSection>
              <section id="background">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                  背景
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.9]">{work.background}</p>
              </section>
            </AnimatedSection>

            {/* 課題 */}
            <AnimatedSection>
              <section id="challenges">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                  課題
                </h2>
                <ul className="space-y-3">
                  {work.challenges.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-navy/10 text-navy text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </AnimatedSection>

            {/* 施策 */}
            <AnimatedSection>
              <section id="approach">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                  施策
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.9]">{work.approach}</p>
              </section>
            </AnimatedSection>

            {/* プロセス */}
            <AnimatedSection>
              <section id="process">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                  プロセス
                </h2>
                <div className="space-y-4">
                  {work.process.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="w-8 h-8 bg-navy text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        {i < work.process.length - 1 && (
                          <div className="w-px flex-1 bg-border mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h3 className="text-sm font-bold text-foreground mb-1">{step.phase}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* 成果 */}
            <AnimatedSection>
              <section id="results">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                  成果
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-navy/5 rounded-sm p-5">
                    <h3 className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
                      定量的な成果
                    </h3>
                    <ul className="space-y-2">
                      {work.results.quantitative.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-foreground font-medium leading-relaxed pl-3 relative before:content-['✓'] before:absolute before:left-0 before:text-navy"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-secondary rounded-sm p-5">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      定性的な成果
                    </h3>
                    <ul className="space-y-2">
                      {work.results.qualitative.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground leading-relaxed pl-3 relative before:content-['✓'] before:absolute before:left-0 before:text-navy"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </AnimatedSection>

            {/* 今後の展望 */}
            <AnimatedSection>
              <section id="outlook">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                  今後の展望
                </h2>
                <p className="text-sm text-muted-foreground leading-[1.9]">{work.outlook}</p>
              </section>
            </AnimatedSection>
          </div>

          {/* ── CTA ── */}
          <AnimatedSection>
            <div className="mt-16 bg-navy rounded-sm p-8 text-center">
              <h3 className="text-lg font-bold text-white mb-2">同じような課題をお持ちですか？</h3>
              <p className="text-sm text-white/70 mb-6">
                まずはお気軽にご相談ください。貴社の状況に合わせた最適なプランをご提案します。
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors"
                >
                  無料で相談する
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/download"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-medium rounded-sm hover:bg-white/10 transition-colors"
                >
                  サービス資料を見る
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* ── 一覧へ戻る ── */}
          <div className="mt-10 text-center">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline"
            >
              実績一覧へ戻る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* ── 関連実績 ── */}
      {relatedWorks.length > 0 && (
        <RelatedCards
          label="Related Works"
          title="関連する支援実績"
          items={relatedWorks.map((w) => ({
            href: `/works/${w.slug}`,
            image: w.image,
            title: w.title,
            tags: w.tags,
            meta: w.clientName,
          }))}
          backLink={{ href: "/works", label: "すべての実績を見る" }}
        />
      )}

      <CTASection />
    </Layout>
  );
}
