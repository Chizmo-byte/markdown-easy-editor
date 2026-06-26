"use client";

/**
 * 左カラム（ツールバー + 入力 textarea）。
 *
 * textarea の参照を保持し、ツールバーから要求された記法挿入を実行する。
 * 挿入後はカーソル位置を復元し、即座にフォーカスを戻して連続入力できるようにする。
 * 本文の状態は親（page）が保持するため、変換結果は通常どおりプレビューへ反映される。
 */

import { useEffect, useRef } from "react";

import { EditorToolbar, type ToolbarAction } from "@/components/editor/EditorToolbar";
import { MarkdownInput } from "@/components/editor/MarkdownInput";

interface EditorPaneProps {
  /** 現在の入力テキスト。 */
  value: string;
  /** 入力変更時に呼ばれる。 */
  onChange: (value: string) => void;
}

interface InsertResult {
  text: string;
  selectionStart: number;
  selectionEnd: number;
}

/**
 * 記法挿入を適用し、新しいテキストと復元すべき選択範囲を返す（純粋関数）。
 *
 * - wrap: 選択ありは marker で囲み中身を選択状態に、選択なしは marker の間へカーソルを置く。
 * - insert: 選択範囲を snippet で置換し、その直後へカーソルを移動する。
 */
function applyAction(
  text: string,
  start: number,
  end: number,
  action: ToolbarAction,
): InsertResult {
  const before = text.slice(0, start);
  const selected = text.slice(start, end);
  const after = text.slice(end);

  if (action.kind === "wrap") {
    const { marker } = action;
    if (selected.length > 0) {
      const innerStart = start + marker.length;
      return {
        text: before + marker + selected + marker + after,
        selectionStart: innerStart,
        selectionEnd: innerStart + selected.length,
      };
    }
    const caret = start + marker.length;
    return {
      text: before + marker + marker + after,
      selectionStart: caret,
      selectionEnd: caret,
    };
  }

  const caret = start + action.snippet.length;
  return {
    text: before + action.snippet + after,
    selectionStart: caret,
    selectionEnd: caret,
  };
}

export function EditorPane({ value, onChange }: EditorPaneProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // 次の描画後に復元すべき選択範囲。挿入操作のときだけ設定する。
  const pendingSelection = useRef<{ start: number; end: number } | null>(null);

  // テキスト更新後に、選択範囲とフォーカスを復元する。
  useEffect(() => {
    const pending = pendingSelection.current;
    const el = textareaRef.current;
    if (!pending || !el) return;
    el.focus();
    el.setSelectionRange(pending.start, pending.end);
    pendingSelection.current = null;
  }, [value]);

  const handleInsert = (action: ToolbarAction) => {
    const el = textareaRef.current;
    if (!el) return;
    const result = applyAction(el.value, el.selectionStart, el.selectionEnd, action);
    pendingSelection.current = {
      start: result.selectionStart,
      end: result.selectionEnd,
    };
    onChange(result.text);
    el.focus();
  };

  return (
    <div className="flex h-full flex-col border-r">
      <EditorToolbar onInsert={handleInsert} />
      <div className="min-h-0 flex-1">
        <MarkdownInput
          value={value}
          onChange={onChange}
          textareaRef={textareaRef}
        />
      </div>
    </div>
  );
}
