# This Blog

This blog is also a product of vibe coding and was generated entirely with Copilot CLI. As a software engineer, building a blog architecture by hand used to be one of my hobbies. Now coding agents have brought that era to an end, and all I need to write are prompts.

## Markdown Preview Samples

`inline code`, **bold text**, *italic text*, ~~strikethrough~~, [link](https://example.com), > blockquote, - [ ] task

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

- Unordered list item 1
- Unordered list item 2

1. Ordered list item 1
2. Ordered list item 2

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
