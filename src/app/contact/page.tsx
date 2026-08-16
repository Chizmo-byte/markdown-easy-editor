import type { Metadata } from "next";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

export const metadata: Metadata = {
  title: "お問い合わせ｜LifeMargin",
  description: "LifeMarginへのお問い合わせ窓口です。サービスについてのご意見やご質問をお送りいただけます。",
  alternates: { canonical: "https://lifemargin.net/contact" },
};

const contactFormUrl = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <SiteHeader current="contact" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">Contact</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">お問い合わせ</h1>
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-sm leading-8 text-zinc-700 shadow-sm sm:p-8">
          <p>LifeMarginやMarkdown Easy Editorについてのご質問、ご意見、不具合のご連絡を受け付けています。</p>
          {contactFormUrl ? (
            <a className="mt-6 inline-flex rounded-full bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700" href={contactFormUrl} target="_blank" rel="noreferrer">お問い合わせフォームを開く</a>
          ) : (
            <p className="mt-6 rounded-lg bg-zinc-50 px-4 py-3 text-zinc-600">お問い合わせフォームは準備中です。公開前に運営者が指定するフォームURLを設定します。</p>
          )}
          <p className="mt-6 text-xs text-zinc-500">お問い合わせ内容には、パスワード、クレジットカード情報、公開前の機密情報などを記載しないでください。</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
