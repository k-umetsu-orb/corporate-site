/*
 * Design: Swiss Precision
 * 下層ページ共通ヒーロー — 薄いグレー背景、英語ラベル + 日本語タイトル
 */
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label: string;
  title: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHero({ label, title, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-secondary py-14 md:py-20">
      <div className="container">
        <p className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
          {label}
        </p>
        <h1 className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        <div className="mt-3 h-px w-10 bg-navy" />
        <nav className="mt-4 flex items-center gap-1 text-xs text-muted-foreground" aria-label="パンくずリスト">
          <Link href="/" className="hover:text-navy transition-colors">
            ホーム
          </Link>
          {breadcrumbs.map((bc, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3" />
              {bc.href ? (
                <Link href={bc.href} className="hover:text-navy transition-colors">
                  {bc.label}
                </Link>
              ) : (
                <span className="text-foreground/70">{bc.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
