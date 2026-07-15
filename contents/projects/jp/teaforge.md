# TeaForge：自動テストを監査可能なエンジニアリング証拠へ

AI Agent が数分で大量のコードとテストを生成できるようになると、人間のボトルネックは「書くこと」から「確認すること」へ移ります。緑色のテスト結果だけでは、何をテストし、期待値と実測値が何で、どの分岐が実行され、失敗が隠されていないか、別のエンジニアが監査できるかを説明できません。

TeaForge は実行可能なテストを、レビュー可能なエンジニアリング証拠へ変換します。インストール可能な Python CLI と Agent Skill として、エンジニアと Coding Agent が同じコマンドと境界を使い、日本式の PCL、カバレッジレポート、フローチャート、シーケンス図、PDF を生成できます。

## Demo から v0.2.0 へ

TeaForge は pytest からテストチェックリストを生成する実験として始まりました。完成版 v0.2.0 は pytest、Jest/TypeScript、Angular/Jest、Playwright に対応し、各テストを証明可能な Test Subject に対応付けます。JavaScript と TypeScript では、壊れやすい正規表現ではなく、同梱された Tree-sitter grammar から構造的な証拠を取得します。

Jest では静的、ランタイム、自動の証拠モードを選べます。ランタイムモードは対象プロジェクトにすでにインストールされロックされた Jest を呼び出し、matcher、期待値、実測値、pass/fail、`.not`、Promise、例外動作を記録します。TeaForge は `npx` で runner を勝手にダウンロードせず、テスト失敗をツール成功に見せかけません。証拠レポートを生成できたテスト失敗には独立した終了コードがあります。

## PCL とカバレッジ

PCL は Test Subject ごとにまとめ、隣接するバージョン付き JSON と HTML として出力します。大きなマトリクスは、安定した subject identity と schema version を維持したまま、25 列固定のシートへ分割されます。

カバレッジ生成は Python coverage または Jest/Istanbul データを読み、ファイル単位の C0/C1 指標と最低閾値ゲートを提供します。型付き Mermaid フローチャートとシーケンス図をレポートへ追加でき、任意の WeasyPrint 依存で PDF にも出力できます。測定対象の文や分岐がない指標は、見栄えのよい数字を作らず N/A と表示します。

## Agent のための境界

`teaforge doctor` は対象プロジェクト、runner、renderer、同梱リソースを、人間向けまたは JSON 形式で検査します。外部プロセスは正確なパス、統一された期限、制限された診断出力、タイムアウト後のプロセスツリー終了を使用します。成果物は同一ディレクトリの一時ファイルから原子的に置換されるため、中断しても直前の有効なレポートを壊しません。

ランタイム証拠では一般的な認証情報キーとパターンをマスキングし、値、レコード数、ファイルサイズを制限します。TeaForge は、ソースの同一性、図の種類、環境能力を証明できない場合、もっともらしいが監査不能な文書を作るより明示的に失敗することを選びます。

## クロスプラットフォーム品質ゲート

CI は Linux と Windows、Python 3.11〜3.14、Node 20/22 を対象とし、Ruff、80% の分岐カバレッジ基準、wheel/sdist ビルド、隔離インストールからの実 pytest coverage、Jest smoke test、Mermaid、PDF を検証します。アーキテクチャ判断は ADR、共通ドメイン言語は CONTEXT.md に保存されています。

## Technical Specifications

Python 3.11+ / Typer / pytest / Jest / Angular / Playwright / Tree-sitter / coverage.py / Istanbul / Mermaid / Jinja2 / WeasyPrint

## プロジェクト状態：完了

TeaForge v0.2.0 は、複数フレームワークのテスト証拠を、人間と Agent が共同利用できる監査可能でバージョン化された成果物へ安定して変換するという当初の目標を達成しました。組織レベルのレポートや、より広い統合テスト戦略は将来の方向として残りますが、現在の製品境界は完成しています。
