# TeaForge：把自动化测试锻造成可审计的工程证据

当 AI Agent 能在几分钟内生成大量代码和测试时，人类的瓶颈已经从“怎么写”转向“怎么确认”。只看到一排绿色测试并不足以回答：测了什么、预期与实际值是什么、哪些分支被执行、失败是否被隐藏，以及报告能否交给另一个工程师继续审查。

TeaForge 的目标，就是把可执行测试转换为人类可复核的工程证据。它是一套可安装的 Python CLI，也附带 Agent Skill，让工程师和 Coding Agent 能用同一套命令与边界生成日本软件工程中常见的 PCL（Program Check List）、覆盖率报告、流程图、时序图和 PDF。

## 从 Demo 到 v0.2.0

TeaForge 最初只是一个从 pytest 生成测试清单的实验。完成时的 v0.2.0 已经支持 pytest、Jest/TypeScript、Angular/Jest 与 Playwright，并能将每个测试映射到可证明的 Test Subject。对于 JavaScript 和 TypeScript，它使用随包发布的 Tree-sitter grammar 提取结构证据，而不是依靠容易误判的正则表达式。

Jest 可以选择静态、运行时或自动证据模式。运行时模式会调用目标项目已经安装并锁定的 Jest，记录 matcher、expected、actual、pass/fail、`.not`、Promise 与异常行为。TeaForge 不会用 `npx` 临时下载依赖，也不会把测试失败伪装成工具成功；测试执行失败但报告成功生成时，会返回独立的退出码。

## PCL 与覆盖率

PCL 会按被测对象分组，并生成相邻的版本化 JSON 与 HTML。大矩阵会自动拆分为固定 25 列的工作表，同时保持稳定的 subject identity 和 schema version。

覆盖率功能读取 Python coverage 或 Jest/Istanbul 数据，生成文件级 C0/C1 指标，并支持最低阈值门禁。报告可以附加经过类型校验的 Mermaid 流程图和时序图，也可以通过可选的 WeasyPrint 依赖导出 PDF。没有可测语句或分支的指标会标记为 N/A，而不是制造一个看似漂亮的百分比。

## 为 Agent 设计的安全边界

`teaforge doctor` 能以人类或 JSON 形式检查目标项目、runner、渲染器和打包资源。所有外部进程都使用明确路径、统一截止时间、有限诊断输出和超时后的进程树清理。生成物通过同目录临时文件原子替换，避免中断写入破坏旧报告。

运行时证据会对常见凭证字段与模式做脱敏，并限制单值、记录数和文件大小。TeaForge 宁愿在无法证明源文件身份、图表类型或能力边界时明确失败，也不生成一份看起来合理但无法审计的报告。

## 跨平台质量门禁

CI 覆盖 Linux 与 Windows、Python 3.11 到 3.14、Node 20 与 22，并执行 Ruff、80% 分支覆盖率、wheel/sdist 构建、隔离安装后的真实 pytest coverage、Jest smoke test、Mermaid 与 PDF 检查。架构决策记录在 ADR 中，领域语言则集中维护在 CONTEXT.md。

## Technical Specifications

Python 3.11+ / Typer / pytest / Jest / Angular / Playwright / Tree-sitter / coverage.py / Istanbul / Mermaid / Jinja2 / WeasyPrint

## 项目状态：已完成

TeaForge 已在 v0.2.0 达到最初设定的目标：将多框架测试证据稳定转换为可审计、可版本化、适合人类与 Agent 共同使用的工程文档。更高层级的组织报告与复杂集成测试策略可以在未来继续探索，但当前产品边界已经完整闭合。
