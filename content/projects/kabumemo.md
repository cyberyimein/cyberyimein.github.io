# Kabumemo

一个 vibecoding 的尝试：完全未手写代码，由指导 GPT-5/Codex 生成的个人股票交易记录网站，目标是在最低成本下满足个性化系统需求。

## Technical Specifications

GPT, Static Site, JSON

## Classification Tags

Vibe Coding / TypeScript / Python

## Background

This project demonstrates continued advancement in autonomous agent systems and reflects the division's commitment to engineering excellence and innovation in artificial intelligence applications.

### h3

#### h4

##### h5

###### h6

- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

## Markdown Preview Samples

这里有一些用于观察页面渲染效果的 Markdown 示例，包括 `inline code`、链接、代码块、表格、引用和分隔线。

### Inline Formatting

你可以查看 **bold text**、`const profit = income - cost`，以及一个链接：[Kabumemo Repo](https://example.com/kabumemo)。

### Code Block

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

### Table

| Symbol | Strategy | Win Rate | Note |
| --- | --- | ---: | --- |
| 7203.T | Swing | 58% | Focus on earnings season |
| 9984.T | Intraday | 51% | Volatility is high |
| NVDA | Position | 63% | AI trend driven |

### Quote

> Keep the workflow lightweight.
> Let the data structure stay simple first, then refine the UI.

### Checklist

- [x] Static JSON data source
- [x] Basic trade timeline
- [ ] Portfolio analytics panel
- [ ] Export and backup flow

### Horizontal Rule

---

### Mixed Content

1. Capture order history.
2. Normalize records into `trades.json`.
3. Render dashboard cards from the same source of truth.

- Daily snapshot
- Monthly performance
- Tag-based filtering
