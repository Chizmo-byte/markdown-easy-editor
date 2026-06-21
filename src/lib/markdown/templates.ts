/**
 * プラットフォーム別出力テンプレート。
 *
 * 変換済み HTML をプラットフォームの慣習に合わせてラップ／整形する。
 * 純粋関数のみで構成し、副作用を持たない。
 */

import type { OutputTemplate, Platform } from "@/types";

/** プラットフォームごとのテンプレート定義。 */
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
