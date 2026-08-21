"use client";

import { useEffect, useRef, useState } from "react";
import { EditorToolbar, type ToolbarAction } from "@/features/editor/components/EditorToolbar";
import { MarkdownInput } from "@/features/editor/components/MarkdownInput";
import { EditorStats } from "@/features/editor/components/EditorStats";

interface EditorPaneProps { value: string; onChange: (value: string) => void; }
interface InsertResult { text: string; selectionStart: number; selectionEnd: number; }

function applyAction(text: string, start: number, end: number, action: ToolbarAction): InsertResult {
  if (action.kind === "wrap") {
    const selected = text.slice(start, end) || "文字";
    const replacement = `${action.marker}${selected}${action.marker}`;
    const nextStart = start + action.marker.length;
    return { text: text.slice(0, start) + replacement + text.slice(end), selectionStart: nextStart, selectionEnd: nextStart + selected.length };
  }

  if (action.kind === "link") {
    const selected = text.slice(start, end) || "リンク文字";
    const replacement = `[${selected}](URL)`;
    const urlStart = start + selected.length + 3;
    return { text: text.slice(0, start) + replacement + text.slice(end), selectionStart: urlStart, selectionEnd: urlStart + 3 };
  }

  if (action.kind === "insert") {
    const selected = text.slice(start, end);
    const fence = "```";
    const snippet = selected && action.label === "コードブロック" ? `${fence}\n${selected}\n${fence}` : action.snippet;
    const caret = start + snippet.length;
    return { text: text.slice(0, start) + snippet + text.slice(end), selectionStart: caret, selectionEnd: caret };
  }

  const lineStart = text.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  const lineEndIndex = text.indexOf("\n", end);
  const lineEnd = lineEndIndex === -1 ? text.length : lineEndIndex;
  const selectedLines = text.slice(lineStart, lineEnd);
  const lines = selectedLines.split("\n");
  const allPrefixed = lines.every((line) => line.startsWith(action.prefix));
  const updatedLines = lines.map((line, index) => {
    if (allPrefixed) return line.slice(action.prefix.length);
    if (action.prefix === "1. ") return `${index + 1}. ${line}`;
    return `${action.prefix}${line}`;
  });
  const replacement = updatedLines.join("\n");
  const delta = replacement.length - selectedLines.length;
  return {
    text: text.slice(0, lineStart) + replacement + text.slice(lineEnd),
    selectionStart: Math.max(lineStart, start + (allPrefixed ? -action.prefix.length : action.prefix.length)),
    selectionEnd: Math.max(lineStart, end + delta),
  };
}

export function EditorPane({ value, onChange }: EditorPaneProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const pendingSelection = useRef<{ start: number; end: number } | null>(null);
  const [activeHelp, setActiveHelp] = useState<string | null>(null);

  useEffect(() => {
    const pending = pendingSelection.current;
    const element = textareaRef.current;
    if (!pending || !element) return;
    element.focus();
    element.setSelectionRange(pending.start, pending.end);
    pendingSelection.current = null;
  }, [value]);

  const handleInsert = (action: ToolbarAction) => {
    const element = textareaRef.current;
    if (!element) return;
    const result = applyAction(element.value, element.selectionStart, element.selectionEnd, action);
    pendingSelection.current = { start: result.selectionStart, end: result.selectionEnd };
    onChange(result.text);
  };

  return (
    <div className="flex h-full min-h-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
      <EditorToolbar onInsert={handleInsert} activeHelp={activeHelp} onHelpChange={setActiveHelp} />
      <div className="min-h-0 flex-1">
        <MarkdownInput value={value} onChange={onChange} textareaRef={textareaRef} />
      </div>
      <EditorStats value={value} />
    </div>
  );
}
