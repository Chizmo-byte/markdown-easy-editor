/**
 * マークダウン整形（クレンジング）ロジック。
 *
 * AI が生成した文章や、コピー＆ペーストで崩れたマークダウンを
 * 読みやすい標準形へ整える純粋関数群。外部状態へ依存せず、
 * 同じ入力に対して常に同じ出力を返す（決定論的・非破壊的）。
 *
 * 入口は {@link processMarkdown} のみ。内部の各ステップは
 * 「行配列を受け取り行配列を返す」もしくは「文字列を受け取り文字列を返す」
 * 小さな純粋関数に分割している。
 *
 * 注意: この `processor.ts` は整形ロジック専用であり、ツールバーの
 * 記号挿入ルール（`rules.ts` の MARKDOWN_RULES）とは責務が異なる。
 */

/** 整形モード。easy=初心者向けの体裁修正 / optimize=ノイズ除去と最適化。 */
export type ProcessMode = "easy" | "optimize";

/** 出力先プラットフォーム（optimize モードでのみ参照）。 */
export type TargetPlatform = "note" | "brain" | "obsidian";

/**
 * マークダウンを整形して返す。
 *
 * パイプライン:
 *  1. 共通ルール（前後トリム・連続改行の圧縮・行末空白除去）
 *  2. モード別処理（easy / optimize）
 *  3. 共通ルールを再適用して最終正規化
 *
 * @param text   入力マークダウン（書き換えず、新しい文字列を返す）
 * @param mode   整形モード
 * @param target 出力先（optimize モードのみ有効）
 */
export function processMarkdown(
  text: string,
  mode: ProcessMode,
  target?: TargetPlatform,
): string {
  // Step A: 共通ルール
  let result = applyCommonRules(text);

  // Step B: モード別処理
  result = mode === "easy"
    ? applyEasyMode(result)
    : applyOptimizeMode(result, target);

  // 変換で生じた行末空白・余分な空行を最終的に整える
  return applyCommonRules(result);
}

/* -------------------------------------------------------------------------- */
/* Step A: 共通ルール                                                          */
/* -------------------------------------------------------------------------- */

/**
 * 全モード共通の正規化。
 * - 各行末の不要な空白（スペース・タブ）を除去
 * - 3 回以上の連続改行を最大 2 回（空行 1 行）に圧縮
 * - 文書全体の先頭・末尾の空白／改行を除去
 */
function applyCommonRules(text: string): string {
  // 改行コードを LF に統一してから処理する（CRLF/CR 混在対策）。
  const normalized = text.replace(/\r\n?/g, "\n");
  return normalized
    .replace(/[ \t]+$/gm, "") // 行末空白
    .replace(/\n{3,}/g, "\n\n") // 連続改行の圧縮
    .trim(); // 前後の空白・改行
}

/* -------------------------------------------------------------------------- */
/* Step B-1: Easy モード                                                       */
/* -------------------------------------------------------------------------- */

/** 初心者向けの体裁修正をまとめて適用する。 */
function applyEasyMode(text: string): string {
  let result = ensureHeadingSpacing(text);
  result = normalizeListMarkers(result);
  result = collapseDecorationRuns(result);
  return result;
}

const HEADING_RE = /^#{1,6}\s/;

/**
 * 見出し（# 〜 ######）の直前に空行がなければ挿入する。
 * ただし文頭の見出しには挿入しない。
 */
function ensureHeadingSpacing(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];

  for (const line of lines) {
    const prev = out[out.length - 1];
    const needsBlank =
      HEADING_RE.test(line) && out.length > 0 && prev.trim() !== "";
    if (needsBlank) out.push("");
    out.push(line);
  }

  return out.join("\n");
}

/**
 * リストマーカー（- / *）の直後にスペースがなければ挿入する。
 *
 * 装飾記号との誤検知を避けるため、マーカーの直後が
 * 空白・別のマーカー（* -）でない場合のみ対象とする。
 * 例: "-項目" → "- 項目" / "***" や "**強調**" は対象外。
 */
function normalizeListMarkers(text: string): string {
  return text.replace(/^(\s*)([-*])(?=[^\s*\-])/gm, "$1$2 ");
}

/** 水平線（HR）的な装飾行を表す記号。 */
const DECORATION_RE = /^\s*([-*_=])\1{2,}\s*$/;

/** 装飾行であればその記号文字を、そうでなければ null を返す。 */
function decorationSymbol(line: string): string | null {
  const match = DECORATION_RE.exec(line);
  return match ? match[1] : null;
}

