"use client";

/**
 * LifeMargin エディタ画面（/editor・エディタコア）。
 *
 * 「入力 → 変換 → ソースプレビュー」の基本フロー。
 * 左カラムに入力した文章を processMarkdown で整形し、右カラムへ
 * 整形後のマークダウンソースをそのまま表示する。
 *
 * 状態は text（入力）/ mode（整形モード）/ target（出力先）の 3 つ。
 * 変換はリアルタイムだが、ラグ防止のため必ず useMemo でラップする。
 */

import { useMemo, useState } from "react";

import type { ProcessMode, TargetPlatform } from "@/lib/markdown/processor";
import { processMarkdown } from "@/lib/markdown/processor";
import { ModeSwitch } from "@/components/editor/ModeSwitch";
import { PlatformSwitch } from "@/components/editor/PlatformSwitch";
import { EditorPane } from "@/components/editor/EditorPane";
import { SourcePreview } from "@/components/editor/SourcePreview";
import { PreviewToolbar } from "@/components/editor/PreviewToolbar";
import { QuickStartGuide } from "@/components/editor/QuickStartGuide";

export default function EditorPage() {
  const [text, setText] = useState<string>("");
  const [mode, setMode] = useState<ProcessMode>("easy");
  const [target, setTarget] = useState<TargetPlatform>("note");

  // リアルタイム変換。text / mode / target が変わったときだけ再計算する。
  const source = useMemo(
    () => processMarkdown(text, mode, target),
    [text, mode, target],
  );

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white p-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          LifeMargin
        </h1>
        <div className="flex items-center gap-3">
          <ModeSwitch mode={mode} onChange={setMode} />
          <PlatformSwitch target={target} onChange={setTarget} />
        </div>
      </header>

      <main className="grid h-[calc(100vh-64px)] shrink-0 grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div className="min-h-0 overflow-hidden">
          <EditorPane value={text} onChange={setText} />
        </div>
        <div className="relative min-h-0 overflow-hidden">
          <SourcePreview source={source} />
          <PreviewToolbar source={source} target={target} />
        </div>
      </main>

      <QuickStartGuide />
    </div>
  );
}
