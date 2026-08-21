import type { Metadata } from "next";
import { ThemeProvider } from "@/features/editor/theme/ThemeProvider";
import { THEME_INIT_SCRIPT } from "@/features/editor/theme/theme";

const editorUrl = "https://lifemargin.net/editor";

export const metadata: Metadata = {
  title: "Markdown Easy Editor｜学びながら書けるMarkdownエディタ",
  description:
    "Markdownの書き方を学びながら編集できる無料エディタ。見出し、太字、リスト、表、コードブロック、タスクリストをリアルタイムプレビューで確認できます。",
  alternates: {
    canonical: editorUrl,
  },
  openGraph: {
    type: "website",
    url: editorUrl,
    siteName: "LifeMargin",
    locale: "ja_JP",
    title: "Markdown Easy Editor｜学びながら書けるMarkdownエディタ",
    description:
      "Markdownの記法を学びながら、リアルタイムプレビュー付きで気軽に編集できる無料ツール。",
  },
  twitter: {
    card: "summary",
    title: "Markdown Easy Editor｜学びながら書けるMarkdownエディタ",
    description:
      "Markdownの記法を学びながら編集できる、リアルタイムプレビュー付き無料エディタ。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${editorUrl}#application`,
      name: "Markdown Easy Editor",
      url: editorUrl,
      description:
        "Markdownの書き方を学びながら編集できる無料のWebエディタ。",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      browserRequirements: "JavaScriptが有効なモダンブラウザ",
      isAccessibleForFree: true,
      inLanguage: "ja-JP",
      publisher: { "@type": "Organization", name: "LifeMargin", url: "https://lifemargin.net/" },
    },
    {
      "@type": "WebPage",
      "@id": `${editorUrl}#webpage`,
      url: editorUrl,
      name: "Markdown Easy Editor｜学びながら書けるMarkdownエディタ",
      description:
        "見出し、太字、リスト、表、コードブロックなどのMarkdown記法を、入力とプレビューで学べます。",
      isPartOf: { "@id": "https://lifemargin.net/#website" },
      about: { "@id": `${editorUrl}#application` },
      inLanguage: "ja-JP",
    },
  ],
};

export default function EditorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* children より前に同期実行させ、初回描画から正しい配色にする（FOUC対策）。 */}
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
