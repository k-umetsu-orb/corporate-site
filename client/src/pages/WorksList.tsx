/*
 * Design: Swiss Precision
 * 事例一覧 /works — 絞り込みUI + カード一覧 + CTA
 * UI参照: LANY実績一覧（完全コピー禁止、UIパターンのみ参考）
 */
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";

export default function WorksList() {
  useSEO({
    title: "支援実績",
    description: "会計事務所向けの営業支援・人材紹介・AX支援の実績をご紹介します。",
    path: "/works",
  });
  return (
    <Layout>
      <PageHero
        label="Works"
        title="支援実績"
        breadcrumbs={[{ label: "支援実績" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <div className="max-w-lg mx-auto text-center py-16">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-navy mb-4">
                Coming Soon
              </p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
                準備中です
              </h2>
              <div className="h-px w-12 bg-navy mx-auto mb-6" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                支援実績は現在準備中です。<br />
                公開までしばらくお待ちください。
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
