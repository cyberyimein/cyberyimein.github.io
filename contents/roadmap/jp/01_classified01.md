# Azure AI Foundry ベースの Agent

Azure AI Foundry をベースに、マルチ Agent 協調、MCP 呼び出し、RAG 検索などの機能を実践しました。

## 概略

1. 実践1: MCP 呼び出し

FastAPI ベースで App を開発し、AI に Python スクリプトを書かせました。███████ MCP プロトコルを通じて、Agent はこれらのコードを自分で実行し、███████ 業務フローを完了できるようになり、完全自動化を実現しました。

2. 実践2: マルチ Agent 協調検索

Azure AI Foundry を利用して、マルチ専門家協調モードを構築しました。

- 専門家 A: ユーザーの曖昧な要求と ██ 番号を、専門的な検索指示に変換します。
- 専門家 B: Web 上で資料を調べます。
- 専門家 C: 情報を要約、整理、構造化し、不足が見つかれば追加検索を要求します。

この方法によって、█████ の情報検索品質を最適化しました。

3. 実践3: ナレッジベース（RAG）と結果の品質検査

█████ 機能に RAG ナレッジベースを追加しました。Agent は回答前にまずベース内で know-how を探し、プロンプトを最適化します。核心は、生成された回答が本当にその知識を参照したかどうかを自動チェックする、Agent 同士の相互評価メカニズムを設計したことです。最終的に、█████ 機能の精度を向上させました。

---

CLASSIFIED — CyberYimein Internal Policy

Details have been redacted in accordance with organizational security protocols.