/**
 * 同一の装飾記号（*** や --- 等）が 3 行以上連続する場合、1 本に集約する。
 * 異なる記号が混在する連続は集約対象としない。
 */
function collapseDecorationRuns(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const symbol = decorationSymbol(lines[i]);
    if (symbol === null) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    // 同じ記号の装飾行が続く範囲 [i, j) を求める。
    let j = i + 1;
    while (j < lines.length && decorationSymbol(lines[j]) === symbol) j += 1;

    const runLength = j - i;
    if (runLength >= 3) {
      out.push(lines[i]); // 3 行以上 → 先頭の 1 本だけ残す
    } else {
      for (let k = i; k < j; k += 1) out.push(lines[k]);
    }
    i = j;
  }

  return out.join("\n");
}

/* -------------------------------------------------------------------------- */
/* Step B-2: Optimize モード                                                   */
/* -------------------------------------------------------------------------- */

/**
 * ノイズ除去・最適化をまとめて適用する。
 *
 * optimize は「最良の出力」を目指すモードであり、easy の体裁修正
 * （見出し前の空行・リストマーカー正規化・装飾行の集約）も内包する。
 * その上で AI ノイズ除去・Obsidian 記法の標準化・プラットフォーム最適化を行う。
 */
function applyOptimizeMode(text: string, target?: TargetPlatform): string {
  // 1. ノイズ・固有記法の除去
  let result = removeAiIntro(text);
  result = stripObsidianSyntax(result); // WikiLink / ブロック ID
  result = normalizeCallouts(result); // コールアウト → 単純な引用
  result = reduceExcessiveBold(result);

  // 2. easy 相当の体裁修正
  result = ensureHeadingSpacing(result);
  result = normalizeListMarkers(result);
  result = collapseDecorationRuns(result);

  // 3. プラットフォーム別最適化
  if (target === "note" || target === "brain") {
    result = convertTablesToList(result);
    result = dedentDeepLists(result);
  }
  // target === "obsidian" / 未指定 の場合は GFM 標準形を維持する。

  return result;
}

/** AI が付けがちな定型の前置き文。完全一致した行を削除する。 */
const AI_INTRO_PATTERNS: readonly RegExp[] = [
  /^(承知いたしました|承知しました|以下に|こちらが).*?(です|ます|いたします)。?$/,
  /^はい[、,]?\s*(マークダウン形式で|整理して)作成しました。?$/,
];

/**
 * AI 生成文によくある導入文（「承知いたしました…」等）を行単位で除去する。
 */
function removeAiIntro(text: string): string {
  return text
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      return !AI_INTRO_PATTERNS.some((pattern) => pattern.test(trimmed));
    })
    .join("\n");
}

/**
 * Obsidian 固有記法を標準マークダウンへ変換／除去する。
 * - [[WikiLink]] / [[target|alias]] → 表示名（alias 優先）
 * - 行末のブロック ID（^blockid）→ 削除
 *
 * コールアウトの変換は行をまたぐ判定が必要なため {@link normalizeCallouts} が担う。
 */
function stripObsidianSyntax(text: string): string {
  let result = text;

  // WikiLink: エイリアスがあればそちらを、なければリンク先名を残す。
  result = result.replace(/\[\[([^\[\]]+)\]\]/g, (_match, inner: string) => {
    const parts = inner.split("|");
    return (parts.length > 1 ? parts[1] : parts[0]).trim();
  });

  // ブロック ID: 行末の "^id" を（直前の空白ごと）削除する。
  result = result.replace(/(^|[ \t])\^[A-Za-z0-9_-]+(?=[ \t]*$)/gm, "");

  return result;
}

/** "> [!TYPE] タイトル"（正規のコールアウト）にマッチ。 */
const CALLOUT_PROPER_RE = /^(\s*>)\s*\[![^\]\n]+\][-+]?[ \t]*(.*)$/;
/** "[!TYPE] タイトル"（> が欠けた崩れたコールアウト）にマッチ。 */
const CALLOUT_BARE_RE = /^\s*\[![^\]\n]+\][-+]?[ \t]*(.*)$/;

/**
 * Obsidian のコールアウトを単純な引用（>）へ変換する。
 *
 * - 正規形 "> [!INFO] 本文" → "> 本文"（タグのみ削除）
 * - 崩れた形 "[!TIP]"（> なし）→ タグ行を削除し、続く非空行を引用化する。
 *   AI 出力でしばしば見られる「> が抜けたコールアウト」を救済する目的。
 */
