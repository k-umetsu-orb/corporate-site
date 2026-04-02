import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTIFY_TO = "k.umezu@orb-inc.co.jp";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM ||
  "orbコーポレートサイト <onboarding@resend.dev>";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [NOTIFY_TO],
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

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── お問い合わせ送信 ──────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const { inquiryType, company, name, email, phone, message } =
      req.body as Record<string, string>;

    try {
      await sendEmail({
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

    try {
      await sendEmail({
        subject: `【${label}】${itemTitle || "未入力"} - ${company || "未入力"}`,
        replyTo: email,
        text: [
          `【種別】${label}`,
          `【対象】${itemTitle || "未入力"}`,
          `【会社名】${company || "未入力"}`,
          `【氏名】${`${lastName || ""} ${firstName || ""}`.trim() || "未入力"}`,
          `【メールアドレス】${email || "未入力"}`,
          `【電話番号】${phone || "未入力"}`,
          `【役職】${position || "未入力"}`,
          `【${variant === "seminar" ? "参加目的" : "興味テーマ"}】${purpose || "未入力"}`,
        ].join("\n"),
      });

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
      await sendEmail({
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

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);