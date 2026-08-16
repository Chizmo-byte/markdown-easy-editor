import type { Metadata } from "next";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

export const metadata: Metadata = {
  title: "LifeMarginについて｜LifeMargin",
  description: "LifeMarginの目的、運営方針、Markdown Easy Editorについてご案内します。",
  alternates: { canonical: "https://lifemargin.net/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <SiteHeader current="about" />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">About LifeMargin</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">LifeMarginについて</h1>
        <div className="mt-8 space-y-8 text-sm leading-8 text-zinc-700">
          <section>
            <h2 className="text-xl font-bold text-zinc-900">LifeMarginとは</h2>
            <p className="mt-3">LifeMarginは、考える時間と書く時間に余白をつくるためのデジタルツールを提供するプロジェクトです。必要な機能を分かりやすくまとめ、ユーザーが本来の作業に集中できることを大切にしています。</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-zinc-900">Markdown Easy Editor</h2>
            <p className="mt-3">Markdown Easy Editorは、Markdownの記法と表示結果を同時に確認できる学習向けの無料エディタです。入力内容はブラウザ内で処理され、見出し、リスト、表、コードブロックなどを試しながら学べます。</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-zinc-900">運営主体</h2>
            <dl className="mt-3 grid gap-2 sm:grid-cols-[10rem_1fr]">
              <dt className="font-semibold text-zinc-900">サイト名</dt><dd>LifeMargin</dd>
              <dt className="font-semibold text-zinc-900">運営者</dt><dd>LifeMargin運営チーム</dd>
              <dt className="font-semibold text-zinc-900">URL</dt><dd>https://lifemargin.net/</dd>
            </dl>
            <p className="mt-3 text-xs text-zinc-500">個人名または法人名で公開する場合は、公開前に運営者欄を実際の情報へ更新してください。</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
