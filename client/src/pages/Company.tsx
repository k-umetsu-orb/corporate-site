/*
 * Design: Swiss Precision
 * 会社概要ページ（MVV統合）
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";

const companyInfo = [
  { label: "会社名", value: "orb株式会社" },
  { label: "設立", value: "2024年8月" },
  { label: "代表者", value: "檜森 大河" },
  { label: "所在地", value: "〒108-0074 東京都港区高輪2丁目14-17グレイス高輪905" },
  { label: "事業内容", value: "会計事務所向け営業支援/人材紹介/AX支援" }
];

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

export default function Company() {
  useSEO({
    title: "会社概要",
    description: "orb株式会社の会社概要。会計事務所向けに営業支援・人材紹介を提供するコンサルティングファームです。",
    path: "/company",
  });

  return (
    <Layout>
      <PageHero
        label="Company"
        title="会社概要"
        breadcrumbs={[{ label: "会社概要" }]}
      />

      {/* ── MVV ── */}
      <section className="py-20 md:py-28">
        <div className="container">

          {/* Mission */}
          <AnimatedSection>
            <div className="mb-20">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Mission
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
                いい組織を増やし、<span className="text-navy">経済をまわす。</span>
              </h2>
              <div className="h-px w-12 bg-navy mb-6" />
              <p className="text-sm md:text-base text-muted-foreground leading-[1.9] max-w-2xl">
                私たちは、採用・育成、営業や業務変革の支援を通じて、企業が成長し続けられる土台を整え、働く人が力を発揮しやすい環境を作ることを目指しています。<br></br>
                企業が生み出した成果が、働く人の機会や働きやすさへとつながっていく。この好循環が広がり、より豊かな経済と社会がつくられると私たちは信じています。<br></br>
                「いい組織を増やし、経済をまわす。」その実現のために、私たちは仕組みの力で貢献していきます。
              </p>
              <div className="mt-6">
                <Link
                  href="/company/message"
                  className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:gap-2 transition-all"
                >
                  代表メッセージ <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Vision */}
          {/* <AnimatedSection>
            <div className="mb-20">
              <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                Vision
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
                会計業界の「当たり前」を<br />
                アップデートする
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-[1.9] max-w-2xl">
                「紹介がなければ仕事が来ない」「採用は縁と運次第」——そんな業界の常識を、仕組みの力で変えていきます。
                私たちが目指すのは、どの会計事務所も、その専門性に見合った成長を実現できる世界です。
              </p>
            </div>
          </AnimatedSection> */}

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

      {/* ── 会社情報テーブル ── */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <SectionHeading label="Company Info" title="会社情報" />
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-3xl">
              <table className="w-full">
                <tbody className="divide-y divide-border">
                  {companyInfo.map((row) => (
                    <tr key={row.label}>
                      <th className="py-4 pr-8 text-left text-sm font-medium text-foreground w-36 md:w-44 align-top">
                        {row.label}
                      </th>
                      <td className="py-4 text-sm text-muted-foreground">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <CTASection variant="compact" />
    </Layout>
  );
}
