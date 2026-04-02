/*
 * Design: Swiss Precision
 * サービス詳細ページ — LANY SEOコンサル参考パターン
 * 構成: Hero → 概要 → 課題 → 成果イメージ → 特長 → 支援内容(2層) → 導入の流れ → 成果物 → お客様の声 → 事例 → FAQ → セミナー → CTA
 */
import { useParams, Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  TrendingUp,
  Users,
  ClipboardCheck,
} from "lucide-react";
import { useMemo } from "react";
import Layout from "@/components/Layout";
import ServiceHeroSplit from "@/components/ServiceHeroSplit";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { services, works, seminars, downloads, type Service } from "@/lib/data";
import { useSEO } from "@/hooks/useSEO";
import StructuredData, { breadcrumbSchema } from "@/components/StructuredData";
import NotFound from "./NotFound";

/* ── Section icon map ── */
const scopeIcons = [TrendingUp, Users, ClipboardCheck];

/* ── Helper: related works for this service ── */
function getRelatedWorks(service: Service) {
  const areaMap: Record<string, string> = {
    "sales-support": "営業支援",
    "recruitment-support": "人材紹介",
  };
  const area = areaMap[service.slug];
  return works.filter((w) => w.area === area).slice(0, 3);
}

/* ── Helper: related seminars ── */
function getRelatedSeminars(service: Service) {
  const tagMap: Record<string, string> = {
    "sales-support": "営業支援",
    "recruitment-support": "人材紹介",
  };
  const tag = tagMap[service.slug];
  return seminars.filter((s) => s.tags.includes(tag)).slice(0, 2);
}

/* ── Helper: related downloads ── */
function getRelatedDownloads(service: Service) {
  const tagMap: Record<string, string> = {
    "sales-support": "営業支援",
    "recruitment-support": "人材紹介",
  };
  const tag = tagMap[service.slug];
  return downloads.filter((d) => d.tags.includes(tag)).slice(0, 3);
}

