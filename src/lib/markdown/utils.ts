/**
 * 共通ユーティリティ（純粋関数）。
 * React/DOM へ依存しない。
 */

/** 文字数をカウントする。 */
export function countCharacters(text: string): number {
  return [...text].length;
}

/** 単語数をカウントする（空白区切り、日本語は文字数で近似）。 */
export function countWords(text: string): number {
  const trimmed = text.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}

/** 行数をカウントする。 */
export function countLines(text: string): number {
  if (text.length === 0) return 0;
  return text.split(/\r\n|\r|\n/).length;
}

/**
 * HTML 特殊文字をエスケープする。
 * 信頼できない文字列を安全に表示したい箇所で使用する。
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * 関数呼び出しを間引く debounce。
 * プレビュー更新など高頻度イベントの負荷軽減に使う。
 */
export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delayMs: number,
): (...args: A) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return (...args: A): void => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}
