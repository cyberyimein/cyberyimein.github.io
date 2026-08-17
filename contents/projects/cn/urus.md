# Urus：把美股研究变成可复盘的工作流

Urus 是一个面向美股股票与 ETF 的研究与决策辅助系统。它把市场与宏观数据、技术和相对强弱指标、期权结构、研究报告以及可选的 Agent 分析放进同一条带有运行状态和证据的流程。当前版本为 0.1.0，处于活跃开发阶段；真实数据源和 Agent 默认关闭，系统不连接券商下单。

## 背景与目标

股票研究通常需要把行情、宏观背景、期权结构和个股比较放在一起判断。问题不只是数据来源多，而是不同阶段的输入容易失去时间边界：一次运行使用了什么数据，哪些步骤被跳过，哪些结果只是占位，都应该能够在之后复盘。

Urus 从一个由七个可替换步骤组成的研究流程出发：市场采集、宏观事件摘要、期权采集、个股采集、公司事件摘要、决策分析和输出。它的目标不是把单一指标变成买卖指令，而是保存每次运行的输入快照、数据质量、模型输出和工具轨迹，让后续的研究或 Agent 分析建立在冻结证据上。

## 设计与实现

Urus 使用一个 FastAPI 后端和一个 Vue 3 前端，两个进程可以独立启动和部署。后端通过 SQLAlchemy 与 Alembic 管理持久化，前端只通过集中式 API client 读取数据，不直接访问数据库或外部行情服务。

每次运行都会记录 `Run`、`StepRun` 和 `Snapshot`。前端读取小型的 read model；期权链、标的日线和技术输入则写入 SQLite 的规范化表，并与 snapshot 在同一事务中保存。这样既能快速展示研究结果，也能保留之后重算和检查所需要的原始边界。

真实数据通过显式 adapter 接入。Moomoo OpenD 用于批量读取 ETF 与股票快照和日线，Yahoo Finance 与 FRED 提供日频宏观上下文。OpenD 可以运行在开发机以外的局域网主机上，但地址只应放在本地或部署环境的配置中。

Stage 4B 的 Agent 不直接面对开放式数据库。系统先把配对快照压缩成带来源哈希、变化、质量警告和执行限制的 decision packet，再让 `urus-equity-decision` 和 `urus-options-decision` 处理受约束的研究任务。启用 OpenRouter 时，模型只能调用只读的数据和数学工具，决策、模型回合和 tool trace 会保存到 SQLite。

## 当前能力

- Stage 1A 已接入批量 ETF 快照、QQQ 日线技术指标，以及 Yahoo/FRED 日频宏观数据。
- Stage 2 可以在启用 Moomoo 时采集期权链，并计算 DEX、GEX、Gamma Wall、Max Pain、Expected Move、Spot Gamma Profile 和 Gamma Flip。
- Stage 3A 以 QQQ 为基准采集配置中的核心 ETF 与公开关注股，计算收益、均线、波动、ATR、布林带、MACD、量价信号、相对收益、Beta 和相关性。
- 前端提供 Dashboard、Runs、运行详情和研究报告页面，并分别展示正常交易价、盘前价和盘后价。
- 定时采集脚本使用 `exchange-calendars` 处理交易日、节假日和提前收盘；定时采集默认跳过 AI 决策。
- Stage 4B 提供可选的决策包、股票排序、期权结构解释和审计记录。关闭真实数据或 Agent 时，系统会保留 `disabled`、`unavailable`、`placeholder`、`partial` 或 `skipped` 等状态。

## 边界与取舍

Urus 目前没有登录、权限、多租户、Sentry、Prometheus 或完整的容器编排能力，不适合直接暴露在公网。它不连接券商下单，不执行自动交易，也不构成投资建议。

期权结构仍然是模型结果，不等于已知的做市商净仓位。当前 Gamma 计算使用显式配置的无风险利率、股息率、现价范围和点数，并采用 Call 为正、Put 为负的持仓方向假设；动态利率、动态股息、精确的 0DTE 剩余时间、VEX/Vanna 和逐笔期权历史属于后续精度工作。

宏观事件与公司事件摘要仍是条件步骤，1B 和 3B 在没有对应事件时会正常跳过。阶段整体显示 `mixed` 并不代表已完成的数据采集失败，而是表示后续步骤可能仍为 `skipped` 或 `placeholder`。

## 状态与下一步

Urus 当前处于 0.1.0 的活跃开发阶段。阶段 1A、期权结构持久化和阶段 3A 已经合入同一工作流与前端；后端 pytest、前端 Vitest 和生产构建在当前 checkout 中均已通过。

下一步是实现 3B 的个股事件与财务摘要，继续扩展行业基准和关注列表，并逐步补上更长的历史归档与动态利率、股息率模型。认证和访问控制则是面向部署环境的必要前置工作。

## 技术栈

Python 3.11+ / FastAPI / SQLAlchemy / Alembic / Vue 3 / TypeScript / Vite / Pinia / SQLite / PostgreSQL / Moomoo OpenD / FRED / Yahoo Finance / OpenRouter / pytest / Vitest
