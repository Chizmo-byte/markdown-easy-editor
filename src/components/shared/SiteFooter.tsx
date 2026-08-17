import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#d8d5d2] bg-[#201e1d] text-[#f3f2f2]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 px-4 py-10 sm:px-6">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Link href="/" className="font-serif text-xl font-bold tracking-tight hover:text-[#9fe870]">LifeMargin</Link>
            <p className="mt-2 max-w-sm text-sm leading-7 text-[#c8c3bf]">考える時間と書く時間に、余白を。</p>
          </div>
          <div className="flex items-end gap-1" aria-hidden="true">
            <span className="h-2 w-8 bg-[#0088b0]" />
            <span className="h-2 w-8 bg-[#d6006c]" />
            <span className="h-2 w-8 bg-[#b9a400]" />
            <span className="h-2 w-8 bg-[#9fe870]" />
          </div>
        </div>
        <nav aria-label="フッターナビゲーション" className="flex flex-wrap gap-x-5 gap-y-3 border-t border-[#4a4542] pt-6 text-xs text-[#c8c3bf]">
          <Link href="/about" className="hover:text-[#9fe870]">運営者情報</Link>
          <Link href="/privacy" className="hover:text-[#9fe870]">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-[#9fe870]">利用規約</Link>
          <Link href="/contact" className="hover:text-[#9fe870]">お問い合わせ</Link>
          <Link href="/editor" className="hover:text-[#9fe870]">Markdown Editor</Link>
        </nav>
        <p className="text-[11px] text-[#8e8883]">© {new Date().getFullYear()} LifeMargin</p>
      </div>
    </footer>
  );
}
