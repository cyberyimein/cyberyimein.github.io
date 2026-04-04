# Kabumemo: 一次 100% Vibecoding 的 AI 开发实验
Kabumemo 是一个纯粹由 AI 构建的个人股票交易记录网站。在这个项目中，我尝试挑战“零手写代码”，完全通过指令引导 GitHub Copilot Agent 完成开发。这不仅是一个功能性的个人项目，更是一个用于验证 Copilot Agent 与 Claude Code（CC）能力差距的基准测试。

## Background
本项目立项于 Claude Code 发布初期。彼时 GitHub Copilot Agent 仍处于测试阶段，业界对其“全自动构建”的能力尚存疑问。我希望通过这个项目验证一个核心假设：对于完全个性化的系统需求，当前的 AI Agent 是否已经具备了独立完成从架构设计到全栈实现的能力？ 同时，这也能作为我观察 Copilot Agent 迭代进化的长期样本。

## Implementation
技术选型上，虽然项目功能并不复杂，但我刻意引入了强类型约束，以验证 AI 在严苛开发环境下的表现：

- 全栈类型守卫： 前端选择 TypeScript 而非 JavaScript，后端 Python 则强制启用 Pydantic。通过类型系统和数据校验模型，我可以更精准地控制 AI 生成的代码质量，减少逻辑幻觉。

- Agent 基准测试： 每当 Copilot Agent 发布大幅更新时，我都会对项目进行一次重构。通过对比不同版本的代码生成效率和 Bug 率，量化 AI 能力的提升。

- 零手写介入： 整个过程我只负责提出需求和审核逻辑（Review），所有的代码修改、环境配置和调试均由 Agent 完成。

## Future Work
目前，我正在构建个人专属的 Local Agent，Kabumemo 将作为其中的重要模块进行集成：

* CLI 模式扩展： 为系统追加命令行工具，使Agent能直接使用。

* 自动化录入： 将交易记录的录入权交给本地 Agent，实现从数据抓取到存储的全自动化流转。