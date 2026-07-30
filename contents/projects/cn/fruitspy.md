# FruitSpy：面向 Mac mini 的 Apple Container 控制台

FruitSpy 是一个面向可信局域网的 macOS 主机和 Apple Container 控制台。它已经完成从 Docker、Colima 和 Portainer 到 Apple Container 的迁移，现在作为执行中的项目继续扩展主机监控、容器管理，以及 Anomalo 的 Python Tool 和网页抓取中继。

## 背景与目标

我需要一个能直接读取 Mac mini 主机状态、查看 Apple Container 工作负载，并为 Agent 提供受限执行能力的本地工具。核心取舍是让监控面板运行在 macOS 主机上，以便准确读取主机指标，同时把任意 Python 代码放入一次性容器，而不是直接运行在主机上。

FruitSpy 目前已经超出一次性迁移实验的范围。它开始承担常驻服务、登录后启动和其他本地运维职责，但仍只围绕个人 Mac mini 的实际需要演进。

## 设计与实现

FruitSpy 的后端使用 FastAPI 和 WebSocket，前端使用 React 与 Vite，另外提供 macOS 菜单栏启动器。它直接调用 Apple 的 `container` CLI，不使用 Docker Engine、Docker socket、Compose、Portainer 或 Colima 来管理当前工作负载。

Python Tool Relay 接收经过令牌验证、来自 loopback 或允许网段的请求。每次请求都会启动新的 Apple Container，并限制 CPU、内存、并发、代码大小、输出、artifact 和超时时间，收集结果后删除容器。Crawl4AI Relay 以类似的边界渲染公开网页并返回 Markdown。

## 当前能力

- 显示 Mac mini 的 CPU、内存、存储和 Apple Container 状态。
- 查看容器的实时资源、配置上限和近期日志，并可选地启用启动、停止和重启控制。
- 搜索主机上的 npm、Homebrew、pip 和 uv 软件包。
- 通过菜单栏应用和登录代理启动服务，运行状态保存在用户 Library 目录。
- 为 Anomalo 提供一次性 Apple Container Python Tool，并返回受限的临时 artifact。
- 为 Anomalo `web_fetch` 提供带公网 URL 校验、超时、并发和响应大小限制的 Crawl4AI 接口。

## 边界与取舍

FruitSpy 面向 Apple silicon Mac 和 macOS 26 或更高版本，当前没有用户登录系统。容器控制默认关闭，只适合可信局域网中的显式配置。Crawl4AI 0.9.2 的运行环境限制为 Python 3.10–3.13；Python Tool 与网页抓取的 token、网络白名单和容器限制仍需要部署者正确配置。

FruitSpy 只管理 Apple Container 工作负载，不兼容 Docker、Colima 或 Portainer 的容器存储。监控面板和高风险执行能力也被分开配置，以降低把控制接口暴露到局域网后的风险。

## 状态与下一步

FruitSpy 当前处于执行中的 v0.1 项目阶段。下一步是继续完善主机与容器状态、登录后常驻服务、Python Tool 和 Crawl4AI 的运维边界，同时保持执行接口的 token、来源网络和资源限制清晰可见。

## 技术栈

FastAPI / WebSocket / React / Vite / macOS Menu Bar App / Apple Container / Python / Crawl4AI
