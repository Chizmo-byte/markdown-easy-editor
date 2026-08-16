import type { Metadata } from "next";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

export const metadata: Metadata = {
  title: "利用規約｜LifeMargin",
  description: "LifeMarginとMarkdown Easy Editorの利用条件を定める利用規約です。",
  alternates: { canonical: "https://lifemargin.net/terms" },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <SiteHeader current="terms" />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Terms of Use</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">利用規約</h1>
        <p className="mt-4 text-sm text-zinc-500">制定日：2026年8月16日</p>
        <div className="mt-8 space-y-8 text-sm leading-8 text-zinc-700">
          <section><h2 className="text-xl font-bold text-zinc-900">1. 適用</h2><p className="mt-3">この利用規約は、LifeMarginおよびMarkdown Easy Editor（以下「本サービス」）の利用条件を定めるものです。利用者は、本規約に同意のうえ本サービスを利用するものとします。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">2. サービスの内容</h2><p className="mt-3">本サービスは、Markdownの記法を学びながら文章を編集、プレビュー、コピー、ファイル保存するためのWebツールです。入力内容は現時点では利用者のブラウザ内で処理されます。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">3. 禁止事項</h2><p className="mt-3">利用者は、法令または公序良俗に反する行為、本サービスや第三者のサーバーへの不正アクセス、過度な負荷を与える行為、当サイトの運営を妨げる行為、その他当サイトが不適切と判断する行為をしてはなりません。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">4. 入力内容の管理</h2><p className="mt-3">利用者が入力する文章、コード、リンクその他の内容については、利用者自身が適切な権利を有していることを確認してください。公開前の機密情報や個人情報を入力する場合は、利用者自身の責任で安全性を判断してください。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">5. 知的財産権</h2><p className="mt-3">本サービスのソフトウェア、デザイン、ロゴ、文章その他のコンテンツに関する権利は、当サイトまたは正当な権利者に帰属します。利用者の入力内容に関する権利は、原則として利用者に帰属します。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">6. 免責</h2><p className="mt-3">当サイトは、本サービスの正確性、完全性、継続性、特定目的への適合性を保証しません。入力内容の消失、保存結果の不具合、サービスの停止、第三者サイトへのリンク先で生じた損害について、法令上許される範囲で責任を負いません。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">7. サービスの変更・停止</h2><p className="mt-3">当サイトは、必要に応じて本サービスの内容を変更、追加、停止、終了することがあります。重要な変更がある場合は、可能な範囲で当サイト上に告知します。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">8. 規約の変更</h2><p className="mt-3">当サイトは、必要に応じて本規約を変更できます。変更後の規約は当サイトに掲載した時点から効力を生じます。</p></section>
          <section><h2 className="text-xl font-bold text-zinc-900">9. 準拠法・管轄</h2><p className="mt-3">本規約は日本法を準拠法とし、本サービスに関して紛争が生じた場合は、当サイト運営者の所在地を管轄する裁判所を第一審の専属的合意管轄とします。</p></section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
