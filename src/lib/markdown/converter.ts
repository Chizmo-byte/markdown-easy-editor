/**
 * 変換エンジン。
 *
 * マークダウン文字列を HTML へ変換し、プラットフォーム別テンプレートで
 * ラップして返す。`marked` を同期モードで利用し、完全にクライアント内で完結する。
 *
 * セキュリティ: 入力はユーザー自身が書いたものを想定する。第三者由来の
 * マークダウンを描画する用途に転用する場合は、別途サニタイズを挟むこと。
 */

import { marked } from "marked";

import type { ConvertOptions } from "@/types";
import { getTemplate } from "@/lib/markdown/templates";

/** 既定の変換オプション。 */
export const DEFAULT_CONVERT_OPTIONS: ConvertOptions = {
  platform: "standard",
  breaks: true,
};

/**
 * マークダウンを HTML 文字列へ変換する。
 * プラットフォームテンプレートでラップした結果を返す。
 */
export function convertMarkdown(
  markdown: string,
  options: ConvertOptions = DEFAULT_CONVERT_OPTIONS,
): string {
  const html = marked.parse(markdown, {
    async: false,
    gfm: true,
    breaks: options.breaks,
  });
  return getTemplate(options.platform).wrap(html);
}
