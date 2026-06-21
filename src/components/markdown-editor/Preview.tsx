"use client";

/**
 * Preview — リアルタイムプレビュー。
 * ロジック層（converter）が生成した HTML を DOMPurify でサニタイズしてから表示する。
 *
 * サニタイズはブラウザ（クライアント）でのみ実行する。これにより、
 * 万一マークダウンに危険な HTML が含まれていても XSS を防ぐ。
 */

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface PreviewProps {
  /** convertMarkdown が生成した HTML 文字列。 */
  html: string;
}

export function Preview({ html }: PreviewProps) {
  // SSR とハイドレーション初回は空にし、マウント後にサニタイズ結果を反映する。
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    setSafeHtml(DOMPurify.sanitize(html));
  }, [html]);

  return (
    <div
      aria-label="プレビュー"
      className="markdown-preview h-full w-full overflow-auto bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
