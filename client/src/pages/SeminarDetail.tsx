/*
 * Design: Swiss Precision
 * セミナー詳細 /seminar/[id] — 概要→内容→おすすめ→特典→基本情報→登壇者→申込フォーム→別セミナー
 * UI参照: MFセミナー詳細（完全コピー禁止、UIパターンのみ参考）
 */
import { useMemo } from "react";
import { useParams, Link } from "wouter";
import { Calendar, Clock, MapPin, Users, ArrowRight, Gift, Star } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import LeadForm from "@/components/LeadForm";
import RelatedCards from "@/components/RelatedCards";
import { useSEO } from "@/hooks/useSEO";
import StructuredData, { breadcrumbSchema } from "@/components/StructuredData";
import { seminars } from "@/lib/data";
import NotFound from "./NotFound";

export default function SeminarDetail() {
  const { id } = useParams<{ id: string }>();
  const seminar = seminars.find((s) => s.id === id);

  useSEO({
    title: seminar ? `${seminar.title} | セミナー` : "セミナー詳細",
    description: seminar ? seminar.description.slice(0, 120) : "",
    path: `/seminar/${id}`,
  });

  // 別セミナー（自身を除く最大3件）
  const otherSeminars = useMemo(() => {
    if (!seminar) return [];
    return seminars
      .filter((s) => s.id !== seminar.id)
      .slice(0, 3);
  }, [seminar]);

  if (!seminar) return <NotFound />;

  const isUpcoming = seminar.status === "upcoming";

  return (
    <Layout>
      <StructuredData
        data={breadcrumbSchema([
          { name: "ホーム", url: "https://xxxx.co.jp/" },
          { name: "セミナー", url: "https://xxxx.co.jp/seminar" },
          { name: seminar.title, url: `https://xxxx.co.jp/seminar/${seminar.id}` },
        ])}
      />

      <PageHero
        label="Seminar"
        title={seminar.title}
        breadcrumbs={[
          { label: "セミナー", href: "/seminar" },
          { label: seminar.title },
        ]}
      />

      <article className="py-12 md:py-20">
        <div className="container max-w-4xl">
          {/* ファーストビュー：日程・形式 + 申込アンカー */}
          <AnimatedSection>
            <div className="bg-secondary border border-border rounded-sm p-6 mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {isUpcoming ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-600 text-white text-[10px] font-semibold rounded-sm">
                    受付中
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-500 text-white text-[10px] font-semibold rounded-sm">
                    開催済み
                  </span>
                )}
                {seminar.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-medium bg-navy/10 text-navy rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">開催日</p>
                    <p className="text-sm font-medium text-foreground">{seminar.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">時間</p>
                    <p className="text-sm font-medium text-foreground">{seminar.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">形式</p>
                    <p className="text-sm font-medium text-foreground">
                      {seminar.format.includes("オンライン") ? "オンライン" : "オフライン"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-navy shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">定員</p>
                    <p className="text-sm font-medium text-foreground">{seminar.capacity}</p>
                  </div>
                </div>
              </div>

              {isUpcoming && (
                <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-xs text-red-600 font-medium">
                    申込締切：{seminar.deadline}
                  </p>
                  <a
                    href="#apply-form"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors"
                  >
                    申し込む
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* 1) セミナー概要 */}
          <AnimatedSection>
            <section className="mb-10">
              <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                セミナー概要
              </h2>
              <p className="text-sm text-muted-foreground leading-[1.9]">
                {seminar.description}
              </p>
            </section>
          </AnimatedSection>

          {/* 2) セミナー内容 */}
          <AnimatedSection>
            <section className="mb-10">
              <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                セミナー内容
              </h2>
              <ul className="space-y-2.5">
                {seminar.contents.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-navy/10 text-navy text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          </AnimatedSection>

          {/* 3) こんな方におすすめ */}
          <AnimatedSection>
            <section className="mb-10">
              <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                こんな方におすすめ
              </h2>
              <ul className="space-y-2">
                {seminar.targetAudience.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-navy rounded-full mt-2 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          </AnimatedSection>

          {/* 4) 参加者特典 */}
          <AnimatedSection>
            <section className="mb-10">
              <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                参加者特典
              </h2>
              {seminar.benefits.length > 0 ? (
                <div className="bg-amber-50 border border-amber-200 rounded-sm p-5">
                  <ul className="space-y-2">
                    {seminar.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <Gift className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  今回のセミナーでは特典のご用意はございません。
                </p>
              )}
            </section>
          </AnimatedSection>

          {/* 5) 基本情報（表形式） */}
          <AnimatedSection>
            <section className="mb-10">
              <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                基本情報
              </h2>
              <div className="border border-border rounded-sm overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {seminar.basicInfo.map((info, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-secondary"}>
                        <th className="text-left px-4 py-3 font-medium text-foreground w-1/3 border-r border-border">
                          {info.label}
                        </th>
                        <td className="px-4 py-3 text-muted-foreground">
                          {info.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </AnimatedSection>

          {/* 6) 登壇者情報 */}
          <AnimatedSection>
            <section className="mb-10">
              <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                登壇者
              </h2>
              <div className="flex items-start gap-5 bg-secondary rounded-sm p-5">
                {seminar.speaker.image ? (
                  <img
                    src={seminar.speaker.image}
                    alt={seminar.speaker.name}
                    className="w-20 h-20 rounded-full object-cover shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                    <Star className="w-8 h-8 text-navy/30" />
                  </div>
                )}
                <div>
                  <p className="text-base font-bold text-foreground">{seminar.speaker.name}</p>
                  <p className="text-xs text-navy font-medium mt-0.5">{seminar.speaker.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {seminar.speaker.bio}
                  </p>
                </div>
              </div>
            </section>
          </AnimatedSection>

          {/* 7) 申し込みフォーム */}
          {isUpcoming && (
            <AnimatedSection>
              <section id="apply-form" className="mb-10 scroll-mt-24">
                <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b-2 border-navy">
                  お申し込み
                </h2>
                <LeadForm variant="seminar" itemTitle={seminar.title} />
              </section>
            </AnimatedSection>
          )}

          {/* 開催済みの場合のCTA */}
          {!isUpcoming && (
            <AnimatedSection>
              <div className="bg-secondary border border-border rounded-sm p-8 text-center mb-10">
                <p className="text-sm text-muted-foreground mb-4">
                  このセミナーは終了しました。今後のセミナー情報は一覧ページでご確認ください。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/seminar"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors"
                  >
                    セミナー一覧を見る
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-navy text-navy text-sm font-medium rounded-sm hover:bg-navy/5 transition-colors"
                  >
                    無料で相談する
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* 下部CTA */}
          {isUpcoming && (
            <AnimatedSection>
              <div className="bg-navy rounded-sm p-8 text-center mb-10">
                <h3 className="text-lg font-bold text-white mb-2">
                  このセミナーに参加しませんか？
                </h3>
                <p className="text-sm text-white/70 mb-5">
                  参加費無料・{seminar.format.includes("オンライン") ? "オンライン開催" : "会場開催"}
                </p>
                <a
                  href="#apply-form"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-navy text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors"
                >
                  申し込む
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          )}

          {/* 一覧へ戻る */}
          <div className="text-center">
            <Link
              href="/seminar"
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline"
            >
              セミナー一覧へ戻る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* 8) 別セミナーへのリンク */}
      {otherSeminars.length > 0 && (
        <RelatedCards
          label="Other Seminars"
          title="その他のセミナー"
          items={otherSeminars.map((s) => ({
            href: `/seminar/${s.id}`,
            image: s.image,
            title: s.title,
            tags: s.tags,
            meta: `${s.date} ${s.time}`,
          }))}
          backLink={{ href: "/seminar", label: "すべてのセミナーを見る" }}
        />
      )}

      <CTASection />
    </Layout>
  );
}
