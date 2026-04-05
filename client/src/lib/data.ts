// サイト共通データ定義
// Design: Swiss Precision — スイスタイポグラフィ × ジャパニーズミニマリズム
// ============================================================

export const SITE_NAME = "orb株式会社";
export const SITE_NAME_EN = "orb Inc.";
export const LOGO_URL = "/orb-logo-v2.png";

// --- Images (CDN URLs) ---
export const IMAGES = {
  hero: "https://private-us-east-1.manuscdn.com/sessionFile/KSKnWRAw8QBE9qHt8dp9fs/sandbox/FKk9z5nL2yAXNIijvCn0mo-img-1_1771757002000_na1fn_aGVyby1hYnN0cmFjdA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS1NLbldSQXc4UUJFOXFIdDhkcDlmcy9zYW5kYm94L0ZLazl6NW5MMnlBWE5JaWp2Q24wbW8taW1nLTFfMTc3MTc1NzAwMjAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEEuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=sI~OYldMl8JREvthK46MkUlpg~Edxb~x6y2FlmwHlglGI5qGwksAbIilyQ6NxSvby09ngVI8zTi~LyWUSlwJnfp0mQ-vv3KENdKeZQmunshAFmNa~kfE5Bn3r3QAIDmZDX~MI9gMNwk9EzsY66yRHHDKK8gIEFN4WmfFHQDGt7Df3uGp2b5o8RDhbDH6ZnaKgr5KV-fb2-z3u3AO-av~2DbX34gTmwcgR4xBf5SUmtznffwSaIp8IVqOsruLR3oaC3AFwze8a-JrT98Kr2SQlh1hZabv-vxVVRbL9QY3nVD9UzxGPvK2edUViEZqs4n7SYxzPKsV~bC~HzTZeop9Yg__",
  serviceSales: "https://private-us-east-1.manuscdn.com/sessionFile/KSKnWRAw8QBE9qHt8dp9fs/sandbox/FKk9z5nL2yAXNIijvCn0mo-img-2_1771756990000_na1fn_c2VydmljZS1zYWxlcw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS1NLbldSQXc4UUJFOXFIdDhkcDlmcy9zYW5kYm94L0ZLazl6NW5MMnlBWE5JaWp2Q24wbW8taW1nLTJfMTc3MTc1Njk5MDAwMF9uYTFmbl9jMlZ5ZG1salpTMXpZV3hsY3cuanBnP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VQg89ppVRWEAnZ3ujZPu7-JaCOj~WiDG-DxFTWd1oohGb0x9ozVkn6qhoZC~FPnNm3DvwoByhSuSxBUP9VyaBmUcpQlWyhVk07JBirzsa-cPyaWyhqzqSQ75e6hOYQDIsH-0mljYZdPwL5PWuLgXaFMz9FdgKyDGN57VGnPXpP9QOdeRMerr7e~V96U3O-UKMS2ffvxNRncKJ9cgNGyWfe1np~-7K0UwpBL~1wdqMeH3wl3debzFGQX7DvR2604ixhCz6X-TB-cn5C~1EX23TQKuyvHxPkMIaB4c2LJn~~~r72kaY9IbqH~q4l3c69~bzSiJI4S96UeUXp~lR7GIjQ__",
  serviceRecruitment: "https://private-us-east-1.manuscdn.com/sessionFile/KSKnWRAw8QBE9qHt8dp9fs/sandbox/FKk9z5nL2yAXNIijvCn0mo-img-3_1771757003000_na1fn_c2VydmljZS1yZWNydWl0bWVudA.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS1NLbldSQXc4UUJFOXFIdDhkcDlmcy9zYW5kYm94L0ZLazl6NW5MMnlBWE5JaWp2Q24wbW8taW1nLTNfMTc3MTc1NzAwMzAwMF9uYTFmbl9jMlZ5ZG1salpTMXlaV055ZFdsMGJXVnVkQS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qDpb29wEFND-EMCIlKU7mqJ6YmVjGazPWPUfJEnLNZ1ULkgGSmNdv9Z6ioEztr-q0rXiMZGG1ZcU87U7vDR0vd110Z6JjXl71lG5EDqlC5zch8p3ejCAJESCAY~j5qgANktboan6VRSWrOPu0fXGrqQ3p3qIsuF6no7nOM~jwghCu-KxuVzbiBGcc1RkmumHLCIakNxCwLiHeCYjTL-7TIPY~E~Pv2~T4mV3NH3WEOdgXxaOfLdWP0tOYiDvcsqhnXy0m2wd5hoq~aNRKpyeKB~oRheJUuE~RRMf4-fg~1h~s~0LxZwJyCG8p155ULF5DON0hzwNTDG22LAQTcdXxQ__",
  mission: "https://private-us-east-1.manuscdn.com/sessionFile/KSKnWRAw8QBE9qHt8dp9fs/sandbox/FKk9z5nL2yAXNIijvCn0mo-img-4_1771756994000_na1fn_bWlzc2lvbi12aXN1YWw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS1NLbldSQXc4UUJFOXFIdDhkcDlmcy9zYW5kYm94L0ZLazl6NW5MMnlBWE5JaWp2Q24wbW8taW1nLTRfMTc3MTc1Njk5NDAwMF9uYTFmbl9iV2x6YzJsdmJpMTJhWE4xWVd3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=fLS64umT3q34YxYoMRkJIQ1i-lYqJf16hF161G9aEWQ9OrIAIE3H-PiRPCL3nARVUfy4U6flDQWzu-lmRQuQSO4XFOdojkIyadooABov4Lt4xXLvvS51FE10BcFx3MO7M3yIJhLZ-KbHe5xsAXGX3JRFkhnl~LpyEwSCGgnPPY3f0qDINzu0wM2QptljDtUvZnF-A4Z1m9tfZExJc0M5o0balfuZOyiw-0BsVK2EN1AsWPrpEd0lYpF0myZXCixeie04kWoI3ZcTOOlzmer-d-2V3M78hjipILTkBY5sDMEcfWxuZ8XhMM5HXCFvXOgxim6KmZK6V-cKPtLFFjdelg__",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
  ctaBg: "https://private-us-east-1.manuscdn.com/sessionFile/KSKnWRAw8QBE9qHt8dp9fs/sandbox/FKk9z5nL2yAXNIijvCn0mo-img-5_1771756997000_na1fn_Y3RhLWJhY2tncm91bmQ.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvS1NLbldSQXc4UUJFOXFIdDhkcDlmcy9zYW5kYm94L0ZLazl6NW5MMnlBWE5JaWp2Q24wbW8taW1nLTVfMTc3MTc1Njk5NzAwMF9uYTFmbl9ZM1JoTFdKaFkydG5jbTkxYm1RLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=AfrcKXUJ4sWVpvU9TqXgJ9OCwTN10FxqWmQzEUx1pls0gx8WNYHfDx8GzdlQ5BR13~QTRgkvg1eiCaGupi5zzWrZVGskLkybsSUKAE67jRSfsSn9ep7YsHkyC1kU3zh~mMV05Qox8RFzryQ~jquXjdWcmVLMoAgV-iasrEAC8c~UZXjxZfJ~uJIAQTVer9L~yG0LwLy3ndyxgIAz83hyrRmC21LEYiXlERFfwqft12UMgMaYjQy5uplLZyhULXv0PaWnq77W5v2L0SbvIL~KZFkhglLr6aPxLn84phdUBlB8TiSmZhk7N9lHVyp5dfhaf0fXFSA85jtrOluCYH8eaw__",
};

