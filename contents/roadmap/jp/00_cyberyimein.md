# このブログ

このブログも Vibe Coding の産物で、すべて Copilot CLI によって生成された。ソフトウェアエンジニアとして、ブログのアーキテクチャを自分で組むことは以前の趣味のひとつだったが、いまや coding agent がその時代を終わらせ、私はプロンプトを書くだけでよくなった。

## Markdown プレビューサンプル

`inline code`、**bold text**、*italic text*、~~strikethrough~~、[link](https://example.com)、> blockquote、- [ ] task

### 見出しレベル 3

#### 見出しレベル 4

##### 見出しレベル 5

###### 見出しレベル 6

- 箇条書き項目 1
- 箇条書き項目 2

1. 番号付き項目 1
2. 番号付き項目 2

### コードブロック

```ts
type TradeRecord = {
	symbol: string;
	side: 'BUY' | 'SELL';
	quantity: number;
	price: number;
};

const latestTrade: TradeRecord = {
	symbol: '7203.T',
	side: 'BUY',
	quantity: 100,
	price: 2845,
};
```

```python
def calc_pnl(entry_price: float, exit_price: float, quantity: int) -> float:
		return (exit_price - entry_price) * quantity


print(calc_pnl(2845, 2910, 100))
```

### 表

| Symbol | Strategy | Win Rate | Note |
| --- | --- | ---: | --- |
| 7203.T | Swing | 58% | Focus on earnings season |
| 9984.T | Intraday | 51% | Volatility is high |
| NVDA | Position | 63% | AI trend driven |

### 引用

> Keep the workflow lightweight.
> Let the data structure stay simple first, then refine the UI.

### チェックリスト

- [x] Static JSON data source
- [x] Basic trade timeline
- [ ] Portfolio analytics panel
- [ ] Export and backup flow

### 区切り線

---

### 混在コンテンツ

1. 注文履歴を収集する。
2. `trades.json` に正規化する。
3. 同じデータソースからダッシュボードカードを描画する。

- デイリースナップショット
- 月次パフォーマンス
- タグによる絞り込み
