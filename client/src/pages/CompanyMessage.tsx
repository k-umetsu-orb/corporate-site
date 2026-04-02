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
                    会計事務所は、中小企業の経営を長年にわたって支えてきた、社会的に非常に重要な存在です。 
                    しかし、その多くが「新規顧客の大半は紹介」「採用がうまくいかない」という 構造的な課題を長年抱えていることも、また事実です。
                  </p>
                  <p>
                    私がこの領域に向き合うようになった原点は、これまで取り組んできた事業立ち上げや組織づくりの経験にあります。
                    事業を伸ばすことと、組織を育てること。
                    その両方に向き合う中で強く実感したのは、<b>どれほど高い専門性や想いがあっても、それを支える仕組みがなければ、持続的な成長にはつながらない</b>ということでした。
                  </p>
                  <p>
                    会計事務所の支援に携わる中でも、その課題は非常に鮮明でした。
                    高い専門性と誠実さを持ちながらも、営業や採用、育成、業務改善が個人の経験や努力に依存しており、組織として再現性を持てずにいる。
                    だからこそ必要なのは、場当たり的な施策ではなく、現場に根づき、継続的に機能する仕組みです。
                  </p>
                  <p>
                    <b>私たちが大切にしているのは、「再現性のある仕組みをつくること」です。</b>
                    担当者の個人技に依存せず、誰でも動かせる営業の仕組みを設計し、
                    また会計事務所に特化した人材紹介を通じて最適な人材をご紹介することで、
                    クライアントの組織に根付かせるまで伴走する。
                    そのプロセスに、私たちは誠実であり続けたいと思っています。
                  </p>
                  <p>
                    <b>会計事務所が本来の専門性に集中できる環境をつくること。
                    選ばれ続け、人が集まる事務所をともに実現すること。
                    その先に、業界全体の底上げがあると信じています。</b>
                  </p>
                  <p>
                    まだ道半ばではありますが、一社でも多くの会計事務所の成長に
                    貢献できるよう、これからも走り続けます。
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
