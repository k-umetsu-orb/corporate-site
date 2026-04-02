/*
 * Design: Swiss Precision
 * 関連コンテンツカード — 事例・セミナー兼用
 */
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

interface RelatedItem {
  href: string;
  image: string;
  title: string;
  tags: string[];
  meta?: string; // 日付やクライアント名など
}

interface RelatedCardsProps {
  label: string;
  title: string;
  items: RelatedItem[];
  backLink?: { href: string; label: string };
}

export default function RelatedCards({ label, title, items, backLink }: RelatedCardsProps) {
  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container">
        <SectionHeading label={label} title={title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Link key={i} href={item.href} className="group block">
              <div className="bg-white border border-border rounded-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="aspect-[3/2] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {item.meta && (
                    <p className="text-xs text-muted-foreground mb-2">{item.meta}</p>
                  )}
                  <h3 className="text-sm font-semibold text-foreground leading-relaxed mb-3 line-clamp-2 group-hover:text-navy transition-colors flex-1">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 bg-secondary text-muted-foreground rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {backLink && (
          <div className="mt-10 text-center">
            <Link
              href={backLink.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline"
            >
              {backLink.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
