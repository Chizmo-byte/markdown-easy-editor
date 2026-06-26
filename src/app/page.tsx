"use client";

/**
 * LifeMargin メイン画面（エディタコア）。
 *
 * 「入力 → 変換 → ソースプレビュー」の基本フロー。
 * 左カラムに入力した文章を processMarkdown で整形し、右カラムへ
 * 整形後のマークダウンソースをそのまま表示する。
 *
 * 状態は text（入力）と mode（整形モード）の 2 つだけ。
 * 変換はリアルタイムだが、ラグ防止のため必ず useMemo でラップする。
 */

import { useMemo, useState } from "react";

import type { ProcessMode } from "@/lib/markdown/processor";
import { processMarkdown } from "@/lib/markdown/processor";
import { ModeSwitch } from "@/components/editor/ModeSwitch";
import { MarkdownInput } from "@/components/editor/MarkdownInput";
import { SourcePreview } from "@/components/editor/SourcePreview";

/**
 * 出力先プラットフォームの既定値。
 * まだ UI 上の選択肢を設けていないため、optimize モードのテーブル変換等を
 * 体験できるよう note を既定とする（将来プラットフォーム選択を追加する想定）。
 */
const DEFAULT_TARGET = "note" as const;

export default function Home() {
  const [text, setText] = useState<string>("");
  const [mode, setMode] = useState<ProcessMode>("easy");

  // リアルタイム変換。text / mode が変わったときだけ再計算する。
  const source = useMemo(
    () => processMarkdown(text, mode, DEFAULT_TARGET),
    [text, mode],
  );

  return (
    <div className="flex h-screen flex-col bg-white text-gray-900">
      <header className="flex h-16 items-center justify-between border-b bg-white p-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          LifeMargin
        </h1>
        <ModeSwitch mode={mode} onChange={setMode} />
      </header>

      <main className="grid h-[calc(100vh-64px)] grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="min-h-0 overflow-hidden">
          <MarkdownInput value={text} onChange={setText} />
        </div>
        <div className="min-h-0 overflow-hidden">
          <SourcePreview source={source} />
        </div>
      </main>
    </div>
  );
}
