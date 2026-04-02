import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTIFY_TO = "k.umezu@orb-inc.co.jp";

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  });
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── お問い合わせ送信 ──────────────────────────────
  app.post("/api/contact", async (req, res) => {
    const { inquiryType, company, name, email, phone, message } = req.body as Record<string, string>;
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"orbコーポレートサイト" <${process.env.SMTP_USER}>`,
        to: NOTIFY_TO,
        subject: `【お問い合わせ】${inquiryType} - ${company}`,
        text: [
          `【お問い合わせ種別】${inquiryType}`,
          `【法人名/事務所名】${company}`,
          `【お名前】${name}`,
          `【メールアドレス】${email}`,
          `【電話番号】${phone || "未入力"}`,
          "",
          `【お問い合わせ内容】`,
          message,
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
    const { variant, itemTitle, company, lastName, firstName, phone, email, position, purpose } =
      req.body as Record<string, string>;
    const label = variant === "seminar" ? "セミナー申し込み" : "資料ダウンロード";
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"orbコーポレートサイト" <${process.env.SMTP_USER}>`,
        to: NOTIFY_TO,
        subject: `【${label}】${itemTitle} - ${company}`,
        text: [
          `【種別】${label}`,
          `【対象】${itemTitle}`,
          `【会社名】${company}`,
          `【氏名】${lastName} ${firstName}`,
          `【メールアドレス】${email}`,
          `【電話番号】${phone}`,
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
      req.body as { serviceTitle?: string; email: string; position: string; stage: string; company: string; name: string; themes: string[]; message: string };
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `"orbコーポレートサイト" <${process.env.SMTP_USER}>`,
        to: NOTIFY_TO,
        subject: `【資料ダウンロード】${serviceTitle || "サービス資料"} - ${company}`,
        text: [
          `【対象サービス】${serviceTitle || "サービス資料"}`,
          `【会社名】${company}`,
          `【お名前】${name}`,
          `【メールアドレス】${email}`,
          `【役職】${position}`,
          `【検討段階】${stage}`,
          `【関心テーマ】${themes?.join("、") || "未選択"}`,
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
