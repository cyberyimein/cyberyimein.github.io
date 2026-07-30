# TeaForge：テスト実行結果を監査可能なエンジニアリング証拠へ変換する

TeaForge は、自動テストをレビュー可能でバージョン管理できるエンジニアリング文書へ変換する Python CLI と Agent Skill である。v0.2.0 で当初の目標を完了し、pytest、Jest、Angular/Jest、Playwright 向けの PCL、カバレッジレポート、Mermaid 図、任意の PDF を生成する。

## 背景と目標

Agent がコードとテストをすばやく生成できると、エンジニアリングの課題は結果の確認へ移る。グリーンになったテストだけでは、テスト対象、期待値、実測値、実行された分岐、失敗が隠されていないかは分からない。TeaForge はその証拠を残し、別のエンジニアや Agent がレビューを続けられるようにする。

## 設計と実装

TeaForge は各テストを証明可能な Test Subject に対応付け、設計時の静的証拠と実行時証拠を分けて保存する。Python のフローには pytest を使う。JavaScript と TypeScript では、正規表現でソースの関係を推測せず、パッケージに含めた Tree-sitter grammar で構造的な証拠を抽出する。

Jest には静的、実行時、自動の証拠モードがある。実行時モードは対象プロジェクトにすでにインストールされた Jest だけを呼び出し、matcher、expected、actual、pass/fail、`.not`、Promise、例外の挙動を記録する。カバレッジフローは Python coverage または Jest/Istanbul のデータを読み、ファイル単位の C0/C1 指標を作り、型を検証した Mermaid フローチャートとシーケンス図を追加できる。

## 現在の機能

- pytest、Jest/TypeScript、Angular/Jest、Playwright のテストからバージョン付き PCL を生成する。
- JSON と HTML の組を出力し、大きなマトリクスを固定 25 列のシートへ分割する。
- Python coverage または Istanbul のデータからファイル単位の C0/C1 レポートを作る。
- Mermaid フローチャートとシーケンス図を生成・検証し、任意の WeasyPrint で PDF へ変換する。
- `teaforge doctor` で runner、レンダラー、同梱リソース、対象プロジェクトの能力を確認する。
- ツールエラー、失敗証拠を含む Jest 実行、カバレッジゲート未達のレポートを異なる終了コードで区別する。

## 境界とトレードオフ

TeaForge は TypeScript の型チェッカーではなく、動的 import や複雑な動的テスト生成を推論しない。Jest は対象プロジェクトに事前にインストールされた runner から取得し、TeaForge は `npx` で依存をダウンロードしない。ソースの同一性、図の種類、必要な能力を証明できない場合は明示的に失敗する。

実行時証拠には、一般的な認証情報のキーとパターンに対する既定のマスキング、値・レコード・ファイルサイズの上限を適用する。カバレッジはファイル単位の証拠であり、組織全体の集計とポリシープロファイルは現在の製品境界に含めない。PDF と Mermaid の描画も外部ツールに依存する任意機能である。

## 状態と次のステップ

TeaForge は v0.2.0 で当初の目標を完了し、現在の製品境界は閉じている。組織単位のレポートや、より複雑な統合テスト戦略は将来の探索候補だが、現バージョンの実装済み機能ではない。

## 技術スタック

Python 3.11+ / Typer / pytest / Jest / Angular / Playwright / Tree-sitter / coverage.py / Istanbul / Mermaid / Jinja2 / WeasyPrint
