/**
 * プラットフォーム別テンプレート。
 *
 * このファイルは 2 つの用途を持つ:
 *
 *  1. ダウンロード用テンプレート（{@link applyTemplate}）
 *     浄化後テキストをプラットフォームの慣習に合わせてファイル化する。
 *     現行の LifeMargin エディタが使用する。
 *
 *  2. （レガシー）HTML 出力ラッパ（{@link OUTPUT_TEMPLATES} 他）
 *     初期スキャフォールドの HTML プレビュー用。現在は未使用だが、
 *     converter.ts 等が型参照しているため互換のため残している。
 *
 * いずれも純粋関数で構成し、副作用を持たない（ファイル保存は呼び出し側）。
 */

import type { TargetPlatform } from "@/lib/markdown/processor";
import type { OutputTemplate, Platform } from "@/types";

/* -------------------------------------------------------------------------- */
/* ダウンロード用テンプレート（現行）                                          */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* レガシー: HTML 出力ラッパ（初期スキャフォールド互換のため残置）            */
/* -------------------------------------------------------------------------- */

/** プラットフォームごとの HTML テンプレート定義。 */
export const OUTPUT_TEMPLATES: Record<Platform, OutputTemplate> = {
  standard: {
    platform: "standard",
    label: "標準",
    wrap: (html) => html,
  },
  github: {
    platform: "github",
    label: "GitHub",
    // GitHub の README プレビューを模した markdown-body ラッパ。
    wrap: (html) => `<div class="markdown-body">${html}</div>`,
  },
  note: {
    platform: "note",
    label: "note",
    // note は本文を記事コンテナで包む慣習に寄せる。
    wrap: (html) => `<article class="note-body">${html}</article>`,
  },
  zenn: {
    platform: "zenn",
    label: "Zenn",
    // Zenn の本文クラスに寄せる。
    wrap: (html) => `<div class="znc">${html}</div>`,
  },
};

/** プラットフォームのテンプレートを取得する。 */
export function getTemplate(platform: Platform): OutputTemplate {
  return OUTPUT_TEMPLATES[platform];
}

/** UI のセレクタ表示などに使うテンプレート一覧。 */
export function listTemplates(): readonly OutputTemplate[] {
  return Object.values(OUTPUT_TEMPLATES);
}
