/**
 * ルールベースDB（記号挿入パターン集）。
 *
 * 各ルールは純粋なデータ定義。挿入の実処理は applyRule が解釈する。
 * 新しい記法を追加したい場合は MARKDOWN_RULES に 1 レコード足すだけでよい。
 */

import type { ApplyResult, MarkdownRule, Selection } from "@/types";

/** ツールバーが提示する記号挿入ルール一覧。 */
export const MARKDOWN_RULES: readonly MarkdownRule[] = [
  {
    id: "bold",
    label: "太字",
    icon: "B",
    guide: "文字を **強調** します。選択して押すと太字になります。",
    prefix: "**",
    suffix: "**",
    placeholder: "太字テキスト",
    block: false,
  },
  {
    id: "italic",
    label: "斜体",
    icon: "I",
    guide: "文字を *斜め* にします。引用や補足に便利です。",
    prefix: "*",
    suffix: "*",
    placeholder: "斜体テキスト",
    block: false,
  },
  {
    id: "heading",
    label: "見出し",
    icon: "H",
    guide: "行頭に # を付けて見出しにします。文章の区切りに使います。",
    prefix: "## ",
    suffix: "",
    placeholder: "見出し",
    block: true,
  },
  {
    id: "list",
    label: "箇条書き",
    icon: "•",
    guide: "行頭に - を付けてリストにします。複数行を選ぶとまとめて変換します。",
    prefix: "- ",
    suffix: "",
    placeholder: "リスト項目",
    block: true,
  },
  {
    id: "quote",
    label: "引用",
    icon: "❝",
    guide: "行頭に > を付けて引用にします。誰かの発言の紹介などに。",
    prefix: "> ",
    suffix: "",
    placeholder: "引用文",
    block: true,
  },
  {
    id: "code",
    label: "コード",
    icon: "</>",
    guide: "`バッククォート` で囲んでコードを等幅表示します。",
    prefix: "`",
    suffix: "`",
    placeholder: "code",
    block: false,
  },
  {
    id: "link",
    label: "リンク",
    icon: "🔗",
    guide: "[表示文字](URL) の形式でリンクを作ります。",
    prefix: "[",
    suffix: "](https://)",
    placeholder: "リンクテキスト",
    block: false,
  },
] as const;

/** id からルールを取得する。存在しなければ undefined。 */
export function findRule(id: string): MarkdownRule | undefined {
  return MARKDOWN_RULES.find((rule) => rule.id === id);
}

/**
 * テキストの選択範囲へルールを適用し、結果テキストと新しい選択範囲を返す。
 *
 * - block ルール: 選択行の各行頭へ prefix を付与する。
 * - inline ルール: 選択範囲（空なら placeholder）を prefix/suffix で囲む。
 */
export function applyRule(
  text: string,
  selection: Selection,
  rule: MarkdownRule,
): ApplyResult {
  const start = Math.max(0, Math.min(selection.start, text.length));
  const end = Math.max(start, Math.min(selection.end, text.length));
  const selected = text.slice(start, end);

  if (rule.block) {
    return applyBlockRule(text, start, end, selected, rule);
  }
  return applyInlineRule(text, start, end, selected, rule);
}

function applyInlineRule(
  text: string,
  start: number,
  end: number,
  selected: string,
  rule: MarkdownRule,
): ApplyResult {
  const inner = selected.length > 0 ? selected : rule.placeholder;
  const replacement = `${rule.prefix}${inner}${rule.suffix}`;
  const nextText = text.slice(0, start) + replacement + text.slice(end);
  // 中身（inner）部分を選択状態にして、続けて入力しやすくする。
  const innerStart = start + rule.prefix.length;
  return {
    text: nextText,
    selection: { start: innerStart, end: innerStart + inner.length },
  };
}

function applyBlockRule(
  text: string,
  start: number,
  end: number,
  selected: string,
  rule: MarkdownRule,
): ApplyResult {
  const source = selected.length > 0 ? selected : rule.placeholder;
  const transformed = source
    .split("\n")
    .map((line) => `${rule.prefix}${line}`)
    .join("\n");
  const nextText = text.slice(0, start) + transformed + text.slice(end);
  return {
    text: nextText,
    selection: { start, end: start + transformed.length },
  };
}
