import express from "express";
import { createServer } from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTIFY_TO = "no-reply@orb-inc.co.jp";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM ||
  "株式会社orb <no-reply@orb-inc.co.jp>";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: Array.isArray(to) ? to : [to],
    reply_to: replyTo,
    subject,
    html: `<pre style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; white-space: pre-wrap; line-height: 1.7;">${escapeHtml(
      text,
    )}</pre>`,
  });

  if (error) {
    throw error;
  }
}

async function sendInternalNotification({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  await sendEmail({
    to: NOTIFY_TO,
    subject,
    text,
    replyTo,
  });
}

async function sendAutoReply({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await sendEmail({
    to,
    subject,
    text,
  });
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── お問い合わせ送信 ──────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const { inquiryType, company, name, email, phone, message } =
      req.body as Record<string, string>;

    try {
      // 1通目: 社内通知
      await sendInternalNotification({
        subject: `【お問い合わせ】${inquiryType || "未入力"} - ${company || "未入力"}`,
        replyTo: email,
        text: [
          `【お問い合わせ種別】${inquiryType || "未入力"}`,
          `【法人名/事務所名】${company || "未入力"}`,
          `【お名前】${name || "未入力"}`,
          `【メールアドレス】${email || "未入力"}`,
          `【電話番号】${phone || "未入力"}`,
          "",
          "【お問い合わせ内容】",
          message || "未入力",
        ].join("\n"),
      });

      // 2通目: お客さんへの自動返信
      if (email) {
        await sendAutoReply({
          to: email,
          subject: "【自動返信】お問い合わせありがとうございます",
          text: [
            `${name+" "+"様" || "お客様"}`,
            "",
            "このたびはお問い合わせいただきありがとうございます。",
            "以下の内容で受け付けいたしました。",
            "",
            `【お問い合わせ種別】${inquiryType || "未入力"}`,
            `【法人名/事務所名】${company || "未入力"}`,
            `【お名前】${name || "未入力"}`,
            `【メールアドレス】${email || "未入力"}`,
            `【電話番号】${phone || "未入力"}`,
            "",
            "【お問い合わせ内容】",
            message || "未入力",
            "",
            "内容を確認のうえ、担当者よりご連絡いたします。",
            "しばらくお待ちください。",
            "",
            "※本メールは自動送信です。",
            "",
            "□■━━━━━━━━━━━━━━━━━━━━━━━",
            "株式会社orb",
            "〒108-0074",
            "東京都港区高輪2丁目14-17グレイス高輪905",
            "https://orb-inc.co.jp/",
            "□■━━━━━━━━━━━━━━━━━━━━━━━"
          ].join("\n"),
        });
      }

      res.json({ ok: true });
    } catch (err) {
      console.error("contact mail error:", err);
      res.status(500).json({ ok: false, error: "メール送信に失敗しました" });
    }
  });

  // ── 資料ダウンロード / セミナー申し込み送信 ──────
  app.post("/api/lead", async (req, res) => {
    const {
      variant,
      itemTitle,
      company,
      lastName,
      firstName,
      phone,
      email,
      position,
      purpose,
    } = req.body as Record<string, string>;

    const label = variant === "seminar" ? "セミナー申し込み" : "資料ダウンロード";
    const fullName = `${lastName || ""} ${firstName || ""}`.trim() || "未入力";

    try {
      // 1通目: 社内通知
      await sendInternalNotification({
        subject: `【${label}】${itemTitle || "未入力"} - ${company || "未入力"}`,
        replyTo: email,
        text: [
          `【種別】${label}`,
          `【対象】${itemTitle || "未入力"}`,
          `【会社名】${company || "未入力"}`,
          `【氏名】${fullName}`,
          `【メールアドレス】${email || "未入力"}`,
          `【電話番号】${phone || "未入力"}`,
          `【役職】${position || "未入力"}`,
          `【${variant === "seminar" ? "参加目的" : "興味テーマ"}】${purpose || "未入力"}`,
        ].join("\n"),
      });

      // 2通目: お客さんへの自動返信
      if (email) {
        await sendAutoReply({
          to: email,
          subject: `【自動返信】${label}を受け付けました`,
          text: [
            `${fullName}`+" "+"様",
            "",
            `${label}ありがとうございます。`,
            "以下の内容で受け付けいたしました。",
            "",
            `【種別】${label}`,
            `【対象】${itemTitle || "未入力"}`,
            `【会社名】${company || "未入力"}`,
            `【氏名】${fullName}`,
            `【メールアドレス】${email || "未入力"}`,
            `【電話番号】${phone || "未入力"}`,
            `【役職】${position || "未入力"}`,
            `【${variant === "seminar" ? "参加目的" : "興味テーマ"}】${purpose || "未入力"}`,
            "",
            "内容を確認のうえ、必要に応じて担当者よりご連絡いたします。",
            "",
            "※本メールは自動送信です。",
            "",
            "□■━━━━━━━━━━━━━━━━━━━━━━━",
            "株式会社orb",
            "〒108-0074",
            "東京都港区高輪2丁目14-17グレイス高輪905",
            "https://orb-inc.co.jp/",
            "□■━━━━━━━━━━━━━━━━━━━━━━━"
          ].join("\n"),
        });
      }

      res.json({ ok: true });
    } catch (err) {
      console.error("lead mail error:", err);
      res.status(500).json({ ok: false, error: "メール送信に失敗しました" });
    }
  });

  // ── サービスページ資料DL（StepFormCard）送信 ──────
  app.post("/api/step-form", async (req, res) => {
    const { serviceTitle, email, position, stage, company, name, themes, message } =
      req.body as {
        serviceTitle?: string;
        email: string;
        position: string;
        stage: string;
        company: string;
        name: string;
        themes: string[];
        message: string;
      };

    try {
      // 1通目: 社内通知
      await sendInternalNotification({
        subject: `【資料ダウンロード】${serviceTitle || "サービス資料"} - ${company || "未入力"}`,
        replyTo: email,
        text: [
          `【対象サービス】${serviceTitle || "サービス資料"}`,
          `【会社名】${company || "未入力"}`,
          `【お名前】${name || "未入力"}`,
          `【メールアドレス】${email || "未入力"}`,
          `【役職】${position || "未入力"}`,
          `【検討段階】${stage || "未入力"}`,
          `【関心テーマ】${themes?.length ? themes.join("、") : "未選択"}`,
          `【ご質問・ご要望】${message || "未入力"}`,
        ].join("\n"),
      });

      // 2通目: お客さんへの自動返信
      if (email) {
        await sendAutoReply({
          to: email,
          subject: "【自動返信】資料ダウンロードを受け付けました",
          text: [
            `${name || "お客様"}`+" "+"様",
            "",
            "資料ダウンロードありがとうございます。",
            "以下の内容で受け付けいたしました。",
            "",
            `【対象サービス】${serviceTitle || "サービス資料"}`,
            `【会社名】${company || "未入力"}`,
            `【お名前】${name || "未入力"}`,
            `【メールアドレス】${email || "未入力"}`,
            `【役職】${position || "未入力"}`,
            `【検討段階】${stage || "未入力"}`,
            `【関心テーマ】${themes?.length ? themes.join("、") : "未選択"}`,
            `【ご質問・ご要望】${message || "未入力"}`,
            "",
            "必要に応じて担当者よりご連絡いたします。",
            "",
            "※本メールは自動送信です。",
            "",
            "□■━━━━━━━━━━━━━━━━━━━━━━━",
            "株式会社orb",
            "〒108-0074",
            "東京都港区高輪2丁目14-17グレイス高輪905",
            "https://orb-inc.co.jp/",
            "□■━━━━━━━━━━━━━━━━━━━━━━━"
          ].join("\n"),
        });
      }

      res.json({ ok: true });
    } catch (err) {
      console.error("step-form mail error:", err);
      res.status(500).json({ ok: false, error: "メール送信に失敗しました" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // ── ページ別 meta タグ定義 ──────────────────────────
  const SITE_NAME = "orb株式会社";
  type MetaEntry = { title: string; description: string };

  const staticMeta: Record<string, MetaEntry> = {
    "/": {
      title: SITE_NAME,
      description: "orb株式会社のコーポレートサイトです。会計事務所に特化した営業支援・人材紹介・AX支援を提供しています。紹介に依存しない営業の仕組みと、優秀な人材を惹きつける採用の仕組みで、貴社の持続的な成長を支援します。",
    },
    "/service": {
      title: `サービス一覧 | ${SITE_NAME}`,
      description: "会計事務所向けの営業支援・人材紹介・AX支援サービスの一覧。業界特有の課題を深く理解した専門コンサルタントが、実効性の高い戦略をご提案します。",
    },
    "/service/sales-support": {
      title: `営業支援 | サービス | ${SITE_NAME}`,
      description: "紹介や顧問契約に依存した経営から脱却し、安定的に新規顧客を獲得する仕組みを構築します。Webマーケティング戦略の立案、リード獲得、提案の標準化まで、一気通貫でサポートします。",
    },
    "/service/recruitment-support": {
      title: `人材紹介 | サービス | ${SITE_NAME}`,
      description: "採用市場で「選ばれる事務所」になるための最適な人材をご紹介します。求める人材像の明確化から、候補者のご紹介、選考プロセスのサポート、入所後の定着支援まで、トータルでご支援します。",
    },
    "/service/ai-transformation-support": {
      title: `AX支援 | サービス | ${SITE_NAME}`,
      description: "記帳・仕訳の自動化からクライアント対応の効率化まで、会計事務所に特化したAI活用戦略を設計・実行します。ツール選定から導入・定着支援まで一気通貫でサポートします。",
    },
    "/works": {
      title: `支援実績 | ${SITE_NAME}`,
      description: "会計事務所向けの営業支援・人材紹介・AX支援の実績をご紹介します。",
    },
    "/news": {
      title: `お知らせ | ${SITE_NAME}`,
      description: "orbからのお知らせ。セミナー情報、メディア掲載、プレスリリースなどをお届けします。",
    },
    "/seminar": {
      title: `セミナー | ${SITE_NAME}`,
      description: "会計事務所向けの営業・採用に関するセミナー情報。無料で参加いただけます。",
    },
    "/download": {
      title: `資料ダウンロード | ${SITE_NAME}`,
      description: "会計事務所の経営に役立つ資料を無料でダウンロード。サービス概要資料やお役立ち資料をご用意しています。",
    },
    "/company": {
      title: `会社概要 | ${SITE_NAME}`,
      description: "orb株式会社の会社概要。会計事務所向けに営業支援・人材紹介・AX支援を提供するコンサルティングファームです。",
    },
    "/company/message": {
      title: `代表メッセージ | ${SITE_NAME}`,
      description: "orb株式会社代表からのメッセージ。会計事務所の成長を仕組みで支えるという想いをお伝えします。",
    },
    "/contact": {
      title: `お問い合わせ | ${SITE_NAME}`,
      description: "会計事務所向け営業支援・人材紹介・AX支援に関するお問い合わせ・無料相談のお申し込みはこちらから。",
    },
    "/privacy-policy": {
      title: `プライバシーポリシー | ${SITE_NAME}`,
      description: "orb株式会社の個人情報保護方針。お客様の個人情報の取り扱いについて定めています。",
    },
  };

  function getPageMeta(reqPath: string): MetaEntry {
    // 完全一致
    if (staticMeta[reqPath]) return staticMeta[reqPath];
    // /works/:slug
    if (reqPath.startsWith("/works/")) return { title: `支援実績 | ${SITE_NAME}`, description: "会計事務所向け支援実績の詳細です。" };
    // /news/:id
    if (reqPath.startsWith("/news/")) return { title: `お知らせ | ${SITE_NAME}`, description: "orbからのお知らせです。" };
    // /seminar/:id
    if (reqPath.startsWith("/seminar/")) return { title: `セミナー | ${SITE_NAME}`, description: "会計事務所向けセミナーの詳細です。" };
    // /download/:slug
    if (reqPath.startsWith("/download/")) return { title: `資料ダウンロード | ${SITE_NAME}`, description: "会計事務所の経営に役立つ資料をダウンロードいただけます。" };
    // デフォルト
    return { title: SITE_NAME, description: "orb株式会社のコーポレートサイトです。" };
  }

  // Handle client-side routing - serve index.html with page-specific meta tags
  const indexHtmlPath = path.join(staticPath, "index.html");
  app.get("*", (req, res) => {
    try {
      const html = fs.readFileSync(indexHtmlPath, "utf-8");
      const { title, description } = getPageMeta(req.path);
      const injected = html
        .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
        .replace(
          /<meta name="description" content="[^"]*"/,
          `<meta name="description" content="${description}"`
        );
      res.setHeader("Content-Type", "text/html");
      res.send(injected);
    } catch {
      res.sendFile(indexHtmlPath);
    }
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);