function normalizeCallouts(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const proper = CALLOUT_PROPER_RE.exec(lines[i]);
    if (proper) {
      const [, prefix, title] = proper;
      out.push(title.length > 0 ? `${prefix} ${title}` : prefix);
      i += 1;
      continue;
    }

    const bare = CALLOUT_BARE_RE.exec(lines[i]);
    if (bare) {
      const title = bare[1];
      if (title.length > 0) out.push(`> ${title}`);
      i += 1;
      // タグの後に続く非空行（コールアウト本文）を引用へ変換する。
      while (i < lines.length && lines[i].trim() !== "") {
        out.push(`> ${lines[i].replace(/^\s*>?[ \t]?/, "")}`);
        i += 1;
      }
      continue;
    }

    out.push(lines[i]);
    i += 1;
  }

  return out.join("\n");
}

/**
 * 1 行に太字（**text**）が 3 箇所以上ある場合、視覚的ノイズとみなして
 * その行の太字をすべて解除する（文字自体は維持）。
 */
function reduceExcessiveBold(text: string): string {
  const boldSpan = /\*\*[^*\n]+\*\*/g;
  return text
    .split("\n")
    .map((line) => {
      const matches = line.match(boldSpan);
      if (matches && matches.length >= 3) {
        return line.replace(/\*\*([^*\n]+)\*\*/g, "$1");
      }
      return line;
    })
    .join("\n");
}

/* ---- プラットフォーム別（note / brain） ---- */

/** 行が表の一行（| 〜 |）かどうか。 */
function isTableRow(line: string): boolean {
  return /^\s*\|.*\|\s*$/.test(line);
}

/** "| a | b |" を ["a", "b"] へ分解する（前後のパイプを除去）。 */
function parseTableRow(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((cell) => cell.trim());
}

/** 区切り行（| --- | :--: | 等）かどうか。 */
function isSeparatorRow(line: string): boolean {
  if (!isTableRow(line)) return false;
  const cells = parseTableRow(line);
  return cells.length > 0 && cells.every((c) => /^:?-{1,}:?$/.test(c));
}

/**
 * GFM テーブルを「項目名: 内容」形式の箇条書きリストへ変換する。
 * note / brain はテーブル表示が崩れやすいため、行ごとに展開する。
 */
function convertTablesToList(text: string): string {
  const lines = text.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const isTableHead =
      isTableRow(lines[i]) &&
      i + 1 < lines.length &&
      isSeparatorRow(lines[i + 1]);

    if (!isTableHead) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const header = parseTableRow(lines[i]);
    let j = i + 2;
    const dataRows: string[][] = [];
    while (j < lines.length && isTableRow(lines[j]) && !isSeparatorRow(lines[j])) {
      dataRows.push(parseTableRow(lines[j]));
      j += 1;
    }

    out.push(...tableToBullets(header, dataRows));
    i = j;
  }

  return out.join("\n");
}

/**
 * テーブルの見出し行・データ行から箇条書き行を生成する。
 *
 * - 2 列テーブル（キー: 値）: 各行を「左: 右」に展開する。見出し行も含める。
 * - 3 列以上: データ行ごとに「列名: 値」を並べ、レコード間を空行で区切る。
 */
function tableToBullets(header: string[], dataRows: string[][]): string[] {
  if (header.length === 2) {
    return [header, ...dataRows].map(
      (row) => `- ${row[0] ?? ""}: ${row[1] ?? ""}`,
    );
  }

  const out: string[] = [];
  dataRows.forEach((row, rowIndex) => {
    header.forEach((label, col) => {
      const name = label.length > 0 ? label : `列${col + 1}`;
      out.push(`- ${name}: ${row[col] ?? ""}`);
    });
    if (rowIndex < dataRows.length - 1) out.push("");
  });
  return out;
}

/** リスト項目行（順序なし／順序付き、インデントあり）にマッチ。 */
const INDENTED_LIST_RE = /^( {2,})([-*+]|\d+\.)\s/;

/**
 * 深くネストしたリスト（インデント 4 スペース以上）を 1 段階浅くする。
 * 表示崩れ防止のため、第 1 階層（2 スペース）の体裁は維持する。
 */
function dedentDeepLists(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      const match = INDENTED_LIST_RE.exec(line);
      if (!match) return line;
      const indent = match[1].length;
      if (indent < 4) return line; // 第 1 階層はそのまま
      return line.slice(2); // 1 段階（2 スペース）浅くする
    })
    .join("\n");
}
