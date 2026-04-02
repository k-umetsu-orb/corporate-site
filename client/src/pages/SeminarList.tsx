/*
 * Design: Swiss Precision
 * セミナー一覧 /seminar — Coming Soon
 */
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";

export default function SeminarList() {
  useSEO({
    title: "セミナー",
    description: "会計事務所向けの営業・採用に関するセミナー情報。無料で参加いただけます。",
    path: "/seminar",
  });

  return (
    <Layout>
      <PageHero
        label="Seminars"
        title="セミナー"
        breadcrumbs={[{ label: "セミナー" }]}
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
                セミナー情報は現在準備中です。<br />
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
