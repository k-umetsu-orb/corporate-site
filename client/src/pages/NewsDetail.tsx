/*
 * Design: Swiss Precision
 * お知らせ詳細ページ
 */
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { newsItems } from "@/lib/data";
import { useSEO } from "@/hooks/useSEO";
import NotFound from "./NotFound";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return <div ref={ref} className={`fade-in-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const news = newsItems.find((n) => n.id === id);

  useSEO({
    title: news ? `${news.title} | お知らせ` : "お知らせ",
    description: news ? news.title : "",
    path: `/news/${id}`,
  });

  if (!news) return <NotFound />;

  return (
    <Layout>
      <PageHero
        label="News"
        title={news.title}
        breadcrumbs={[
          { label: "お知らせ", href: "/news" },
          { label: news.title },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-8">
              <time className="text-sm text-muted-foreground font-display">{news.date}</time>
              <span className="px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy rounded-sm">
                {news.category}
              </span>
            </div>
            <div className="prose prose-sm max-w-none">
              {news.content.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </AnimatedSection>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              お知らせ一覧に戻る
            </Link>
          </div>
        </div>
      </section>

      <CTASection variant="compact" />
    </Layout>
  );
}
