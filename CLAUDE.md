# CLAUDE.md — MarkdownEasyEditor

このファイルはClaude Code（Cursor経由）が作業前に必ず読む指示書です。
実装・コミット前に必ず全体を確認してください。

---

## プロジェクト概要

| 項目 | 内容 |
|------|------|
| プロジェクト名 | MarkdownEasyEditor |
| ブランド | LifeMargin（lifemargin.net・取得予定） |
| コンセプト | AI時代のMarkdown入門・教育型エディタ |
| ターゲット | AIツールに不慣れな人・Markdown初心者・非エンジニア |
| ローカルパス | `C:\Users\teram\Desktop\Claude\markdown-easy-editor` |
| リポジトリ | https://github.com/Chizmo-byte/markdown-easy-editor（Private） |
| ホスティング | Cloudflare Pages（予定） |
| ドメイン | lifemargin.net（取得予定） |

---

## 技術スタック

| 項目 | バージョン／詳細 |
|------|-----------------|
| Next.js | 16.2.9 |
| React | 19 |
| TypeScript | 最新安定版 |
| Tailwind CSS | v4 |
| Node.js | **v22系のみ（v24は動作不良・使用禁止）** |
| XSS対策 | DOMPurify |

---

## 環境・開発ルール（必読）

### ⚠️ Node.jsバージョン
- **v22系のみ使用**（現在 v22.22.3）
- v24は不具合あり・絶対に使用しない
- `.nvmrc` が存在する場合は必ず従うこと

### Git運用ルール
- **コミットまではClaude Codeが行う**
- **pushはChizmo本人が手動で行う**（Claude Codeはpushしない）
- 1回の指示で実装するのは**1機能のみ**
- `npm run dev` でローカル動作確認してからコミット
- **完了定義：** 実装後、`npm run build` が通り、ローカルで意図した挙動が確認できた時点でコミットすること（`npm run dev` だけではビルド時にのみ発生するエラーを見逃す可能性があるため）

### デプロイルール
- デプロイは最小限にまとめてから実施
- Cloudflare Pagesのビルド設定は以下を厳守：
  - Build command：`npx @cloudflare/next-on-pages@1`
  - Build output directory：`.vercel/output/static`
  - 環境変数：`NODE_VERSION = 22`
  - Compatibility Flags：`nodejs_compat`（Production・Preview両方に必須）

### コーディング方針
- TypeScriptの型を省略しない
- ユーザー入力は必ずサニタイズ（DOMPurify使用）
- コンポーネントは単一責任を保つ
- ChizmoToolsとは**別ブランド**として運用するため、chizmotools.comのコードや資材を流用しない

---

## AIツール構成と役割分担

| ツール | 役割 |
|--------|------|
| すあま（Gemma API・Discord） | 実装指示書の作成・タスク設計 |
| Claude.ai | プロジェクト方針レビュー・記事作成補助 |
| Claude Code（Cursor MCP） | 実装・コミット |

**すあまが指示書を作成 → Claude Codeが実装**という流れが基本です。
指示書に不明点がある場合は実装を止めてChizmoに確認すること。

---

## 収益化

- Google AdSense：`ca-pub-9656973492441310`
- 審査状況：再申請中（2026年6月18日申請）
- AdSense関連のコードを追加・変更する際はセキュリティチェックを実施すること

---

## セキュリティチェック

このプロジェクトにはsecurity-guidanceプラグインが導入されています。
以下のタイミングで必ずセキュリティチェックを実行してください：

- 新しいAPIエンドポイントを追加したとき
- ユーザー入力を処理するコードを追加・変更したとき
- 外部ライブラリを追加したとき
- 認証・セッション関連のコードを変更したとき
- git pushの前（重要な変更がある場合）

確認後、コミットまで行い、pushは自分でやります。
