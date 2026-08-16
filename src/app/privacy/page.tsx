import type { Metadata } from "next";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜LifeMargin",
  description: "LifeMarginにおける情報の取り扱い、Cookie、広告・アクセス解析について説明します。",
  alternates: { canonical: "https://lifemargin.net/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <SiteHeader current="privacy" />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Privacy Policy</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">プライバシーポリシー</h1>
        <p className="mt-4 text-sm text-zinc-500">制定日：2026年8月16日</p>
        <div className="mt-8 space-y-8 text-sm leading-8 text-zinc-700">
          <section><h2 className="text-xl font-bold text-zinc-900">1. 基本方針</h2><p className="mt-3">LifeMargin運営チーム（以下「当サイト」）は、利用者の情報を適切に取り扱い、利用目的を明確にしたうえで必要な範囲の情報のみを扱います。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">2. Markdown Easy Editorの入力内容</h2><p className="mt-3">Markdown Easy Editorでは、入力したMarkdown本文とプレビューの処理を利用者のブラウザ内で行います。入力内容を当サイトのサーバーへ送信したり、当サイトが入力本文を保存したりする機能は、現時点では提供していません。利用者がコピーまたはファイル保存を行った内容は、利用者自身の端末で管理されます。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">3. お問い合わせ情報</h2><p className="mt-3">お問い合わせを受け付ける場合、回答に必要な氏名、メールアドレス、お問い合わせ内容などを取得することがあります。取得した情報はお問い合わせへの対応、本人確認、必要な連絡のために利用し、目的を超えて利用しません。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">4. Cookieとアクセス解析</h2><p className="mt-3">当サイトでは、サービスの設定保存や利用状況の把握のため、Cookieその他の類似技術を使用する場合があります。Google Analyticsなどのアクセス解析を導入する場合は、利用するサービス、取得情報、利用目的、オプトアウト方法をこのページへ追記します。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">5. 広告配信について</h2><p className="mt-3">当サイトでGoogle AdSenseその他の第三者広告サービスを利用する場合、第三者ベンダーを含む広告配信事業者が、利用者の過去の訪問履歴に基づく広告配信のためCookieを使用することがあります。広告配信を開始する前に、利用する広告サービス、Cookieの利用、パーソナライズ広告を無効にする方法へのリンク、および必要な同意取得の仕組みをこのページへ反映します。</p><p className="mt-3">Googleによるパーソナライズ広告は、<a className="text-indigo-700 underline" href="https://www.google.com/settings/ads" rel="noreferrer">Google広告設定</a>から管理できます。また、第三者広告のオプトアウトについては<a className="text-indigo-700 underline" href="https://www.aboutads.info/choices/" rel="noreferrer">aboutads.info</a>も参照できます。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">6. 第三者サービス</h2><p className="mt-3">外部サービスを利用する場合は、サービス名、提供者、利用目的、外部送信される情報を確認し、必要に応じてこのポリシーへ追記します。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">7. 開示・訂正・削除等の請求</h2><p className="mt-3">当サイトが利用者の個人情報を保有している場合、本人確認のうえ、法令に基づき開示、訂正、利用停止、削除等の請求に対応します。請求は<a className="text-indigo-700 underline" href="/contact">お問い合わせページ</a>からご連絡ください。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">8. 改定</h2><p className="mt-3">サービス内容、法令、ガイドラインの変更に応じて本ポリシーを改定することがあります。重要な変更がある場合は、当サイト上で分かりやすく告知します。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">9. お問い合わせ</h2><p className="mt-3">本ポリシーに関するお問い合わせは、<a className="text-indigo-700 underline" href="/contact">お問い合わせページ</a>からお送りください。</p></section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
