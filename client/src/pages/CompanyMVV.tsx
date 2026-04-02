/*
 * Design: Swiss Precision
 * MVV（ミッション・ビジョン・バリュー）ページ
 */
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";

const values = [
  {
    title: "Client First",
    subtitle: "顧客起点",
    description: "すべての判断基準は「クライアントの成果につながるか」。目先の売上ではなく、クライアントの長期的な成功にコミットします。",
  },
  {
    title: "Systematic Approach",
    subtitle: "仕組みで解く",
    description: "属人的な成功を、再現可能な仕組みに変える。個人の能力に依存しない、組織として成果を出し続けるための基盤を構築します。",
  },
  {
    title: "Deep Expertise",
    subtitle: "深い専門性",
    description: "会計業界を深く理解しているからこそ、本質的な課題を見抜き、実効性の高いソリューションを提供できます。",
  },
  {
    title: "Hands-on Partnership",
    subtitle: "伴走する覚悟",
    description: "戦略を描くだけでは終わりません。クライアントと同じ目線で、泥臭く、粘り強く、成果が出るまで伴走し続けます。",
  },
];

export default function CompanyMVV() {
  useSEO({
    title: "MVV（ミッション・ビジョン・バリュー）",
    description: "orb RESOURCE&TECHのMission・Vision・Value。会計事務所の可能性を仕組みで最大化することをミッションに掲げています。",
    path: "/company/mvv",
  });

  return (
    <Layout>
      <PageHero
        label="MVV"
        title="ミッション・ビジョン・バリュー"
        breadcrumbs={[
          { label: "会社概要", href: "/company" },
          { label: "MVV" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-4xl">

          {/* Mission */}
          <AnimatedSection>
            <div className="mb-20">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Mission
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
                会計事務所の可能性を<br />
                <span className="text-navy">仕組みで最大化する</span>
              </h2>
              <div className="h-px w-12 bg-navy mb-6" />
              <p className="text-sm md:text-base text-muted-foreground leading-[1.9] max-w-2xl">
                私たちは、会計事務所が本来持つ専門性と価値を、より多くの人に届けるための「仕組みづくり」を支援しています。
                紹介に依存しない営業の仕組み、会計事務所に特化した採用の仕組み、そして業務変革を支えるAXの仕組み。3つの仕組みを通じて、会計事務所の持続的な成長を実現します。
              </p>
            </div>
          </AnimatedSection>

          {/* Vision */}
          <AnimatedSection>
            <div className="mb-20">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Vision
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
                会計業界の「当たり前」を<br />
                <span className="text-navy">アップデートする</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-[1.9] max-w-2xl">
                「紹介がなければ仕事が来ない」「採用は縁と運次第」——そんな業界の常識を、仕組みの力で変えていきます。
                私たちが目指すのは、どの会計事務所も、その専門性に見合った成長を実現できる世界です。
              </p>
            </div>
          </AnimatedSection>

          {/* Values */}
          <AnimatedSection>
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Values
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10">
                私たちが<span className="text-navy">大切にする価値観</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {values.map((v, i) => (
                  <div key={i} className="bg-secondary border border-border rounded-sm p-6">
                    <p className="font-display text-xs font-semibold tracking-[0.15em] uppercase text-navy mb-1">
                      {v.title}
                    </p>
                    <h3 className="text-lg font-bold text-foreground mb-3">
                      {v.subtitle}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
