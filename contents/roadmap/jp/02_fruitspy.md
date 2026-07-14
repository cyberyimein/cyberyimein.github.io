# FruitSpy：サーバーモニターから Apple Container コントロールプレーンへ

FruitSpy は、自宅の Mac mini の CPU とメモリを手軽に確認するために始まりました。このマシンで動かす個人サービスが増えるにつれ、プロジェクトを全面的にリファクタリングしました。従来の Docker と Portainer の構成は廃止され、現在は macOS ホスト上で直接動く FastAPI + React の Apple Container 用ダッシュボードです。

## 現在の機能

- ホストの CPU、メモリ、ストレージ使用量をリアルタイム表示。
- Apple Container の状態、CPU、実メモリ使用量、設定上限を表示。
- コンテナごとの直近ログを取得し、必要に応じて開始・停止・再起動操作を有効化。
- npm、Homebrew、pip、uv で導入されたパッケージとバージョンを検索。
- ネイティブ macOS メニューバーアプリからサービスを開始・停止し、ダッシュボードを開く。
- ソースチェックアウトに依存せず、ユーザーの Library に実行状態を保存する自己完結型ワンクリックアプリを生成。

## Anomalo との接続

FruitSpy は現在、Anomalo の Python Tool リレーも担当します。トークン認証され、ループバックまたは許可ネットワークから届いたリクエストごとに新しい Apple Container を起動し、CPU、メモリ、同時実行数、出力サイズ、実行時間を制限します。結果を回収した後、コンテナは直ちに削除されます。

プロットや小さな結果ファイルは、有効期限付き artifact として返せます。これにより Anomalo は Python ツールを利用しながら、任意コードを Mac mini ホスト上で直接実行させずに済みます。

## セキュリティ境界

FruitSpy は信頼できる LAN 向けで、現在ユーザーログインはありません。コンテナ操作は標準で無効であり、明示的な設定、同一オリジン、専用 Header が必要です。Python Tool は独立したトークン、送信元ネットワークの許可リスト、内部コンテナネットワークを使います。監視と高リスクな実行機能は意図的に分離して設定します。

## Technical Specifications

FastAPI / WebSocket / React / Vite / macOS Menu Bar App / Apple Container / Python Sandbox

## プロジェクト状態

FruitSpy は Docker、Colima、Portainer から Apple Container への移行を完了し、Mac mini のログイン常駐サービスとして動作しています。汎用運用プラットフォームを目指すのではなく、自分のサーバーに足りないものを追加するという当初の原則は変わっていません。
