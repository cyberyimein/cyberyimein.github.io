# FruitSpy：Mac mini 向け Apple Container コントロールプレーン

FruitSpy は、信頼できる LAN 向けの macOS ホストおよび Apple Container ダッシュボードである。Docker、Colima、Portainer から Apple Container への移行を完了し、現在はホスト監視、コンテナ管理、Anomalo の Python Tool と Web 取得リレーを拡張する実行中のプロジェクトになっている。

## 背景と目標

Mac mini のホスト状態を直接読み取り、Apple Container のワークロードを確認し、Agent に制限付きの実行能力を提供するローカルツールが必要だった。主な判断は、正確なホスト指標のためにダッシュボードを macOS 上で動かし、任意の Python コードはホストではなく一時コンテナで実行することだった。

FruitSpy は一度きりの移行実験を越えた。現在は常駐サービスとログイン後の起動も担当し、個人の Mac mini に必要な運用機能に合わせて発展している。

## 設計と実装

バックエンドに FastAPI と WebSocket、フロントエンドに React と Vite、起動処理に macOS メニューバーランチャーを使う。表示対象のワークロードは Apple の `container` CLI から直接操作し、Docker Engine、Docker socket、Compose、Portainer、Colima は使わない。

Python Tool Relay は、loopback または許可リストのネットワークから来るトークン認証済みリクエストを受け付ける。リクエストごとに新しい Apple Container を起動し、CPU、メモリ、同時実行数、コードサイズ、出力、artifact、タイムアウトを制限する。結果を回収したらコンテナを削除する。Crawl4AI Relay も同様の境界で公開 Web ページを処理し、Markdown を返す。

## 現在の機能

- Mac mini の CPU、メモリ、ストレージ、Apple Container の状態を表示する。
- コンテナごとの実リソース、設定上限、直近ログを表示し、開始・停止・再起動を任意で有効にする。
- ホストの npm、Homebrew、pip、uv パッケージを検索する。
- メニューバーアプリとログインエージェントでサービスを起動し、実行状態をユーザーの Library に保存する。
- Anomalo 向けに、一時 Apple Container で動く Python Tool と制限付きの一時 artifact を提供する。
- Anomalo の `web_fetch` 向けに、公開 URL 検査、タイムアウト、同時実行数、レスポンスサイズ制限を備えた Crawl4AI エンドポイントを提供する。

## 境界とトレードオフ

FruitSpy は Apple silicon Mac と macOS 26 以降を対象にし、現在ユーザーログイン機能を持たない。コンテナ操作は標準で無効であり、信頼できる LAN 上で明示的に設定する。Crawl4AI 0.9.2 は Python 3.10–3.13 を必要とする。二つの Relay を使う場合も、トークン、ネットワーク許可リスト、コンテナ上限の設定はデプロイ側で行う。

FruitSpy が管理するのは Apple Container のワークロードだけであり、Docker、Colima、Portainer のストレージとは共有しない。監視ダッシュボードと高リスクな実行機能も分けて設定し、LAN 上の制御エンドポイントを公開するリスクを抑える。

## 状態と次のステップ

FruitSpy は実行中の v0.1 プロジェクトである。次は、ホストとコンテナの状態、ログイン時の常駐サービス、Python Tool と Crawl4AI リレーの運用境界を引き続き整え、トークン、送信元ネットワーク、リソース上限を明示したまま保つことである。

## 技術スタック

FastAPI / WebSocket / React / Vite / macOS Menu Bar App / Apple Container / Python / Crawl4AI
