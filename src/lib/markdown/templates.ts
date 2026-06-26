/**
 * プラットフォーム別のダウンロードテンプレート。
 *
 * 浄化後テキストを各プラットフォームの慣習に合わせてファイル化する。
 * 純粋関数のみで構成し、副作用を持たない（ファイル保存は呼び出し側の責務）。
 */

import type { TargetPlatform } from "@/lib/markdown/processor";

/** ダウンロードファイルの生成結果。 */
export interface ExportFile {
  /** 保存時のファイル名。 */
  fileName: string;
  /** ファイル本文。 */
  content: string;
}

/** 現在のローカル日付を YYYY-MM-DD 形式で返す。 */
function currentDateIso(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * 浄化後テキストをプラットフォーム別のファイルへ整形する（非破壊）。
 *
 * - note / brain: 純粋な浄化後テキストをそのまま .txt として返す。
 * - obsidian: 文頭に YAML frontmatter（date / source）を付与した .md を返す。
 *
 * @param text   浄化後のマークダウンソース
 * @param target 出力先プラットフォーム
 */
export function applyTemplate(
  text: string,
  target: TargetPlatform,
): ExportFile {
  if (target === "obsidian") {
    const frontmatter =
      `---\n` +
      `date: ${currentDateIso()}\n` +
      `source: LifeMargin\n` +
      `---\n\n`;
    return { fileName: "lifemargin_note.md", content: frontmatter + text };
  }

  // note / brain は純粋な浄化後テキストをそのまま保存する。
  return { fileName: "lifemargin_export.txt", content: text };
}
