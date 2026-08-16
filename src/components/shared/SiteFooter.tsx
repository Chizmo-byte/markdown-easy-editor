import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-8 text-xs text-zinc-500 sm:px-6">
        <div>
          <Link href="/" className="font-semibold tracking-wide text-zinc-800 hover:text-indigo-600">LifeMargin</Link>
          <p className="mt-1">考える時間と書く時間に、余白を。</p>
        </div>
        <nav aria-label="フッターナビゲーション" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/about" className="hover:text-indigo-600">運営者情報</Link>
          <Link href="/privacy" className="hover:text-indigo-600">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-indigo-600">利用規約</Link>
          <Link href="/contact" className="hover:text-indigo-600">お問い合わせ</Link>
          <Link href="/editor" className="hover:text-indigo-600">Markdown Editor</Link>
        </nav>
        <p>© {new Date().getFullYear()} LifeMargin</p>
      </div>
    </footer>
  );
}
