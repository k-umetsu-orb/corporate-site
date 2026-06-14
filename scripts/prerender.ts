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

// react-snap は run() 内部で index.html -> 200.html を非同期(stream)コピーするが、
// その完了を待たない。crawl が早期に失敗/終了すると、コピー完了前に
// process.exit() してしまい 200.html が空ファイルのまま残ることがある
// (Express の catch-all は 200.html を読むため、空だと全ページが空になる)。
// そのため、ビルド前のシェル内容を同期的に保存しておき、最後に確実に書き込む。
const shellContent = fs.readFileSync(INDEX_HTML, "utf-8");

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
}

// 200.html を確実にビルド前のシェル内容で上書きする（上記の非同期コピー漏れ対策）
fs.writeFileSync(SHELL_HTML, shellContent);

// react-snap は pageerror 等で shuttingDown になると、以降のルートを
// 「ファイル書き込みなしでスキップ」したり、レンダリング前の空シェルのまま
// 書き出したりすることがある。express.static がその壊れたファイルを
// そのまま返してしまい、catch-all (getPageMeta によるページ別meta注入) を
// バイパスしてしまうため、ビルド後に各ルートの出力を検証し、
// 「空」または「シェルと同一（未レンダリング）」なら削除して
// catch-all へのフォールバックに委ねる。

for (const route of routes) {
  const outPath =
    route === "/"
      ? INDEX_HTML
      : path.join(DIST_PUBLIC, route, "index.html");

  if (!fs.existsSync(outPath)) {
    console.log(`[prerender] ${route}: (no file) -> fallback to catch-all`);
    continue;
  }

  const content = fs.readFileSync(outPath, "utf-8");
  const isValid = content.length > 0 && content !== shellContent;

  if (isValid) {
    console.log(`[prerender] ${route}: ${content.length} bytes (ok)`);
    continue;
  }

  console.warn(`[prerender] ${route}: ${content.length} bytes (invalid, removing) -> fallback to catch-all`);
  fs.rmSync(outPath, { force: true });
  if (route !== "/") {
    const dir = path.dirname(outPath);
    if (fs.existsSync(dir) && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  }
}

// react-snap が起動するローカルサーバーが crawl 失敗時にも close されず
// プロセスが終了しないため、明示的に終了する
process.exit(0);
