"use client";

import { useState } from "react";
import { MarkdownPreview } from "@/features/editor/components/MarkdownPreview";
import { EditorPane } from "@/features/editor/components/EditorPane";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

const SAMPLE_MARKDOWN = `# Markdownを始めよう

Markdownは、文章の構造を記号で表せる書き方です。

## AIがよく使う記法

- **太字**で大切な言葉を強調する
- [リンク](https://example.com)を追加する
- [ ] これからやること
- [x] できたこと

| 記法 | 用途 |
| --- | --- |
| # | 見出し |
| - | リスト |

> 記法にカーソルを合わせると説明が表示されます。

\`\`\`javascript
const message = "Hello Markdown";
\`\`\``;

interface LearningHint {
  title: string;
  description: string;
  example: string;
}

function getLearningHint(markdown: string): LearningHint {
  if (/^```/m.test(markdown)) return { title: "コードブロックを使っています", description: "複数行のコードやコマンドを、本文と区別して表示できます。", example: "```js → コードの種類も指定できます" };
  if (/^\s*\|.+\|\s*$/m.test(markdown) && /---/.test(markdown)) return { title: "表を使っています", description: "項目を行と列で比較・整理する記法です。", example: "| 項目 | 内容 |" };
  if (/^\s*- \[[ xX]\]/m.test(markdown)) return { title: "タスクリストを使っています", description: "作業の完了・未完了をチェックボックスで表せます。", example: "- [ ] 未完了 / - [x] 完了" };
  if (/^#{1,6}\s/m.test(markdown)) return { title: "見出しを使っています", description: "#の数で文章の階層を表します。見た目ではなく構造を作る記法です。", example: "# 大見出し → ## 中見出し" };
  if (/^\s*\d+[.)]\s/m.test(markdown)) return { title: "番号付きリストを使っています", description: "順番のある手順やランキングを表す記法です。", example: "1. 手順1 → 2. 手順2" };
  if (/^\s*>/m.test(markdown)) return { title: "引用を使っています", description: "本文とは別の発言や補足を、縦線付きで表示できます。", example: "> これは引用です" };
  if (/\*\*.+\*\*|~~.+~~/.test(markdown)) return { title: "文字装飾を使っています", description: "重要な言葉を太字にしたり、修正前の内容に取り消し線を付けたりできます。", example: "**太字** / ~~取り消し~~" };
  return { title: "まずは見出しを書いてみましょう", description: "文章の先頭に # と空白を入力すると、見出しとして表示されます。", example: "# Markdownを始めよう" };
}

export default function EditorPage() {
  const [text, setText] = useState("");
  const [showSample, setShowSample] = useState(true);
  const [view, setView] = useState<"split" | "editor" | "preview">("split");
  const [actionMessage, setActionMessage] = useState("");
  const markdown = showSample && text.length === 0 ? SAMPLE_MARKDOWN : text;
  const hint = getLearningHint(markdown);

  const handleChange = (value: string) => {
    setShowSample(false);
    setText(value);
  };
  const handleClear = () => {
    setShowSample(false);
    setText("");
    setActionMessage("");
  };
  const showActionMessage = (message: string) => {
    setActionMessage(message);
    window.setTimeout(() => setActionMessage(""), 2200);
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      showActionMessage("Markdownをコピーしました");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showActionMessage("Markdownをコピーしました");
    }
  };
  const handleDownload = () => {
    const requestedName = window.prompt("保存するファイル名を入力してください（.mdは自動で付きます）", "markdown-easy-editor");
    if (requestedName === null) return;
    const safeName = requestedName
      .trim()
      .replace(/\.md$/i, "")
      .replace(/[\\/:*?"<>|]/g, "-")
      .trim() || "markdown-easy-editor";
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${safeName}.md`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    showActionMessage(`${safeName}.mdを保存しました`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <SiteHeader current="editor" />
      <main className="flex flex-1 flex-col">
      <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-3 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Learning Markdown</p>
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">Markdown Easy Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-zinc-200 bg-zinc-50 p-0.5 md:hidden" role="group" aria-label="表示モード">
            {(["editor", "preview", "split"] as const).map((mode) => (
              <button key={mode} type="button" onClick={() => setView(mode)} className={`rounded px-2.5 py-1 text-xs ${view === mode ? "bg-zinc-800 text-white" : "text-zinc-600"}`}>
                {mode === "editor" ? "編集" : mode === "preview" ? "プレビュー" : "分割"}
              </button>
            ))}
          </div>
          <button type="button" onClick={handleCopy} className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50">コピー</button>
          <button type="button" onClick={handleDownload} className="rounded-md border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100">.md保存</button>
          <button type="button" onClick={handleClear} className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50">クリア</button>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col p-3 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-800">書いて、見て、覚える</h2>
            <p className="text-xs text-zinc-500">ボタンにカーソルを合わせると記法の使い方が分かります。</p>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-zinc-400 md:block">入力内容はこのブラウザ内で処理されます</p>
            <p className="min-h-4 text-xs text-emerald-600" role="status" aria-live="polite">{actionMessage}</p>
          </div>
        </div>

        <div className="mb-3 flex items-start gap-3 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2.5 text-xs text-indigo-950">
          <span className="mt-0.5 rounded bg-indigo-200 px-1.5 py-0.5 font-bold text-indigo-800">学習ヒント</span>
          <div className="min-w-0">
            <p className="font-semibold">{hint.title}</p>
            <p className="mt-0.5 text-indigo-800">{hint.description}</p>
            <code className="mt-1 block text-[11px] text-indigo-700">{hint.example}</code>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm md:min-h-[calc(100vh-196px)]">
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            <div className={`${view === "preview" ? "hidden md:block" : "block"} min-h-0`}><EditorPane value={text} onChange={handleChange} /></div>
            <div className={`${view === "editor" ? "hidden md:block" : "block"} min-h-0 border-t border-zinc-200 md:border-l md:border-t-0`}>
              <div className="flex h-full min-h-0 flex-col">
                <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-2"><span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Preview</span><span className="text-[11px] text-zinc-400">リアルタイム表示</span></div>
                <div className="min-h-0 flex-1"><MarkdownPreview markdown={markdown} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto mt-8 w-full max-w-[1600px] border-t border-zinc-200 px-3 py-10 text-sm leading-7 text-zinc-700 sm:px-5" aria-labelledby="editor-guide-title">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">Markdown Guide</p>
            <h2 id="editor-guide-title" className="mt-2 text-xl font-bold tracking-tight text-zinc-900">Markdownを学びながら、見た目を確認できる無料エディタ</h2>
            <p className="mt-3">Markdown Easy Editorは、Markdownの記号と表示結果を同時に確認できる学習向けの無料Webエディタです。AIが生成した文章やメモを貼り付けて、見出し、強調、リスト、リンク、引用、表、コードブロックなどの記法を気軽に試せます。</p>
            <p className="mt-3">左側にMarkdownを書き、右側のプレビューで結果を確認してください。ツールバーのボタンにカーソルを合わせると、記法の意味と入力例が表示されます。</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900">対応している主な記法</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              <li>見出し（#）</li>
              <li>太字・斜体</li>
              <li>箇条書き</li>
              <li>番号付きリスト</li>
              <li>リンク・引用</li>
              <li>表・タスク</li>
              <li>コードブロック</li>
              <li>取り消し線</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <details className="rounded-lg border border-zinc-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold text-zinc-900">Markdownとは何ですか？</summary>
            <p className="mt-2">Markdownは、記号を使って見出しやリストなどの文章構造を表現する軽量な書き方です。シンプルなテキストとして保存でき、ブログ、README、メモ、AIへの指示文など幅広く使われています。</p>
          </details>
          <details className="rounded-lg border border-zinc-200 bg-white p-4">
            <summary className="cursor-pointer font-semibold text-zinc-900">入力した内容は保存されますか？</summary>
            <p className="mt-2">このエディタは入力とプレビューをブラウザ内で処理します。現在の画面を閉じる前に、必要なMarkdownをコピーして保存してください。</p>
          </details>
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
