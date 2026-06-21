"use client";

/**
 * useMarkdown — エディタの状態管理カスタムフック。
 *
 * テキスト本文・出力プラットフォーム・選択範囲を管理し、ロジック層
 * （converter / rules）を呼び出して派生値（プレビュー HTML・統計）を返す。
 * UI コンポーネントはこのフックを呼ぶだけでよい（疎結合）。
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Platform, Selection } from "@/types";
import { convertMarkdown } from "@/lib/markdown/converter";
import { applyRule, findRule } from "@/lib/markdown/rules";
import {
  countCharacters,
  countLines,
  countWords,
} from "@/lib/markdown/utils";

const INITIAL_MARKDOWN = `# Markdown Easy Editor へようこそ

これは **初心者向け** のマークダウンエディタです。

- 左に入力すると右にプレビューが出ます
- 上のボタンで記号をかんたんに挿入できます

> まずは自由に書きかえてみましょう！
`;

export interface MarkdownStats {
  characters: number;
  words: number;
  lines: number;
}

export interface UseMarkdownResult {
  markdown: string;
  setMarkdown: (value: string) => void;
  platform: Platform;
  setPlatform: (platform: Platform) => void;
  previewHtml: string;
  stats: MarkdownStats;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  /** ルール id を指定して記号を挿入する。 */
  insertRule: (ruleId: string) => void;
}

export function useMarkdown(): UseMarkdownResult {
  const [markdown, setMarkdown] = useState<string>(INITIAL_MARKDOWN);
  const [platform, setPlatform] = useState<Platform>("standard");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // 次の描画後に復元すべき選択範囲。
  const pendingSelection = useRef<Selection | null>(null);

  const previewHtml = useMemo(
    () => convertMarkdown(markdown, { platform, breaks: true }),
    [markdown, platform],
  );

  const stats = useMemo<MarkdownStats>(
    () => ({
      characters: countCharacters(markdown),
      words: countWords(markdown),
      lines: countLines(markdown),
    }),
    [markdown],
  );

  const insertRule = useCallback(
    (ruleId: string) => {
      const rule = findRule(ruleId);
      const el = textareaRef.current;
      if (!rule || !el) return;

      const selection: Selection = {
        start: el.selectionStart,
        end: el.selectionEnd,
      };
      const result = applyRule(el.value, selection, rule);
      pendingSelection.current = result.selection;
      setMarkdown(result.text);
    },
    [],
  );

  // テキスト更新後に、選択範囲とフォーカスを復元する。
  useEffect(() => {
    const target = pendingSelection.current;
    const el = textareaRef.current;
    if (!target || !el) return;
    el.focus();
    el.setSelectionRange(target.start, target.end);
    pendingSelection.current = null;
  }, [markdown]);

  return {
    markdown,
    setMarkdown,
    platform,
    setPlatform,
    previewHtml,
    stats,
    textareaRef,
    insertRule,
  };
}
