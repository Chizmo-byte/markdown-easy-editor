/**
 * LifeMargin ランディングページ（ルート /）。
 *
 * プラットフォームのコンセプトを「誠実・シンプル・大衆的」なトーンで伝える静的 LP。
 * 広告感や AI 感を排し、白・グレー・深い青の落ち着いた配色と十分な余白で、
 * 「書くこと・学ぶこと」への集中を促す。CTA から /editor へ誘導する。
 */

import Link from "next/link";

interface Feature {
  title: string;
  description: string;
}

const FEATURES: ReadonlyArray<Feature> = [
  {
    title: "ルールベースのクレンジング",
    description:
      "AIが残した不要な装飾やノイズを、決まったルールで静かに削ぎ落とします。意図しない書き換えはありません。",
  },
  {
    title: "プラットフォーム別テンプレート",
    description:
      "Brain・note・Obsidian など、投稿先に合わせた形へ自動で整形。媒体ごとの体裁を気にせず書けます。",
  },
  {
    title: "ワンクリックコピー",
    description:
      "整えた文章はそのままコピー、または保存。手間なく投稿フローへつなげられます。",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-wide text-blue-900">
            LifeMargin
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            書く時間を、価値ある時間に。
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600">
            不要な装飾を削ぎ落とし、思考を整理する。Brain, note, Obsidian
            に最適化した軽量マークダウンエディタ。
          </p>
          <div className="mt-10">
            <Link
              href="/editor"
              className="inline-flex items-center justify-center rounded-md bg-blue-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-950"
            >
              エディタを使う
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-sm font-bold tracking-wide text-gray-700">
            できること
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {FEATURES.map(({ title, description }) => (
              <li
                key={title}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white px-6 py-8">
        <p className="text-center text-xs text-gray-500">© 2026 LifeMargin</p>
      </footer>
    </div>
  );
}
