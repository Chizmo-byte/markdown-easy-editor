"use client";

import { useTheme } from "@/features/editor/theme/ThemeProvider";

/**
 * ライト／ダークの切り替えボタン。
 * アイコンの出し分けは dark バリアント（CSS）で行う。
 * state で切り替えるとSSRの結果とマウント直後で食い違い、hydrationの警告が出るため。
 */
export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="表示テーマを切り替える"
      title="表示テーマを切り替える"
      className="rounded-md border border-zinc-200 bg-white p-1.5 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
    >
      {/* ライトモード時：これから切り替わる先（ダーク）を示す月アイコン */}
      <svg
        className="h-4 w-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
      </svg>
      {/* ダークモード時：ライトへ戻す太陽アイコン */}
      <svg
        className="hidden h-4 w-4 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    </button>
  );
}
