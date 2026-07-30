# Experiment：让 Agent 读取房间环境

这项实验验证了 Anomalo 对新 MCP 协议的接入路径。通过 FruitSpy 提供的房间环境 MCP Server，Agent 现在可以读取我房间的温度、湿度和二氧化碳浓度；当前结论是协议连接和结构化工具调用已经跑通，但这还不是连续环境监测系统。

## 问题

MCP 不只应该连接抽象的软件服务，也应该让 Agent 在明确边界内读取真实环境。问题是 Anomalo 能否用新的无状态协议连接远程 Streamable HTTP Server，发现房间环境工具，并把传感器结果交给 Agent。

## 方法

Anomalo 将 `fruitspy_room_climate` 配置为 `streamable_http`，协议模式使用 `auto`，指向 FruitSpy 的 `/api/v1/tools/room-climate/mcp` 地址。MCP Provider 优先探测 `server/discover`，必要时回退到旧的 `initialize` 握手；发现工具后，通过 `get_room_climate` 获取结构化结果。配置和远程地址属于可信网络设置，工具仍按会话激活。

## 结果

在实际验证中，我让 Agent 成功读取到房间的温度、湿度和二氧化碳浓度。Anomalo 的测试也覆盖了远程工具发现、结构化 `temperature_c` 返回、请求元数据和 `2026-07-28` 现代协议标记，同时保留了对 `2025-11-25` 旧协议的回退识别。这证明的是 Agent 到 MCP Server 的调用链可用，不是传感器校准报告。

## 局限

当前配置面向可信局域网，读取依赖 FruitSpy 服务和传感器在线。这个验证记录了可用的当前读数，没有证明连续采样、历史存储、阈值告警或传感器精度；测试主要验证 MCP 适配器，而不是物理设备本身。

## 后续影响

环境感知把 Harness 从软件工具扩展到房间里的实体状态，也让 MCP 分支有了一个可观察的真实输入。下一步应记录连续读数、服务不可用和数据异常时的行为，再决定是否把环境上下文纳入 Agent 的长期记忆或自动化规则。
