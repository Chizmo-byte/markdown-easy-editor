"use client";

/**
 * メインエディタ画面。
 * useMarkdown フックで状態を取得し、UI コンポーネントを組み合わせるだけ（疎結合）。
 */

import type { Platform } from "@/types";
import { useMarkdown } from "@/hooks/useMarkdown";
import { listTemplates } from "@/lib/markdown/templates";
import { Editor } from "@/components/markdown-editor/Editor";
import { Preview } from "@/components/markdown-editor/Preview";
import { Toolbar } from "@/components/markdown-editor/Toolbar";

export default function Home() {
  const {
    markdown,
    setMarkdown,
    platform,
    setPlatform,
    previewHtml,
    stats,
    textareaRef,
    insertRule,
  } = useMarkdown();

  return (
    <div className="flex h-dvh flex-col bg-white dark:bg-zinc-950">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <div>
          <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Markdown Easy Editor
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            初心者向け・ブラウザだけで完結するマークダウンエディタ
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <span>出力先</span>
          <select
            value={platform}
            onChange={(event) => setPlatform(event.target.value as Platform)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {listTemplates().map((template) => (
              <option key={template.platform} value={template.platform}>
                {template.label}
              </option>
            ))}
          </select>
        </label>
      </header>

      <Toolbar onInsert={insertRule} />

      <main className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-2">
        <section className="min-h-0 border-b border-zinc-200 md:border-b-0 md:border-r dark:border-zinc-800">
          <Editor
            value={markdown}
            onChange={setMarkdown}
            textareaRef={textareaRef}
          />
        </section>
        <section className="min-h-0">
          <Preview html={previewHtml} />
        </section>
      </main>

      <footer className="flex items-center gap-4 border-t border-zinc-200 px-4 py-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <span>{stats.characters} 文字</span>
        <span>{stats.words} 語</span>
        <span>{stats.lines} 行</span>
      </footer>
    </div>
  );
}
