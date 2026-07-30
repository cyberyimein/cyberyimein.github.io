# Experiment：Search 发现，Fetch 取证

这张卡片记录的是 Anomalo 的 `Search & Fetch` 联网检索能力，不是花见 CLI 的简单延伸。当前实现按 `web_search` → `web_fetch` 的顺序调用两个工具：前者发现候选来源，后者读取指定网页并返回 Agent 可处理的 Markdown。

## 问题

Agent 需要先找到可能相关的来源，再读取正文并保留来源边界。单个“联网工具”很难同时表达发现、取证和失败原因，因此问题是如何把这条链拆成可观察、可限制的两个步骤。

## 方法

`web_search` 使用 DuckDuckGo HTML 返回标题、URL 和摘要，并对相同查询做短期缓存。`web_fetch` 只接受公开的 HTTP(S) 地址，直接模式会把 HTML 清理并转换成 Markdown，同时支持字符窗口和续读偏移。`auto` 模式发现页面可能依赖 JavaScript 时，会把请求交给 FruitSpy 的 Crawl4AI 接口。两个工具的调用、提供方和耗时会写入当前会话的 Web Activity trace。

## 结果

代码和测试已经覆盖结构化搜索结果、搜索缓存、直接页面转换、动态页面回退，以及私有地址和跨源认证重定向的拒绝。Agent 得到的是候选来源和可继续读取的正文，而不是一个把检索、生成和引用混在一起的黑盒答案。

## 局限

搜索依赖 DuckDuckGo HTML，可能遇到挑战或限流；Fetch 只面向公开地址，动态页面回退还要求 FruitSpy Crawl4AI 已配置。它也不负责判断来源是否真实或直接生成最终结论，来源质量和证据解释仍由上层 Agent 处理。

## 后续影响

这项验证把“联网”沉淀为两个可独立测试的 Harness 能力。它与花见 CLI 的关系是经验延续，而不是代码复用：花见验证了 Agent 调用外部工具的早期路径，Search & Fetch 则成为 Anomalo 中面向公开网页的通用组合。
