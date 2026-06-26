"use client";

/**
 * 出力先プラットフォームの切り替えスイッチ（note / Brain / Obsidian）。
 * 共通の {@link SegmentedControl} を用いた薄いラッパ。
 */

import type { TargetPlatform } from "@/lib/markdown/processor";
import { SegmentedControl } from "@/components/editor/SegmentedControl";

interface PlatformSwitchProps {
  /** 現在選択中のプラットフォーム。 */
  target: TargetPlatform;
  /** 選択変更時に呼ばれる。 */
  onChange: (target: TargetPlatform) => void;
}

const PLATFORM_OPTIONS = [
  { value: "note", label: "note" },
  { value: "brain", label: "Brain" },
  { value: "obsidian", label: "Obsidian" },
] as const;

export function PlatformSwitch({ target, onChange }: PlatformSwitchProps) {
  return (
    <SegmentedControl
      options={PLATFORM_OPTIONS}
      value={target}
      onChange={onChange}
      ariaLabel="出力先プラットフォーム"
    />
  );
}
