/*
 * Design: Swiss Precision
 * フッター — ダークネイビー背景、4カラム構成、コピーライト
 */
import { Link } from "wouter";
import { SITE_NAME, LOGO_URL } from "@/lib/data";

const footerLinks = [
  {
    links: [
      { label: "サービス一覧", href: "/service" },
      { label: "営業支援", href: "/service/sales-support" },
      { label: "人材紹介", href: "/service/recruitment-support" },
      { label: "AX支援", href: "/service/ai-transformation-support" },
    ],
  },
  {
    links: [
      { label: "支援実績", href: "/works" },
      { label: "セミナー", href: "/seminar" },
      { label: "資料ダウンロード", href: "/download" },
      { label: "お知らせ", href: "/news" },
    ],
  },
  {
    links: [
      { label: "会社概要", href: "/company" },
      { label: "代表メッセージ", href: "/company/message" },
      { label: "お問い合わせ", href: "/contact" },
      { label: "プライバシーポリシー", href: "/privacy-policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {footerLinks.map((col, i) => (
            <div key={i}>
              <div className="mb-4" />
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo — 余白トリミング: overflow-hidden で中央部分のみ表示 */}
          <Link href="/" className="flex items-center overflow-hidden h-14">
            <img
              src={LOGO_URL}
              alt={SITE_NAME}
              className="h-[280%] w-auto object-contain brightness-0 invert opacity-70"
            />
          </Link>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} orb inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
