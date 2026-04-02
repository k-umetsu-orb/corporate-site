/*
 * Design: Swiss Precision
 * 404ページ
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="py-32 md:py-48">
        <div className="container text-center">
          <p className="font-display text-8xl md:text-9xl font-bold text-navy/10">404</p>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            ページが見つかりません
          </h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            お探しのページは移動または削除された可能性があります。
            URLをご確認の上、再度お試しください。
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-sm hover:bg-navy-light transition-colors"
          >
            トップページに戻る
          </Link>
        </div>
      </section>
    </Layout>
  );
}
