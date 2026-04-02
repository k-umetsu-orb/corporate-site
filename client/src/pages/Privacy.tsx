/*
 * Design: Swiss Precision
 * プライバシーポリシーページ
 */
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { useSEO } from "@/hooks/useSEO";

export default function Privacy() {
  useSEO({
    title: "プライバシーポリシー",
    description: "orb株式会社の個人情報保護方針。お客様の個人情報の取り扱いについて定めています。",
    path: "/privacy-policy",
  });

  return (
    <Layout>
      <PageHero
        label="Privacy Policy"
        title="プライバシーポリシー"
        breadcrumbs={[{ label: "プライバシーポリシー" }]}
      />

      <section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="space-y-10 text-sm text-muted-foreground leading-[1.9]">
            <div>
              <p>
                orb株式会社（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、
                以下のとおり個人情報保護方針を定め、これを遵守いたします。
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">1. 個人情報の定義</h2>
              <p>
                個人情報とは、個人情報保護法に定める個人情報を指し、生存する個人に関する情報であって、
                当該情報に含まれる氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により
                特定の個人を識別できるものをいいます。
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">2. 個人情報の収集方法</h2>
              <p>
                当社は、お問い合わせフォーム、資料ダウンロードフォーム、セミナー申込フォーム等を通じて、
                お客様の個人情報を適法かつ公正な手段により収集いたします。
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">3. 個人情報の利用目的</h2>
              <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>お問い合わせに対する回答・連絡のため</li>
                <li>サービスに関する情報提供のため</li>
                <li>セミナー・イベントのご案内のため</li>
                <li>資料送付のため</li>
                <li>当社サービスの改善・新サービスの開発のため</li>
                <li>その他上記利用目的に付随する目的のため</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">4. 個人情報の第三者提供</h2>
              <p>
                当社は、次の場合を除き、お客様の個人情報を第三者に提供いたしません。
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要がある場合</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">5. 個人情報の安全管理</h2>
              <p>
                当社は、個人情報の正確性及び安全性を確保するために、セキュリティ対策をはじめとする
                安全対策を実施し、個人情報の漏洩、滅失又はき損の防止及び是正に努めます。
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">6. 個人情報の開示・訂正・削除</h2>
              <p>
                お客様から個人情報の開示・訂正・削除等のご請求があった場合、
                本人確認の上、速やかに対応いたします。
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">7. Cookieの使用について</h2>
              <p>
                当社のウェブサイトでは、お客様の利便性向上およびアクセス解析のためにCookieを使用しています。
                お客様はブラウザの設定によりCookieの受け取りを拒否することができますが、
                その場合、一部のサービスが利用できなくなる場合があります。
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">8. 本ポリシーの変更</h2>
              <p>
                当社は、法令の変更等に伴い、本ポリシーを変更することがあります。
                変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>
            </div>

            <div>
              <h2 className="text-base font-bold text-foreground mb-3">9. お問い合わせ窓口</h2>
              <p>
                個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="mt-3 p-4 bg-secondary rounded-sm">
                <p>orb株式会社</p>
                <p>〒108-0074 東京都港区高輪2丁目14-17グレイス高輪905</p>
                <p>Email: info@orb-inc.co.jp</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">制定日：2026年3月15日</p>
              <p className="text-xs text-muted-foreground">最終改定日：2026年3月15日</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
