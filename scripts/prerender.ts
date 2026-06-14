import fs from "node:fs";
import path from "node:path";
import { run } from "react-snap";
import { newsItems, works, seminars, downloads } from "../client/src/lib/data";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST_PUBLIC = path.join(ROOT, "dist", "public");
const INDEX_HTML = path.join(DIST_PUBLIC, "index.html");
const SHELL_HTML = path.join(DIST_PUBLIC, "200.html");

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf-8"));
const staticRoutes: string[] = pkg.reactSnap.routes;

const dynamicRoutes = [
  ...newsItems.map((item) => `/news/${item.id}`),
  ...works.map((item) => `/works/${item.slug}`),
  ...seminars.map((item) => `/seminar/${item.id}`),
  ...downloads.map((item) => `/download/${item.slug}`),
];

const routes = [...staticRoutes, ...dynamicRoutes];

try {
  // react-snap が source/index.html を 200.html として退避してからクロールする
  // (Express の catch-all は 200.html を 404 等のフォールバックに使う)
  await run({
    source: "dist/public",
    destination: "dist/public",
    include: routes,
    crawl: false,
    minifyHtml: false,
    puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log(`[prerender] done: ${routes.length} routes prerendered`);
} catch (err) {
  console.warn("[prerender] react-snap failed, falling back to CSR-only build:", err);
  // 200.html 未作成（バリデーション等で早期失敗）の場合のみ、index.html から補完する
  if (!fs.existsSync(SHELL_HTML)) {
    fs.copyFileSync(INDEX_HTML, SHELL_HTML);
  }
}

// react-snap が起動するローカルサーバーが crawl 失敗時にも close されず
// プロセスが終了しないため、明示的に終了する
process.exit(0);
