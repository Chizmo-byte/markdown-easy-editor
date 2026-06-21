# CLAUDE.md — Markdown Easy Editor

AI 開発者向けの開発ガイドです。本リポジトリで作業する際は、必ずこのガイドの制約とルールに従ってください。

## 概要

初心者向けマークダウンエディタ **「Markdown Easy Editor」** の開発。
マークダウン記法に不慣れなユーザーでも、ボタン操作とリアルタイムプレビューで
迷わず文章を書けることを目的とする。完全クライアントサイドで動作する。

## 技術スタック

- **Next.js**（App Router）
- **TypeScript**（strict）
- **TailwindCSS**
- **Cloudflare Pages**（ホスティング / デプロイ先）
- マークダウン → HTML 変換: `marked`

## 環境制約（安定稼働の聖域）

- **Node.js v22 必須。** `.nvmrc` / `.node-version` で `22` に固定済み。
- **Node.js v24 は絶対禁止。** v24 ではビルド／開発サーバーがハングアップするため、
  いかなる理由があっても使用しないこと。
- `package.json` の `engines` で `"node": ">=22.0.0 <24.0.0"` を強制している。
  この範囲を緩めてはならない。
- Cloudflare Pages 用に `wrangler.toml` で
  `compatibility_flags = ["nodejs_compat"]` を設定済み。

## 開発ルール

- **パフォーマンス優先。** First Load JS を最小化する。重いライブラリの追加は避け、
  クライアントへ送るバンドルを常に意識する。
- **サーバーレス / クライアントサイド完結型の設計。**
  変換・プレビューはすべてブラウザ内で完結させる。サーバー側の状態やDBを持たない。
- **厳格な型定義の遵守。** `any` を避け、共通の型は `src/types` に集約する。
  `npx tsc --noEmit` がパスする状態を常に保つこと。
- **疎結合アーキテクチャ。** ロジック層（`src/lib/markdown`）は純粋な TS 関数とし、
  React/DOM へ依存させない。UI（`src/components`）はロジックを呼び出すだけにする。

## セキュリティ

- **依存ライブラリは最小限に。** 追加前に本当に必要か検討する。
- 依存追加時は `npm audit` 等でセキュリティチェックを実施する。
- マークダウンを HTML として描画するため、**XSS に注意**すること。
  信頼できない入力をそのまま `dangerouslySetInnerHTML` に渡さない方針を守る。

## ディレクトリ構成（疎結合）

```
src/
  app/
    page.tsx                 # メインエディタ画面
  components/
    markdown-editor/         # 専用UIコンポーネント（軽量設計）
      Editor.tsx             # 入力エリア
      Toolbar.tsx            # 記号挿入ボタン（アイコン＋ガイド付）
      Preview.tsx            # リアルタイムプレビュー（marked 利用）
      Tooltip.tsx            # 汎用ツールチップ
  lib/
    markdown/                # 【脳】ロジック層（純粋な TS 関数）
      rules.ts               # ルールベースDB（置換パターン集）
      templates.ts           # プラットフォーム別出力テンプレート
      converter.ts           # 変換エンジン
      utils.ts               # 共通ユーティリティ
  hooks/
    useMarkdown.ts           # 状態管理カスタムフック
  types/
    index.ts                 # 型定義
```

@AGENTS.md
