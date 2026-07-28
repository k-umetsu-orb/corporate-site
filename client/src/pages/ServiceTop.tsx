/*
 * Design: Swiss Precision
 * サービス一覧トップページ — 2つのサービスカテゴリを紹介
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { services, serviceCategories } from "@/lib/data";
import { useSEO } from "@/hooks/useSEO";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return <div ref={ref} className={`fade-in-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
}

export default function ServiceTop() {
  useSEO({
    title: "サービス一覧",
    description: "orb株式会社が提供する会計事務所向け支援サービスと組織コンサルティングサービスの一覧です。営業支援・人材紹介・AX支援から、採用支援・組織支援まで、事業成長を支える専門コンサルティングをワンストップでご提供します。",
    path: "/service",
  });

  return (
    <Layout>
      <PageHero
        label="Services"
        title="サービス一覧"
        breadcrumbs={[{ label: "サービス一覧" }]}
      />

      {/* イントロ */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mb-16 md:mb-20">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                orbは、「会計事務所向けサービス」と「組織コンサルティングサービス」の2つの領域で、
                クライアントの持続的な成長を支援しています。業界特有の課題に特化した支援から、
                あらゆる企業の「人と組織」の課題解決まで、戦略から実行・定着まで一気通貫で伴走します。
              </p>
            </div>
          </AnimatedSection>

          {/* カテゴリカード */}
          <div className="space-y-10 md:space-y-12">
            {serviceCategories.map((category, i) => {
              const categoryServices = services.filter((s) => s.category === category.slug);
              const num = String(i + 1).padStart(2, "0");
              return (
                <AnimatedSection key={category.slug}>
                  <div className="relative border border-border rounded-sm bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-navy/[0.03] to-transparent rounded-bl-full pointer-events-none" />

                    <div className="relative p-8 md:p-12 lg:p-16">
                      <div className="flex items-start gap-6 md:gap-10 mb-6">
                        <span className="text-6xl md:text-7xl font-display font-bold text-navy/[0.07] leading-none select-none">
                          {num}
                        </span>
                        <div className="flex-1 pt-2">
                          <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                            {category.titleEn}
                          </p>
                          <Link href={`/service/${category.slug}`}>
                            <h2 className="mt-1 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-navy transition-colors">
                              {category.title}
                            </h2>
                          </Link>
                          <div className="mt-3 h-px w-12 bg-navy" />
                        </div>
                      </div>

                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mb-8">
                        {category.cardDescription}
                      </p>

                      {/* 含まれるサービス一覧 */}
                      <div className="flex flex-wrap gap-3 mb-10">
                        {categoryServices.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/service/${service.category}/${service.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-secondary text-foreground/80 rounded-sm hover:bg-navy hover:text-white transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-border flex items-center justify-end">
                        <Link
                          href={`/service/${category.slug}`}
                          className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors shrink-0"
                        >
                          詳しく見る
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection variant="compact" />
    </Layout>
  );
}
