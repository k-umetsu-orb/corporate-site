/*
 * Design: Swiss Precision
 * サービスカテゴリ一覧ページ — 画像なし・リッチカードデザイン
 */
import { useParams, Link } from "wouter";
import { ArrowRight, TrendingUp, Users, CheckCircle2, Cpu, UserPlus, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { services, serviceCategories } from "@/lib/data";
import { useSEO } from "@/hooks/useSEO";
import NotFound from "./NotFound";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return <div ref={ref} className={`fade-in-up ${isVisible ? "visible" : ""} ${className}`}>{children}</div>;
}

const serviceIcons: Record<string, React.ElementType> = {
  "accounting-firm/sales-support": TrendingUp,
  "accounting-firm/recruitment-support": Users,
  "accounting-firm/ai-transformation-support": Cpu,
  "organizational-consulting/recruitment-support": UserPlus,
  "organizational-consulting/organizational-support": Building2,
};

export default function ServiceCategoryList() {
  const { category } = useParams<{ category: string }>();
  const categoryData = serviceCategories.find((c) => c.slug === category);
  const categoryServices = services.filter((s) => s.category === category);

  useSEO({
    title: categoryData ? categoryData.title : "サービス",
    description: categoryData ? categoryData.seoDescription : "",
    path: `/service/${category}`,
  });

  if (!categoryData) return <NotFound />;

  return (
    <Layout>
      <PageHero
        label={categoryData.titleEn}
        title={categoryData.title}
        breadcrumbs={[
          { label: "サービス一覧", href: "/service" },
          { label: categoryData.title },
        ]}
      />

      {/* イントロ */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-3xl mb-16 md:mb-20">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {categoryData.intro}
              </p>
            </div>
          </AnimatedSection>

          {/* サービスカード */}
          <div className="space-y-20">
            {categoryServices.map((service, i) => {
              const Icon = serviceIcons[`${service.category}/${service.slug}`] || TrendingUp;
              const num = String(i + 1).padStart(2, "0");
              return (
                <AnimatedSection key={service.slug}>
                  <div className="relative border border-border rounded-sm bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    {/* 装飾背景 */}
                    <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-bl from-navy/[0.03] to-transparent rounded-bl-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-navy/[0.02] to-transparent rounded-tr-full pointer-events-none" />

                    <div className="relative p-8 md:p-12 lg:p-16">
                      {/* ヘッダー: 番号 + アイコン + タイトル */}
                      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10 mb-8">
                        <div className="flex items-center gap-5">
                          <span className="text-6xl md:text-7xl font-display font-bold text-navy/[0.07] leading-none select-none">
                            {num}
                          </span>
                          <div className="w-16 h-16 rounded-full bg-navy/[0.06] flex items-center justify-center group-hover:bg-navy/[0.10] transition-colors">
                            <Icon className="w-7 h-7 text-navy" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                            {service.titleEn}
                          </p>
                          <h2 className="mt-1 text-3xl md:text-4xl font-bold tracking-tight text-foreground group-hover:text-navy transition-colors">
                            {service.title}
                          </h2>
                          <div className="mt-3 h-px w-12 bg-navy" />
                        </div>
                      </div>

                      {/* キャッチコピー + 説明 */}
                      <div className="grid md:grid-cols-[1fr_1fr] gap-8 md:gap-12 mb-10">
                        <div>
                          <p className="text-lg md:text-xl font-bold text-navy leading-relaxed">
                            {service.catchphrase}
                          </p>
                          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <div>
                          {/* こんな課題を解決 */}
                          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
                            Challenges
                          </p>
                          <ul className="space-y-2.5">
                            {service.challenges.map((challenge, ci) => (
                              <li key={ci} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-navy/50 mt-0.5 shrink-0" />
                                <span className="text-sm text-foreground/80 leading-relaxed">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                          {service.subcopy}
                        </p>
                        <Link
                          href={`/service/${service.category}/${service.slug}`}
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

      {/* 共通の強み */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                Why Choose Us
              </p>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                orbが選ばれる理由
              </h2>
              <div className="mt-4 h-px w-12 bg-navy mx-auto" />
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {categoryData.whyChooseUs.map((item, i) => (
              <AnimatedSection key={item.title}>
                <div className="bg-white border border-border rounded-sm p-8 h-full hover:shadow-lg hover:border-navy/15 transition-all duration-300">
                  <span className="text-4xl font-display font-bold text-navy/[0.08] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <div className="mt-2 h-px w-8 bg-navy/30" />
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="compact" />
    </Layout>
  );
}