// --- Services ---
export interface ServiceFeature {
  title: string;
  description: string;
  example?: string;
}

export interface ServiceScopeCategory {
  category: string;
  description: string;
  tasks: string[];
}

export interface ServiceTestimonial {
  comment: string;
  name: string;
  role: string;
  company: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
  deliverable?: string;
  duration?: string;
}

export interface ServiceResultHighlight {
  label: string;
  before: string;
  after: string;
}

export interface Service {
  slug: string;
  title: string;
  titleEn: string;
  catchphrase: string;
  subcopy: string;
  description: string;
  challenges: string[];
  image: string;
  features: ServiceFeature[];
  resultHighlights: ServiceResultHighlight[];
  scopeCategories: ServiceScopeCategory[];
  supportDetails: string[];
  process: ServiceProcessStep[];
  deliverables: string[];
  testimonials: ServiceTestimonial[];
  faq: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: "sales-support",
    title: "営業支援",
    titleEn: "Sales Support",
    catchphrase: "営業力を仕組みで伸ばす",
    subcopy: "紹介依存から脱却し、Webを起点に安定した新規顧客獲得の仕組みを構築します。",
    description: "紹介や顧問契約に依存した経営から脱却し、安定的に新規顧客を獲得する仕組みを構築します。Webマーケティング戦略の立案、リード獲得、提案の標準化まで、一気通貫でサポートします。",
    challenges: [
      "新規顧客の大半が紹介経由で、安定した集客ができていない",
      "ホームページはあるが問い合わせがほとんど来ない",
      "営業担当者のスキルに依存しており、属人化している",
      "どこから手をつければいいかわからない",
    ],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=500&fit=crop",
    features: [
      {
        title: "Webマーケティング戦略立案",
        description: "ターゲット顧客の分析から、SEO・コンテンツ・広告を組み合わせた戦略を設計します。",
        example: "法人向けキーワード選定、競合分析レポート",
      },
      {
        title: "リード獲得の仕組み構築",
        description: "資料ダウンロードやセミナー集客など、見込み顧客を継続的に獲得する導線を整備します。",
        example: "ランディングページ設計、CTA最適化",
      },
      {
        title: "提案・営業プロセスの標準化",
        description: "ヒアリングシートや提案書テンプレートを整備し、誰でも一定の品質で営業できる体制を構築します。",
        example: "提案書テンプレート、トークスクリプト",
      },
      {
        title: "KPI設計と効果測定",
        description: "アクセス数・リード数・成約率などのKPIを設定し、PDCAを回せる仕組みを整えます。",
        example: "ダッシュボード構築、月次レポーティング",
      },
    ],
    resultHighlights: [
      { label: "月間問い合わせ数", before: "2件", after: "18件" },
      { label: "Webからの新規顧客比率", before: "5%", after: "42%" },
      { label: "営業成約率", before: "20%", after: "38%" },
    ],
    scopeCategories: [
      {
        category: "戦略設計",
        description: "現状分析から施策の優先順位付けまで",
        tasks: ["ターゲット顧客分析", "競合調査・ポジショニング", "施策ロードマップ策定"],
      },
      {
        category: "Web集客",
        description: "オンラインからの見込み顧客獲得",
        tasks: ["SEO対策・コンテンツ制作", "Web広告運用", "ランディングページ改善"],
      },
      {
        category: "営業プロセス",
        description: "商談から成約までの仕組みづくり",
        tasks: ["提案書・資料テンプレート整備", "ヒアリングシート設計", "フォローアップフロー構築"],
      },
    ],
    supportDetails: [
      "月2回の定例ミーティングによる進捗確認・方針調整",
      "Slack等のチャットツールでの日常的な相談対応",
      "月次レポートによる効果測定と改善提案",
      "担当コンサルタントによる伴走支援",
    ],
    process: [
      {
        step: 1,
        title: "ヒアリング・現状分析",
        description: "貴社の現状の営業課題、ターゲット顧客、競合状況を詳しくヒアリングします。",
        deliverable: "現状分析レポート",
        duration: "1〜2週間",
      },
      {
        step: 2,
        title: "戦略立案",
        description: "分析結果をもとに、3〜6ヶ月の施策ロードマップを作成します。",
        deliverable: "営業戦略ロードマップ",
        duration: "2週間",
      },
      {
        step: 3,
        title: "施策実行・改善",
        description: "定例ミーティングで進捗を確認しながら、施策を実行・改善していきます。",
        deliverable: "月次レポート",
        duration: "3〜6ヶ月〜",
      },
    ],
    deliverables: [
      "現状分析レポート",
      "営業戦略ロードマップ",
      "提案書・ヒアリングシートテンプレート",
      "Webマーケティング施策計画書",
      "月次効果測定レポート",
    ],
    testimonials: [
      {
        comment: "紹介頼みの営業から脱却できるか不安でしたが、Webからの問い合わせが3倍以上に増えました。具体的な数値目標を設定して伴走してくれるので、成果が見えやすいです。",
        name: "田中 誠一",
        role: "代表社員",
        company: "田中会計事務所",
      },
      {
        comment: "営業の仕組みをゼロから作っていただきました。提案書のテンプレートができたことで、若いスタッフでも安心して商談に臨めるようになりました。",
        name: "鈴木 花子",
        role: "所長",
        company: "鈴木会計事務所",
      },
    ],
    faq: [
      {
        question: "営業経験がないスタッフでも対応できますか？",
        answer: "はい。提案書テンプレートやトークスクリプトの整備など、誰でも一定品質で営業できる仕組みづくりから支援します。",
      },
      {
        question: "効果が出るまでどれくらいかかりますか？",
        answer: "施策の内容によりますが、Web広告は1〜2ヶ月、SEOは3〜6ヶ月を目安にご案内しています。短期と中長期の施策を組み合わせてご提案します。",
      },
      {
        question: "最低契約期間はありますか？",
        answer: "基本的には6ヶ月以上のご契約をお願いしています。効果的なPDCAを回すために一定期間が必要なためです。",
      },
    ],
  },
  {
    slug: "recruitment-support",
    title: "人材紹介",
    titleEn: "Recruitment Support",
    catchphrase: "選ばれる会計事務所をつくる",
    subcopy: "会計事務所に特化した人材紹介で、即戦力となる人材のご紹介から定着支援までをトータルでご支援します。",
    description: "採用市場で「選ばれる事務所」になるための最適な人材をご紹介します。求める人材像の明確化から、候補者のご紹介、選考プロセスのサポート、入所後の定着支援まで、トータルでご支援します。",
    challenges: [
      "応募者が集まらず、採用活動が停滞している",
      "採用できても早期離職が続いている",
      "自社に合った人材をどう見つければいいかわからない",
      "人材紹介会社をうまく活用できていない",
    ],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
    features: [
      {
        title: "会計事務所に特化した人材データベース",
        description: "会計・税務の専門人材に特化したネットワークから、貴事務所のニーズに合った候補者をご紹介します。",
        example: "候補者リスト、マッチング提案書",
      },
      {
        title: "丁寧なヒアリングとマッチング",
        description: "求める人材像・事務所の文化・職場環境を丁寧にヒアリングし、ミスマッチのない最適なマッチングを実現します。",
        example: "採用要件定義書、候補者プロファイル",
      },
      {
        title: "選考プロセスのサポート",
        description: "書類選考・面接設計から内定後のフォローまで、採用プロセス全体をサポートします。",
        example: "面接評価シート、内定後フォローシート",
      },
      {
        title: "入所後の定着支援",
        description: "入所後のオンボーディング設計や定期フォローにより、早期離職を防ぎ、長期的な活躍を支援します。",
        example: "オンボーディングプログラム、定着支援レポート",
      },
    ],
    resultHighlights: [
      { label: "月間応募数", before: "3名", after: "22名" },
      { label: "内定承諾率", before: "40%", after: "75%" },
      { label: "1年以内離職率", before: "35%", after: "8%" },
    ],
    scopeCategories: [
      {
        category: "採用戦略",
        description: "採用の方針・ターゲット設計",
        tasks: ["採用ペルソナ策定", "採用チャネル選定", "採用計画立案"],
      },
      {
        category: "採用広報",
        description: "求職者に選ばれるブランドづくり",
        tasks: ["求人票リライト", "採用サイトコンテンツ設計", "SNS採用広報支援"],
      },
      {
        category: "選考・定着",
        description: "面接から入社後フォローまで",
        tasks: ["面接設計・評価シート作成", "オファー面談支援", "オンボーディング設計"],
      },
    ],
    supportDetails: [
      "月2回の定例ミーティングによる進捗確認・方針調整",
      "スカウトメッセージ作成・送付の代行",
      "採用活動の効果測定と改善提案",
      "担当コンサルタントによる伴走支援",
    ],
    process: [
      {
        step: 1,
        title: "採用課題のヒアリング",
        description: "現状の採用状況、理想の人材像、職場環境などを詳しくヒアリングします。",
        deliverable: "採用課題分析レポート",
        duration: "1〜2週間",
      },
      {
        step: 2,
        title: "採用戦略の策定",
        description: "ペルソナ設計、チャネル選定、スケジュールを含む採用計画を作成します。",
        deliverable: "採用戦略ロードマップ",
        duration: "2週間",
      },
      {
        step: 3,
        title: "採用活動の実行・改善",
        description: "求人掲載・人材紹介・面接対応を並走しながら改善を繰り返します。",
        deliverable: "月次採用レポート",
        duration: "3〜6ヶ月〜",
      },
    ],
    deliverables: [
      "採用課題分析レポート",
      "採用ペルソナシート",
      "採用戦略ロードマップ",
      "求人票・スカウト文面テンプレート",
      "面接評価シート",
    ],
    testimonials: [
      {
        comment: "応募が来ても辞退や早期離職が多く悩んでいました。採用ブランディングを整えてから応募の質が変わり、定着率が大幅に改善されました。",
        name: "佐藤 義明",
        role: "代表社員",
        company: "佐藤会計事務所",
      },
      {
        comment: "スカウト代行をお願いして最初の月から複数名の優良候補者と面談できました。メッセージのクオリティが高く、返信率が想像以上でした。",
        name: "山田 美里",
        role: "所長",
        company: "山田会計事務所",
      },
    ],
    faq: [
      {
        question: "小規模な事務所でも人材紹介を受けられますか？",
        answer: "はい。スタッフ数名の小規模事務所から、複数拠点を持つ法人まで幅広く対応しています。",
      },
      {
        question: "採用媒体の費用は別途かかりますか？",
        answer: "はい。求人媒体の掲載費用は別途ご負担いただきます。最適な媒体の選定と費用対効果の最大化をご支援します。",
      },
      {
        question: "採用できなかった場合はどうなりますか？",
        answer: "採用保証はしておりませんが、採用できるまで継続的に改善・サポートします。採用目標の達成に向けて全力で伴走いたします。",
      },
    ],
  },
  {
    slug: "ai-transformation-support",
    title: "AX支援",
    titleEn: "AI Transformation Support",
    catchphrase: "会計業務をAIで変革する",
    subcopy: "AIを活用した業務効率化・自動化で、スタッフの生産性を高め、本来の専門業務に集中できる環境をつくります。",
    description: "記帳・仕訳の自動化からクライアント対応の効率化まで、会計事務所に特化したAI活用戦略を設計・実行します。ツール選定から導入・定着支援まで一気通貫でサポートします。",
    challenges: [
      "ルーティン業務に追われ、付加価値の高い業務に時間を割けない",
      "AIやDXに興味はあるが、何から始めればいいかわからない",
      "導入したツールが現場に定着せず、使いこなせていない",
      "人手不足の中でも業務量が増え続けている",
    ],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop",
    features: [
      {
        title: "AI活用戦略の設計",
        description: "事務所の業務フローを分析し、AIで自動化・効率化すべき領域を特定。優先順位をつけた導入ロードマップを設計します。",
        example: "業務分析レポート、AI導入ロードマップ",
      },
      {
        title: "ツール選定・導入支援",
        description: "記帳自動化・仕訳支援・文書生成など、目的に合ったAIツールを選定し、初期設定から運用開始まで伴走します。",
        example: "ツール比較レポート、導入設定サポート",
      },
      {
        title: "スタッフへの研修・定着支援",
        description: "現場スタッフがAIツールを使いこなせるよう、ハンズオン研修と継続フォローで定着を支援します。",
        example: "操作マニュアル、研修プログラム",
      },
      {
        title: "効果測定と改善",
        description: "導入後の業務時間・コスト削減効果を測定し、さらなる改善・拡張に向けた提案を継続的に行います。",
        example: "効果測定レポート、改善提案書",
      },
    ],
    resultHighlights: [
      { label: "ルーティン業務時間", before: "週30時間", after: "週12時間" },
      { label: "記帳処理速度", before: "1件/15分", after: "1件/3分" },
      { label: "スタッフ残業時間", before: "月40時間", after: "月15時間" },
    ],
    scopeCategories: [
      {
        category: "現状分析",
        description: "業務フローの可視化とAI化余地の特定",
        tasks: ["業務フロー調査", "自動化対象の優先順位付け", "ROI試算"],
      },
      {
        category: "ツール導入",
        description: "AIツールの選定・設定・運用開始",
        tasks: ["ツール選定・契約サポート", "初期設定・カスタマイズ", "テスト運用"],
      },
      {
        category: "定着支援",
        description: "研修・フォローアップによる現場定着",
        tasks: ["スタッフ研修の実施", "マニュアル整備", "継続的な改善提案"],
      },
    ],
    supportDetails: [
      "月2回の定例ミーティングによる進捗確認・方針調整",
      "AIツールの操作・トラブル対応のサポート",
      "効果測定と月次改善レポートの提供",
      "担当コンサルタントによる伴走支援",
    ],
    process: [
      {
        step: 1,
        title: "業務ヒアリング・現状分析",
        description: "現在の業務フローと課題を詳しくヒアリングし、AI活用で改善できる領域を特定します。",
        deliverable: "業務分析レポート",
        duration: "1〜2週間",
      },
      {
        step: 2,
        title: "AI導入ロードマップの策定",
        description: "優先度の高い業務から順にAI化計画を立案し、ツール選定・スケジュールを策定します。",
        deliverable: "AI導入ロードマップ",
        duration: "2週間",
      },
      {
        step: 3,
        title: "導入・研修・定着支援",
        description: "ツールの導入設定からスタッフ研修、効果測定まで、現場に定着するまで伴走します。",
        deliverable: "月次効果測定レポート",
        duration: "3〜6ヶ月〜",
      },
    ],
    deliverables: [
      "業務分析レポート",
      "AI導入ロードマップ",
      "ツール操作マニュアル",
      "スタッフ研修資料",
      "月次効果測定レポート",
    ],
    testimonials: [
      {
        comment: "記帳の自動化で月30時間以上の作業時間を削減できました。スタッフが本来の相談業務に集中できるようになり、顧客満足度も上がっています。",
        name: "中村 健一",
        role: "代表社員",
        company: "中村会計事務所",
      },
      {
        comment: "AIに不安もありましたが、現場目線で丁寧に研修していただいたおかげで全スタッフが使いこなせるようになりました。",
        name: "高橋 由美",
        role: "所長",
        company: "高橋会計事務所",
      },
    ],
    faq: [
      {
        question: "IT知識がなくても導入できますか？",
        answer: "はい。専門知識は不要です。操作マニュアルの整備とハンズオン研修で、ITが得意でないスタッフでも使いこなせる環境を整えます。",
      },
      {
        question: "どのくらいの期間で効果が出ますか？",
        answer: "ツールの種類にもよりますが、記帳自動化などは導入初月から効果を実感いただけることが多いです。全体的な定着には3〜6ヶ月を目安にしています。",
      },
      {
        question: "既存のシステムと連携できますか？",
        answer: "対応可能な場合が多いです。ご利用中のシステムをヒアリングした上で、最適な連携方法をご提案します。",
      },
    ],
  },
];

