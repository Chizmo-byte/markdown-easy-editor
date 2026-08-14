"use client";

import { useState } from "react";

import { MarkdownPreview } from "@/components/editor/MarkdownPreview";
import { EditorPane } from "@/components/editor/EditorPane";

const SAMPLE_MARKDOWN = `# Markdownを始めよう

Markdownは、文章の構造を記号で表せる書き方です。

## できること

- **太字**で大切な言葉を強調する
- [リンク](https://example.com)を追加する
- > 引用を分かりやすく表示する

まずは左側の文章を書き換えてみてください。`;

export default function EditorPage() {
  const [text, setText] = useState("");
  const [showSample, setShowSample] = useState(true);
  const [view, setView] = useState<"split" | "editor" | "preview">("split");

  const markdown = showSample && text.length === 0 ? SAMPLE_MARKDOWN : text;

  const handleChange = (value: string) => {
    setShowSample(false);
    setText(value);
  };

  const handleClear = () => {
    setShowSample(false);
    setText("");
  };

  return (
    <main className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Learning Markdown</p>
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">Markdown Easy Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-zinc-200 bg-zinc-50 p-0.5 md:hidden" role="group" aria-label="表示モード">
            {(["editor", "preview", "split"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={`rounded px-2.5 py-1 text-xs ${view === mode ? "bg-zinc-800 text-white" : "text-zinc-600"}`}
              >
                {mode === "editor" ? "編集" : mode === "preview" ? "プレビュー" : "分割"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
          >
            クリア
          </button>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-800">書いて、見て、覚える</h2>
            <p className="text-xs text-zinc-500">ボタンにカーソルを合わせると記法の使い方が分かります。</p>
          </div>
          <p className="hidden text-xs text-zinc-400 md:block">入力内容はこのブラウザ内で処理されます</p>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm md:min-h-[calc(100vh-150px)]">
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            <div className={`${view === "preview" ? "hidden md:block" : "block"} min-h-0`}>
              <EditorPane value={text} onChange={handleChange} />
            </div>
            <div className={`${view === "editor" ? "hidden md:block" : "block"} min-h-0 border-t border-zinc-200 md:border-l md:border-t-0`}>
              <div className="flex h-full min-h-0 flex-col">
                <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Preview</span>
                  <span className="text-[11px] text-zinc-400">リアルタイム表示</span>
                </div>
                <div className="min-h-0 flex-1">
                  <MarkdownPreview markdown={markdown} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