/* ══════════════════════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════════════════════ */
export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);

  const relatedWorks = useMemo(
    () => (service ? getRelatedWorks(service) : []),
    [service]
  );
  const relatedSeminars = useMemo(
    () => (service ? getRelatedSeminars(service) : []),
    [service]
  );
  const relatedDownloads = useMemo(
    () => (service ? getRelatedDownloads(service) : []),
    [service]
  );

  useSEO({
    title: service ? `${service.title} | サービス` : "サービス詳細",
    description: service ? service.description : "",
    path: `/service/${slug}`,
  });

  if (!service) return <NotFound />;

  const bcSchema = breadcrumbSchema([
    { name: "ホーム", url: "https://xxxx.co.jp/" },
    { name: "サービス一覧", url: "https://xxxx.co.jp/service" },
    { name: service.title, url: `https://xxxx.co.jp/service/${service.slug}` },
  ]);

  return (
    <Layout>
      <StructuredData data={bcSchema} />

      {/* ===== Hero + フォーム (2カラム) ===== */}
      <ServiceHeroSplit
        service={service}
        breadcrumbs={[
          { label: "サービス一覧", href: "/service" },
          { label: service.title },
        ]}
      />

      {/* ===== 2. こんな課題はありませんか？ ===== */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Challenges"
              title="こんな課題はありませんか？"
              align="center"
            />
          </AnimatedSection>
          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {service.challenges.map((c, i) => (
              <AnimatedSection key={i} delay={i * 80} className="h-full">
                <div className="flex items-center gap-3 p-5 bg-white rounded-sm border border-border hover:shadow-sm transition-shadow h-full">
                  <span className="flex-shrink-0 w-7 h-7 bg-navy/10 text-navy text-xs font-bold rounded-full flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/80 leading-relaxed">{c}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <p className="mt-10 text-center text-sm text-navy font-semibold">
              これらの課題を、私たちが「仕組み」で解決します。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 3. 成果イメージ (Before → After) ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Expected Results"
              title="期待できる成果イメージ"
              align="center"
              description="支援を通じて、以下のような成果を目指します。"
            />
          </AnimatedSection>
          <div className="mt-8 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {service.resultHighlights.map((r, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white border border-border rounded-sm p-6 text-center hover:shadow-md transition-shadow">
                  <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
                    {r.label}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div>
                      <p className="text-sm text-muted-foreground line-through">
                        {r.before}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-navy shrink-0" />
                    <div>
                      <p className="text-xl font-bold text-navy">{r.after}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              ※ 成果はクライアント様の状況により異なります。過去の支援実績に基づく参考値です。
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== 4. 選ばれる理由 ===== */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Why Choose Us"
              title={`${service.title}で選ばれる理由`}
              align="center"
            />
          </AnimatedSection>
          <div className="mt-8 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {service.features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="bg-white border border-border rounded-sm p-6 h-full hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <span className="font-display text-3xl font-bold text-navy/15 leading-none shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-base font-bold tracking-tight text-foreground">
                        {f.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. 支援内容 (2層構造) ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Service Scope"
              title="具体的な支援内容"
              description="貴社の課題に合わせて、以下の領域から最適な支援メニューを組み合わせてご提案します。"
            />
          </AnimatedSection>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {service.scopeCategories.map((cat, i) => {
              const Icon = scopeIcons[i % scopeIcons.length];
              return (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="bg-white border border-border rounded-sm p-6 h-full hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-navy/10 rounded-sm flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-navy" />
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-foreground">
                      {cat.category}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {cat.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {cat.tasks.map((task, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-navy shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/80 leading-relaxed">
                            {task}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 6. 導入の流れ (タイムラインステッパー) ===== */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Process"
              title="ご支援の流れ"
              description="初回のご相談から、仕組みの定着・自走化まで、一貫してサポートします。"
            />
          </AnimatedSection>
          <div className="mt-10 max-w-3xl mx-auto">
            {service.process.map((step, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="flex gap-5 md:gap-8 pb-8 last:pb-0">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 bg-navy text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-sm">
                      {step.step}
                    </div>
                    {i < service.process.length - 1 && (
                      <div className="w-px flex-1 bg-navy/20 mt-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pt-2 pb-4 flex-1">
                    <h3 className="text-base font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    {(step.deliverable || step.duration) && (
                      <div className="mt-3 flex flex-wrap gap-3">
                        {step.deliverable && (
                          <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-border rounded-sm px-2.5 py-1 text-foreground/70">
                            <FileText className="w-3 h-3" />
                            {step.deliverable}
                          </span>
                        )}
                        {step.duration && (
                          <span className="text-xs bg-navy/5 text-navy rounded-sm px-2.5 py-1">
                            {step.duration}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. 主な成果物 ===== */}
      <section className="py-20 md:py-28">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Deliverables"
              title="主な成果物"
              description="ご支援を通じて、以下のような成果物を納品いたします。"
            />
          </AnimatedSection>
          <div className="mt-8 flex flex-wrap gap-3 max-w-3xl">
            {service.deliverables.map((d, i) => (
              <AnimatedSection key={i} delay={i * 50}>
                <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-border rounded-sm text-foreground/80 hover:shadow-sm transition-shadow">
                  <FileText className="w-3.5 h-3.5 text-navy" />
                  {d}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. お客様の声 ===== */}
      {/* TODO: 実際のお客様の声が準備できたら以下のコメントアウトを解除する */}
      {/*
      <section className="py-20 md:py-28 bg-navy text-white">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              label="Voice"
              title="お客様の声"
              light
              align="center"
            />
          </AnimatedSection>
          <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {service.testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-sm p-6 h-full flex flex-col">
                  <Quote className="w-6 h-6 text-white/30 mb-3 shrink-0" />
                  <p className="text-sm text-white/90 leading-relaxed flex-1">
                    {t.comment}
                  </p>
                  <div className="mt-5 pt-4 border-t border-white/10">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/60 mt-0.5">
                      {t.company} / {t.role}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ===== 9. 導入事例 ===== */}
      {relatedWorks.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container">
            <AnimatedSection>
              <SectionHeading
                label="Case Studies"
                title="導入事例"
                description="同じ課題を抱えていたクライアント様の成功事例をご紹介します。"
              />
            </AnimatedSection>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedWorks.map((w, i) => (
                <AnimatedSection key={w.slug} delay={i * 100}>
                  <Link href={`/works/${w.slug}`} className="group block h-full">
                    <div className="bg-white border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="aspect-[3/2] overflow-hidden bg-muted">
                        <img
                          src={w.image}
                          alt={w.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {w.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-medium px-2 py-0.5 bg-secondary text-muted-foreground rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {w.clientName}
                        </p>
                        <h3 className="text-sm font-semibold text-foreground leading-relaxed line-clamp-2 group-hover:text-navy transition-colors flex-1">
                          {w.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection>
              <div className="mt-10 text-center">
                <Link
                  href="/works"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline"
                >
                  すべての事例を見る
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ===== 10. FAQ ===== */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container max-w-3xl">
          <AnimatedSection>
            <SectionHeading
              label="FAQ"
              title="よくあるご質問"
              align="center"
            />
          </AnimatedSection>
          <div className="mt-8 bg-white border border-border rounded-sm px-6">
            <Accordion type="single" collapsible className="w-full">
              {service.faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium text-foreground text-left py-5 hover:no-underline">
                    <span className="flex items-start gap-3">
                      <span className="text-navy font-bold shrink-0">Q.</span>
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-7">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ===== 11. 関連セミナー ===== */}
      {relatedSeminars.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="container">
            <AnimatedSection>
              <SectionHeading
                label="Seminars"
                title="関連セミナー"
                description={`${service.title}に関連する無料セミナーを開催しています。`}
              />
            </AnimatedSection>
            <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-4xl">
              {relatedSeminars.map((s, i) => (
                <AnimatedSection key={s.id} delay={i * 100}>
                  <Link href={`/seminar/${s.id}`} className="group block h-full">
                    <div className="bg-white border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="aspect-[3/2] overflow-hidden bg-muted">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {s.status === "upcoming" ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-navy text-white rounded-sm">
                              受付中
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-muted text-muted-foreground rounded-sm">
                              終了
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {s.date}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-foreground leading-relaxed line-clamp-2 group-hover:text-navy transition-colors flex-1">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection>
              <div className="mt-10">
                <Link
                  href="/seminar"
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline"
                >
                  すべてのセミナーを見る
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ===== 12. 関連資料ダウンロード ===== */}
      {relatedDownloads.length > 0 && (
        <section className="py-20 md:py-28 bg-secondary">
          <div className="container">
            <AnimatedSection>
              <SectionHeading
                label="Downloads"
                title="関連資料"
                description="サービスの詳細や活用事例をまとめた資料を無料でダウンロードいただけます。"
              />
            </AnimatedSection>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
              {relatedDownloads.map((d, i) => (
                <AnimatedSection key={d.slug} delay={i * 100}>
                  <Link
                    href={`/download/${d.slug}`}
                    className="group block h-full"
                  >
                    <div className="bg-white border border-border rounded-sm p-5 hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="w-10 h-10 bg-navy/10 rounded-sm flex items-center justify-center mb-3">
                        <FileText className="w-5 h-5 text-navy" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground leading-relaxed group-hover:text-navy transition-colors flex-1">
                        {d.title}
                      </h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {d.summary}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-navy">
                        無料ダウンロード
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== 13. CTA ===== */}
      <CTASection />
    </Layout>
  );
}
