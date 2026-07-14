# Anomalo：让 Agent 从浏览器走进现实世界

Anomalo 是我的个人 AI 工程实验室。它以事件驱动的 FastAPI Agent Host 为核心，配合 Vue 控制面板，把 Agent Harness 实验、StackChan 实体机器人控制和个人股票研究放进同一个可运行、可观察的系统里。

## 为什么做这个项目

Agent Harness 技术发展得太快，新的架构、工具和实践方式几乎每天都在出现。我认为学习这些新技术最好的方法，不只是阅读文档或比较框架，而是自己动手完整地做一遍。

因此，我希望新出现的 Agent 技术不只停留在文章、Demo 或框架对比里。流式运行时、Tool Calling、上下文组装、Prompt Profile、Memory、Skills、MCP、沙箱执行和人工审批，只有被连接成真正工作的系统，才能看清它们之间的边界和代价。

Anomalo 也让我能探索 Agent 的身体性。通过 Buddy Bridge，Agent 可以连接 StackChan 风格的设备，处理串口或 TCP 通信、触摸事件、状态变化、语音回合、低频视觉以及动作命令。浏览器中的 Agent 因此不再只输出文字，而是开始感知并影响现实环境。

第三个方向是个人股票研究。项目内置了一套确定性、可测试的市场分析引擎，包括行情适配器、技术证据、排名与报告。AI 的角色是解释市场背景、调查交易形态和整理研究过程，而不是充当不可审计的自动交易系统。

## 当前实现

- 通过 WebSocket 或 REST 流式输出 Agent 生命周期、消息与工具事件。
- 使用 OpenAI SDK 兼容客户端，默认接入 OpenRouter，并提供本地 Mock 模式。
- 运行时加载 Prompt Profile、Memory、Python Skills 与 MCP Server。
- Vue 控制面板统一提供聊天、上下文检查、Buddy 控制和股票分析。
- 支持 STT、TTS、本地语音对话以及 StackChan 设备桥接。
- 使用 Mock 或 Futu OpenD 数据执行确定性的股票分析。
- 支持独立 Python 沙箱服务及 Apple Container 构建和部署。

## Technical Specifications

FastAPI / Vue 3 / Vite / OpenRouter / MCP / Python 3.12 / WebSocket / Apple Container

## 项目状态

Anomalo 当前处于 v0.1 活跃开发阶段。它仍是运行在可信网络中的个人实验项目，而不是经过加固的多用户服务。下一阶段会继续收紧 Agent、实体设备与研究工具之间的协作边界，让每一次工具调用、判断和人工批准都保持可观察、可解释。