// --- Works ---
export type WorkArea = "営業支援" | "人材紹介";
export type OfficeType = "小規模（〜10名）" | "中規模（11〜30名）" | "大規模（31名〜）";

export const WORK_AREAS: WorkArea[] = ["営業支援", "人材紹介"];
export const OFFICE_TYPES: OfficeType[] = ["小規模（〜10名）", "中規模（11〜30名）", "大規模（31名〜）"];

export interface Work {
  slug: string;
  title: string;
  clientName: string;
  clientSize: string;
  officeType: string;
  area: WorkArea;
  publishDate: string;
  image: string;
  tags: string[];
  background: string;
  challenges: string[];
  approach: string;
  process: { phase: string; description: string }[];
  results: {
    quantitative: string[];
    qualitative: string[];
  };
  period: string;
  outlook: string;
  challenge: string;
  solution: string;
  result: string;
}

export const works: Work[] = [];

// --- Seminars ---
export const SEMINAR_CATEGORIES: string[] = ["すべて", "営業支援", "人材紹介", "マーケティング", "経営戦略"];

export interface Seminar {
  id: string;
  title: string;
  image: string;
  status: "upcoming" | "ended";
  date: string;
  time: string;
  format: string;
  capacity: string;
  deadline: string;
  target: string;
  description: string;
  contents: string[];
  targetAudience: string[];
  benefits: string[];
  basicInfo: { label: string; value: string }[];
  speaker: { name: string; role: string; bio: string; image?: string };
  tags: string[];
  pickup: boolean;
}

export const seminars: Seminar[] = [];

// --- Downloads ---
export const DOWNLOAD_CATEGORIES: string[] = ["すべて", "営業支援", "人材紹介", "マーケティング"];

export interface Download {
  slug: string;
  title: string;
  image: string;
  category: "service" | "useful";
  description: string;
  summary: string;
  tags: string[];
  targetAudience: string[];
  contents: string[];
}

export const downloads: Download[] = [];

// --- News ---
export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "website-renewal-2025",
    title: "コーポレートサイトをリニューアルしました",
    date: "2025-04-5",
    category: "お知らせ",
    content: "株式会社orbは、ホームページを全面リニューアルいたしました。\n\n今回のリニューアルでは、皆様にサービス内容をよりわかりやすくお伝えできるよう、サイトのデザイン及びコンテンツを全面的に刷新いたしました。\nこれからも引き続き、皆様のお役に立つ情報の提供に努めてまいります。\n\n今後ともご愛顧賜りますようお願い申し上げます。",
  },
];
