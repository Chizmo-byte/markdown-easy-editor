import Link from "next/link";

export function SiteHeader({ current }: { current?: "editor" | "about" | "privacy" | "terms" | "contact" }) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="shrink-0 text-sm font-semibold tracking-wide text-zinc-900 hover:text-indigo-600">
          LifeMargin
        </Link>
        <nav aria-label="サイト内ナビゲーション" className="flex items-center gap-3 overflow-x-auto text-xs text-zinc-600 sm:gap-5">
          <Link className={current === "editor" ? "font-semibold text-indigo-700" : "hover:text-indigo-600"} href="/editor">Markdown Editor</Link>
          <Link className={current === "about" ? "font-semibold text-indigo-700" : "hover:text-indigo-600"} href="/about">LifeMarginについて</Link>
          <Link className={current === "contact" ? "font-semibold text-indigo-700" : "hover:text-indigo-600"} href="/contact">お問い合わせ</Link>
        </nav>
      </div>
    </header>
  );
}
