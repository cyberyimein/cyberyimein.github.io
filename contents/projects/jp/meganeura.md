# Meganeura：業務能力を通じて Agent に実行を委譲する

Meganeura は個人で開発している Agent Runtime プロジェクトである。外部 Agent が要求を理解し、内部 Runtime が業務知識を読み込んでタスクを実行する。ネイティブ macOS Gateway はユーザーのブラウザーと Blender に接続する。現在は v0.1.0 を公開し、操作可能なタスク画面と管理画面を備えている。

## 背景と目標

Anomalo の Harness で得た経験を基に、使い慣れた Agent から業務を依頼しつつ、操作手順、業務 Skill、ツール設定を実行側に保持する仕組みを探っている。公開 Capability は入力と結果を定義する業務契約であり、内部の業務資産は Know-how Vault に保存する。

## 設計と実装

Interaction Agent は対話と業務委譲を担当し、Execution Model は独立した設定とコンテキストで実行を処理する。タスク Runtime はワークフローに必要な資産のバージョンを読み込み、SQLite checkpoint を保存する。進捗はイベントで通知し、ログイン、追加入力、送信確認が必要な場合は停止する。

Gateway は Runtime にアウトバウンド接続し、ローカル MCP アダプターを必要に応じて管理して JSON-RPC を中継する。ブラウザー経路は固定バージョンの Playwright MCP と公式拡張を使い、ユーザーが選んだタブに接続する。Blender 経路は起動済みのローカル Blender MCP に接続する。業務ポリシーとツール認可は Runtime が担当する。

## 現在の機能

- REST / MCP によるタスクの作成、照会、取消、追加入力、イベント購読。
- 内部 Skill、Prompt、Tool、MCP 設定、資産バージョン、ワークフロー依存関係、モデル設定の管理。
- 経費申請フローでのブラウザーログイン引継ぎ、フォーム入力、最終送信確認。
- 実験段階の Blender アダプターによるオブジェクト作成と、タスク画面への画像結果の返却。
- Vue Dashboard と SwiftUI Gateway の中国語、日本語、英語対応。画面は操作と状態を中心とし、インストール手順とデバッグ情報は必要に応じて開く。

## 境界とトレードオフ

公開インターフェースは内部 Skill 本文、ワークフロー定義、モデル設定を返さない。ただし、実行コンテキストは設定したモデルサービスに送信するため、OpenRouter のデモでは架空のデータだけを使う。ID 切替は Demo の仕組みであり、企業 SSO、RBAC、デバイス認証、本番のシークレット管理は未実装である。

オフラインテストとビルドだけでは、実際のブラウザーや Blender の各環境での信頼性は確認できない。Blender のシーン操作は現在のシーンを変更するため、専用のデモシーンが必要である。

## 状態と次のステップ

公開リポジトリの初回 CI は、バックエンド、Web、macOS Gateway のチェックを通過した。ローカル検証ではバックエンド 118 件、Dashboard 20 件のテストと Gateway smoke が通過した。現在の Command Line Tools 環境では、完全な XCTest は未検証である。

今後は Blender の再起動復旧と実シーンの回帰確認、ネイティブアプリのパッケージ化、本番の ID・認可機構を進める。

[リポジトリ](https://github.com/cyberyimein/Meganeura) · [初回 CI](https://github.com/cyberyimein/Meganeura/actions/runs/36763194384)

## 技術スタック

Python / FastAPI / SQLite / Vue 3 / TypeScript / SwiftUI / AppKit / MCP / Playwright MCP / OpenRouter
