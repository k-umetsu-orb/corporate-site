/*
 * Design: Swiss Precision
 * ヘッダー — 白背景、左ロゴ、右ナビ、スクロール時にシャドウ
 * モバイルはハンバーガーメニュー
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE_NAME, LOGO_URL } from "@/lib/data";

const navItems = [
  {
    label: "サービス",
    href: "/service",
    groups: [
      {
        label: "会計事務所向けサービス",
        href: "/service/accounting-firm",
        children: [
          { label: "営業支援", href: "/service/accounting-firm/sales-support" },
          { label: "人材紹介", href: "/service/accounting-firm/recruitment-support" },
          { label: "AX支援", href: "/service/accounting-firm/ai-transformation-support" },
        ],
      },
      {
        label: "組織コンサルティングサービス",
        href: "/service/organizational-consulting",
        children: [
          { label: "採用支援", href: "/service/organizational-consulting/recruitment-support" },
          { label: "組織支援", href: "/service/organizational-consulting/organizational-support" },
        ],
      },
    ],
  },
  { label: "実績", href: "/works" },
  { label: "セミナー", href: "/seminar" },
  { label: "資料ダウンロード", href: "/download" },
  { label: "お知らせ", href: "/news" },
  { label: "会社概要", href: "/company" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center shrink-0 h-14 md:h-16">
          <img
            src={LOGO_URL}
            alt={SITE_NAME}
            className="h-[53%] w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.groups && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-navy ${
                  location.startsWith(item.href) && item.href !== "/"
                    ? "text-navy"
                    : "text-foreground/80"
                }`}
              >
                {item.label}
                {item.groups && <ChevronDown className="w-3 h-3" />}
              </Link>
              {item.groups && openDropdown === item.href && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="bg-white rounded-md shadow-lg border border-border py-2 min-w-[240px]">
                    {item.groups.map((group, gi) => (
                      <div key={group.href} className={gi > 0 ? "mt-2 pt-2 border-t border-border" : ""}>
                        <Link
                          href={group.href}
                          className="block px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground hover:text-navy transition-colors"
                        >
                          {group.label}
                        </Link>
                        {group.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-navy transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="ml-4 px-5 py-2 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-light transition-colors"
          >
            お問い合わせ
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="メニュー"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="container py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-navy transition-colors"
                >
                  {item.label}
                </Link>
                {item.groups && (
                  <div className="pl-6 space-y-3 pb-2">
                    {item.groups.map((group) => (
                      <div key={group.href}>
                        <Link
                          href={group.href}
                          className="block px-3 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground hover:text-navy transition-colors"
                        >
                          {group.label}
                        </Link>
                        <div className="pl-3 space-y-1">
                          {group.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:text-navy transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3">
              <Link
                href="/contact"
                className="block text-center px-5 py-3 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-light transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
