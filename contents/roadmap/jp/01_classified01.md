# Azure AI Foundry ベースの agent

Azure AI Foundry を基盤として、マルチ Agent 協調、MCP 呼び出し、RAG 検索などの機能を実践した。

## 概要

1. 実践1: MCP 呼び出し

FastAPI を使って、AI が Python スクリプトを書ける App を開発した。███████ MCP プロトコルを通じて、Agent はこれらのコードを自律的に実行し、███████ 業務フローを完了できるようになり、完全自動化を実現した。

2. 実践2: マルチAgent協調検索

Azure AI Foundry を利用して、複数専門家による協調モデルを構築した。

- 専門家 A: ユーザーの曖昧な要求と ██ 番号を、専門的な検索指示に変換する。
- 専門家 B: Web 上で資料を収集する。
- 専門家 C: 情報を集約・整理・構造化し、不足があれば追加検索を要求する。

この方式により、█████ に関する情報検索品質を改善した。

3. 実践3: ナレッジベース（RAG）と結果の品質検査

█████ 機能に RAG ナレッジベースを追加した。Agent は回答前に庫内の know-how を参照してプロンプトを最適化する。核心は、生成された回答が本当にその知識を参照したかを自動検査する Agent 相互評価メカニズムを設計したことにある。最終的に █████ 機能の精度が向上した。

---

CLASSIFIED — CyberYimein Internal Policy

Details have been redacted in accordance with organizational security protocols.
