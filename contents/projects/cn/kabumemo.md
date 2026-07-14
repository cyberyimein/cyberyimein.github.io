# Kabumemo：从周末 CRUD 到长期演进的 AI 开发实验

Kabumemo 最初只是一个替代 Notion 的个人股票交易日志。我不想再为了适应通用工具而不断扭曲自己的数据结构，于是把方向盘交给 GPT-5 Codex，通过 Vibe Coding 做一个真正贴合自己工作流的系统。

它最早确实只是一个周末完成的 CRUD 项目，但后来每当 Agent 能力出现明显进步，我都会让新的 Agent 回来重构它。Kabumemo 因而既是每天使用的个人工具，也是我观察 AI Agent 能否长期维护、扩展和部署真实软件的连续实验。

## 这次重构之后

现在的 Kabumemo 已经不是静态页面，而是一套 Vue 3 + TypeScript 前端与 FastAPI 后端组成的完整应用。界面按交易、持仓、资金和税务划分，能够记录买卖、计算分币种与资金组的持仓和已实现损益，并处理待结算税款。

资金模块支持多个 JPY/USD 资金组、追加资本及生效日期、年度收益对比和汇率换算。交易还可以组合计算一轮完整买卖的毛利、净利、税务影响与年化收益；持仓页面则能显示一年价格历史，并把买卖点标注在图表上。

数据层仍以易于检查和恢复的 JSON 为事实来源，但每次写入都会同步镜像到 SQLite。导入、同步检查和从券商 CSV 重建数据的脚本，让这个个人项目也具备了可审计和灾难恢复能力。

## AI 开发实验

这个项目继续坚持“我提出需求并 Review，Agent 完成代码”的原则。前端的 TypeScript、后端的 Pydantic 模型、pytest 与 Vue 类型检查共同构成质量边界。相比一次性生成代码，我更关心 Agent 是否能理解已有领域模型，在不破坏真实数据的前提下完成跨前后端重构。

## 部署

生产版本会先构建 Vue 前端，再由 FastAPI 同时提供页面与 API。应用已经迁移到 Mac mini 上的 Apple Container，持久化数据通过宿主机目录挂载，因此镜像可以被替换，交易数据不会随容器消失。

## Technical Specifications

Vue 3 / TypeScript / Vite / FastAPI / Pydantic / JSON / SQLite / ECharts / pytest / Apple Container

## 下一步

未来仍会继续完善批量导入导出、筛选、备份恢复和更多多币种边界测试。更长期的方向，是让本地 Agent 在明确授权与可审计的前提下读取 Kabumemo，而不是把真实交易数据交给一个不透明的自动化流程。
