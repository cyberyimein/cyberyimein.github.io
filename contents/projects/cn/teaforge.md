# TeaForge：把测试运行结果转换为可审计的工程证据

TeaForge 是一个 Python CLI 和 Agent Skill，用于把自动化测试转换为可复核、可版本化的工程文档。v0.2.0 已完成最初目标：为 pytest、Jest、Angular/Jest 和 Playwright 生成 PCL、覆盖率报告、Mermaid 图和可选 PDF。

## 背景与目标

当 Agent 可以快速生成代码和测试时，工程问题会转向如何确认结果。绿色测试本身不能说明测试对象、预期值、实际值、执行分支或失败是否被隐藏。TeaForge 的目标是保留这些证据，让另一个工程师或 Agent 可以继续审查。

## 设计与实现

TeaForge 把每个测试映射到可证明的 Test Subject，并把设计时的静态证据与运行时证据分开保存。Python 流程使用 pytest；JavaScript 和 TypeScript 流程使用随包发布的 Tree-sitter grammar 提取结构证据，而不是通过正则表达式猜测源文件关系。

Jest 支持静态、运行时和自动证据模式。运行时模式只调用目标项目已经安装的 Jest，记录 matcher、expected、actual、pass/fail、`.not`、Promise 和异常行为。覆盖率流程读取 Python coverage 或 Jest/Istanbul 数据，生成文件级 C0/C1 指标，并可附加经过类型校验的 Mermaid 流程图和时序图。

## 当前能力

- 从 pytest、Jest/TypeScript、Angular/Jest 和 Playwright 测试生成版本化 PCL。
- 生成配套的 JSON 与 HTML，并将大型矩阵拆分为固定 25 列的工作表。
- 从 Python coverage 或 Istanbul 数据生成文件级 C0/C1 覆盖率报告。
- 生成并校验 Mermaid 流程图与时序图，使用可选的 WeasyPrint 导出 PDF。
- 用 `teaforge doctor` 检查 runner、渲染器、打包资源和目标项目能力。
- 用不同退出码区分工具错误、带失败证据的 Jest 运行和未通过覆盖率门禁的报告。

## 边界与取舍

TeaForge 不是 TypeScript 类型检查器，也不负责推断动态 import 或复杂的动态测试构造。Jest 必须来自目标项目已安装的 runner；TeaForge 不使用 `npx` 临时下载依赖。找不到可证明的源文件身份、图表类型或能力边界时，工具会明确失败。

运行时证据默认会对常见凭证字段和模式做脱敏，并限制值、记录和文件大小。覆盖率是文件级证据，组织级聚合和策略配置不在当前产品边界内。PDF 和 Mermaid 渲染也是可选能力，取决于外部依赖。

## 状态与下一步

TeaForge 已在 v0.2.0 完成最初目标，当前产品边界已经闭合。组织级报告和更复杂的集成测试策略仍可作为后续探索，但不是当前版本的已实现能力。

## 技术栈

Python 3.11+ / Typer / pytest / Jest / Angular / Playwright / Tree-sitter / coverage.py / Istanbul / Mermaid / Jinja2 / WeasyPrint
