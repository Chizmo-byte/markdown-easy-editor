/**
 * 共通型定義。
 * UI 層・ロジック層の双方から参照される。React/DOM へは依存しない。
 */

/** 出力先プラットフォーム。プラットフォーム別テンプレートの選択に使う。 */
export type Platform = "standard" | "github" | "note" | "zenn";

/**
 * 記号挿入ルール（ルールベースDBの 1 レコード）。
 * 純粋なデータ定義であり、挿入処理はロジック層が解釈する。
 */
export interface MarkdownRule {
  /** 一意な識別子 */
  id: string;
  /** ツールバーに表示するラベル */
  label: string;
  /** ボタンに表示するアイコン（絵文字 / 短い記号） */
  icon: string;
  /** ツールチップに表示する初心者向けガイド */
  guide: string;
  /** 選択範囲の前に挿入する文字列 */
  prefix: string;
  /** 選択範囲の後に挿入する文字列 */
  suffix: string;
  /** 選択範囲が空のときに挿入するプレースホルダ */
  placeholder: string;
  /**
   * 行頭に作用するブロック要素か。
   * true の場合、選択行の各行頭へ prefix を付与する。
   */
  block: boolean;
}

/** テキストエリアの選択範囲。 */
export interface Selection {
  start: number;
  end: number;
}

/** ルール適用後のテキストと、適用後に復元すべき選択範囲。 */
export interface ApplyResult {
  text: string;
  selection: Selection;
}

/** 変換オプション。 */
export interface ConvertOptions {
  /** 出力先プラットフォーム */
  platform: Platform;
  /** 改行を <br> に変換するか */
  breaks: boolean;
}

/** プラットフォーム別の出力テンプレート定義。 */
export interface OutputTemplate {
  platform: Platform;
  /** UI 表示用の名称 */
  label: string;
  /** 変換後 HTML をラップ・整形する関数 */
  wrap: (html: string) => string;
}
