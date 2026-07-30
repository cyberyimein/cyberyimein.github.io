# Experiment：Python 実行を Anomalo の外へ出す

この検証では、Anomalo の `sandbox_python_run` を独立した FruitSpy サービスへ委譲した。現在の結論は、Agent が短い Python プログラムを送り、標準出力・エラー・任意の artifact を受け取れる一方、実行自体は Anomalo のメインプロセス内で行われないということだ。

## 検証課題

Agent には計算、データチェック、プロットのための Python が必要だ。しかし任意コードをイベント駆動の Agent Host に置くと、ツールと実行リスクが同じプロセスに入る。呼び出し体験を保ちながら、実行境界を別サービスへ移せるかを検証した。

## 方法

Anomalo は機能が有効で、FruitSpy の状態が `ready` で、共有トークンが設定されている場合だけ `sandbox_python_run` を公開する。呼び出しではコード、タイムアウト、任意の artifact 一覧を FruitSpy の `/api/v1/tools/python/executions` に送る。FruitSpy は実行ごとに新しい Apple Container を起動し、CPU、メモリ、同時実行数、出力サイズ、実行時間を制限して結果を収集した後、コンテナを破棄する。Anomalo は許可された artifact を制限付きディレクトリへキャッシュする。

## 結果

Anomalo のテストでは、準備状態の確認、タイムアウト付き実行、標準出力の返却、artifact のダウンロードを確認している。`print(sum(range(10)))` の例は `45` を返し、画像 artifact もキャッシュして制限付きルートから提供できる。README も FruitSpy が Anomalo リポジトリに含まれない、別デプロイの実行サービスであることを明記している。

## 制約

これは Anomalo 自体をサンドボックスにするものではない。Anomalo はアダプターであり、隔離境界は FruitSpy が提供する。共有トークン、信頼できるネットワーク、サービスの準備状態が実行条件になる。Anomalo 内の Skill コードは引き続き信頼済みコードとして扱い、キャッシュされた artifact も永続保存ではなく短期的な結果である。

## その後への影響

Python 実行はローカル呼び出しから、Harness の独立した能力ノードになった。Web 検索、RAG、MCP と同じ Agent ランタイムから利用しながら、障害とセキュリティの境界は分離できる。
