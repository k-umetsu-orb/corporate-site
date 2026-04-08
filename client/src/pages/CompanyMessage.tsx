/*
 * Design: Swiss Precision
 * 代表メッセージページ
 * レイアウト参考: ibj.co.jp/company/message.html
 * 構成: PageHero → 2カラム（左=写真 sticky / 右=メッセージ本文） → CTA
 */
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useSEO } from "@/hooks/useSEO";

export default function CompanyMessage() {
  useSEO({
    title: "代表メッセージ",
    description: "orb株式会社代表からのメッセージ。会計事務所の成長を仕組みで支えるという想いをお伝えします。",
    path: "/company/message",
  });

  return (
    <Layout>
      <PageHero
        label="Message"
        title="代表メッセージ"
        breadcrumbs={[
          { label: "会社概要", href: "/company" },
          { label: "代表メッセージ" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-start">

            {/* ── 左: 写真（PCでは sticky） ── */}
              <div className="overflow-hidden rounded-sm shadow-md border border-border" style={{ aspectRatio: "2264 / 3007" }}>
                <img
                  src="/ceo-photo.jpg"
                  alt="代表取締役社長 檜森 大河"
                  className="w-full h-full object-cover object-top"
                />
              </div>

            {/* ── 右: メッセージ本文 ── */}
            <div className="space-y-10">

              {/* 見出し */}
              <AnimatedSection>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-navy mb-3">
                  Message
                </p>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-snug">
                  会計事務所の成長を<br />
                  <span className="text-navy">仕組みで支える</span>
                </h2>
                <div className="mt-4 h-px w-10 bg-navy" />
              </AnimatedSection>

              {/* 本文 */}
              <AnimatedSection>
                <div className="space-y-6 text-sm md:text-base text-muted-foreground leading-[1.9]">
                  <p>
                    会計事務所は中小企業の経営を支える重要な存在です。一方で、「顧客獲得が紹介に依存している」「採用が難しい」といった構造的な課題を抱えているのも事実です。
                  </p>
                  <p>
                    私自身、事業立ち上げや組織づくりに向き合う中で、1人の専門性や想いだけでは持続的な成長は実現できず、それを支える仕組みの重要性を強く実感してきました。会計事務所の現場でも同様に個人の力に依存し、組織として再現性を持てずにいるケースが多く見られます。
                  </p>
                  <p>
                    だからこそ私たちは、「再現性のある仕組みづくり」にこだわっています。個人の力に頼らず機能する体制を構築し、組織に根づく支援を行う。その一つひとつに誠実に向き合い、伴走し続けます。
                  </p>
                  {/* <p>
                    その積み重ねが、業界全体の底上げと豊かな社会を実現し、人々がより働きやすく新しい機会を得られる環境づくりにつながると信じています。
                  </p> */}
                  <p>
                    これからも、一社でも多くの会計事務所の成長に貢献してまいります。
                  </p>
                </div>
              </AnimatedSection>

              {/* 署名 */}
              <AnimatedSection>
                <div className="pt-8 border-t border-border">
                  <p className="text-xs text-muted-foreground">orb株式会社</p>
                  <p className="text-xs text-muted-foreground mt-0.5">代表取締役社長</p>
                  <p className="mt-1.5 text-lg font-bold tracking-tight text-foreground">檜森 大河</p>
                </div>
              </AnimatedSection>

            </div>
          </div>
        </div>
      </section>

      <CTASection variant="compact" />
    </Layout>
  );
}
