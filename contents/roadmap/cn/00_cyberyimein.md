# 这个博客

这个博客也是 Vibe Coding 的产物，完全由 Copilot CLI 生成。作为一个软件工程师，自己编写博客架构也曾是我的爱好，如今 coding agent 终结了这一切，我只需要写提示词了。

## Markdown 预览示例

`inline code`、**bold text**、*italic text*、~~strikethrough~~、[link](https://example.com)、> blockquote、- [ ] task

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2

### 代码块

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

### 表格

| Symbol | Strategy | Win Rate | Note |
| --- | --- | ---: | --- |
| 7203.T | Swing | 58% | Focus on earnings season |
| 9984.T | Intraday | 51% | Volatility is high |
| NVDA | Position | 63% | AI trend driven |

### 引用

> Keep the workflow lightweight.
> Let the data structure stay simple first, then refine the UI.

### 清单

- [x] Static JSON data source
- [x] Basic trade timeline
- [ ] Portfolio analytics panel
- [ ] Export and backup flow

### 分隔线

---

### 混合内容

1. 采集订单历史。
2. 归一化到 `trades.json`。
3. 用同一份数据源渲染仪表板卡片。

- 每日快照
- 月度表现
- 标签筛选
