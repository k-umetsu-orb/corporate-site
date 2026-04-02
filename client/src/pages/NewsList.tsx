/*
 * Design: Swiss Precision
 * お知らせ一覧 /news
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";
import { newsItems } from "@/lib/data";

export default function NewsList() {
  useSEO({
    title: "お知らせ",
    description: "orbからのお知らせ。セミナー情報、メディア掲載、プレスリリースなどをお届けします。",
    path: "/news",
  });

  return (
    <Layout>
      <PageHero
        label="News"
        title="お知らせ"
        breadcrumbs={[{ label: "お知らせ" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <AnimatedSection>
            {newsItems.length === 0 ? (
              <div className="max-w-lg mx-auto text-center py-16">
                <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-navy mb-4">
                  Coming Soon
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                  準備中です
                </h2>
                <div className="h-px w-12 bg-navy mx-auto mb-6" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  お知らせは現在準備中です。<br />
                  公開までしばらくお待ちください。
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {newsItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/news/${item.id}`}
                      className="group flex items-start justify-between gap-6 py-6 hover:text-navy transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <time className="text-xs text-muted-foreground font-display shrink-0">
                            {item.date}
                          </time>
                          <span className="px-2 py-0.5 text-xs font-medium bg-navy/10 text-navy rounded-sm shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground group-hover:text-navy transition-colors leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-navy transition-colors shrink-0 mt-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </AnimatedSection>
        </div>
      </section>

      <CTASection variant="compact" />
    </Layout>
  );
}
