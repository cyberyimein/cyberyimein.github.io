# Anomalo：在一个运行时里验证 Agent Harness、实体交互与股票研究

Anomalo 是我的个人 AI 工程实验室。它用事件驱动的 FastAPI Agent Host 和 Vue 控制面板，把 Agent Harness 实验、StackChan 设备控制与个人股票研究放进同一个可观察的运行时。当前版本是 v0.1，仍处于活跃开发阶段。

## 背景与目标

我把 Anomalo 用作一个长期实验场：新出现的 Agent 技术只有连接成可运行的系统，才能看清它们的边界、状态流转和运维成本。项目关注流式运行时、Tool Calling、上下文组装、Prompt Profile、Memory、Skills、MCP、沙箱执行和人工审批。

另一个目标是把 Agent 从浏览器带到桌面设备。StackChan 负责显示状态、接收触摸和传输音频，主机负责模型调用、工具执行与授权策略。股票研究则提供一个具体的业务边界：分析引擎产生可测试的市场证据，Agent 负责解释和整理研究过程。

## 设计与实现

Agent Host 以 FastAPI 提供 REST 和 WebSocket 接口，运行时从 Prompt Profile、可选的 `AGENTS.md` Memory、Skills、MCP Server 配置和会话历史组装模型请求。客户端兼容 OpenAI SDK，默认使用 OpenRouter；没有 API key 时可以使用确定性的 Mock 模式。

运行时发出带类型的生命周期、消息、模型请求、工具调用、工具结果和错误事件，Vue 控制面板可以检查这些上下文。Buddy Bridge 通过串口或 TCP 连接 StackChan，并把语音、触摸、审批和设备状态接入同一套事件流。

股票模块与 Agent 解耦。它使用行情适配器、技术证据、排名和报告组成确定性的分析流程；数据可以来自 Mock 或 Futu OpenD。Python 工具则由独立的 FruitSpy 服务转发，在配置完成后交给一次性的 Apple Container 执行。

## 当前能力

- 通过 WebSocket 或 REST 流式输出 Agent 生命周期、消息与工具事件。
- 在运行时加载 Prompt Profile、Memory、Python Skills 和 MCP Server。
- 在一个 Vue 控制面板中查看聊天、上下文、Buddy 状态和股票分析。
- 支持 STT、TTS、本地语音会话以及 StackChan 串口或 TCP 桥接。
- 提供联网搜索与 Markdown 抓取工具，并记录当前会话的 Web Activity。
- 使用 Mock 或 Futu OpenD 数据执行确定性的股票分析。
- 支持独立 Python 沙箱服务，以及 Apple Container 镜像构建和远程部署。

## 边界与取舍

Anomalo 面向可信网络中的个人使用，当前没有加固为多用户服务。MCP 配置、Skills、远程服务和外部工具都属于可信代码或可信配置，部署时必须自行管理访问控制与凭据。

StackChan 只负责实体表现和输入，最终的工具授权与审批仍由主机策略决定。股票模块输出的是分析软件结果，不是投资建议；Agent 的解释也不替代底层市场数据与计算证据。

## 状态与下一步

Anomalo 当前处于 v0.1 活跃开发阶段。下一步是把联网检索、容器沙箱和独立 RAG 验证逐步收束为稳定的 Harness 能力，同时继续保持工具调用、判断和人工批准可观察、可解释。

## 技术栈

FastAPI / Vue 3 / Vite / OpenRouter / MCP / Python 3.12 / WebSocket / Apple Container
