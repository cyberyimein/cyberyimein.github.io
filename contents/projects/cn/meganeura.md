# Meganeura：通过业务能力委托 Agent 执行

Meganeura 是我的个人 Agent Runtime 项目。外部 Agent 理解用户需求，内部 Runtime 加载业务知识并执行任务，原生 macOS Gateway 连接用户电脑上的浏览器与 Blender。当前 v0.1.0 已公开，保留可操作的任务与管理界面。

## 背景与目标

项目沿着 Anomalo 的 Harness 经验继续探索：让用户通过熟悉的 Agent 发起业务，同时把内部操作步骤、业务 Skill 和工具配置留在执行侧。公开的 Capability 是业务契约，定义输入与结果；Know-how Vault 保存内部业务资产。

## 设计与实现

Interaction Agent 负责对话与业务委托，Execution Model 使用独立配置和上下文处理执行。任务 Runtime 加载工作流所需的资产版本，保存 SQLite checkpoint，通过事件报告进度，并在需要登录、补充输入或提交确认时暂停。

Gateway 主动连接 Runtime，按需管理本地 MCP 适配器，并中转 JSON-RPC。浏览器路径使用固定版本的 Playwright MCP 与官方扩展，连接用户选择的标签页；Blender 路径连接已启动的本地 Blender MCP。业务策略与工具授权由 Runtime 处理。

## 当前能力

- 通过 REST / MCP 创建、查询、取消任务，补充输入与订阅事件。
- 管理内部 Skill、Prompt、Tool、MCP 配置，以及资产版本、工作流依赖和模型配置。
- 在差旅报销流程中完成浏览器登录接管、表单填写与最终提交确认。
- 通过实验性的 Blender 适配器创建对象，并向任务界面返回图像结果。
- Vue Dashboard 与 SwiftUI Gateway 支持中文、日文和英文。界面以操作和状态为主，安装教程与调试信息按需展开。

## 边界与取舍

公开接口不返回内部 Skill 正文、工作流定义或模型配置，但执行上下文仍会发送给所配置的模型服务。OpenRouter 演示只使用虚构数据。当前身份切换是 Demo 机制，企业 SSO、RBAC、设备认证与生产密钥管理尚未实现。

离线测试与构建不能证明真实浏览器或 Blender 流程在所有环境中可靠。Blender 场景操作会改变当前场景，需要单独的演示场景。

## 状态与下一步

公开仓库的首次 CI 已通过后端、Web 与 macOS Gateway 检查。本轮本地验证通过 118 项后端测试、20 项 Dashboard 测试及 Gateway smoke；完整 XCTest 在当前 Command Line Tools 环境中仍未验证。

后续工作包括 Blender 重启恢复与真实场景回归、原生应用打包，以及生产身份与权限机制。

[代码仓库](https://github.com/cyberyimein/Meganeura) · [首次 CI](https://github.com/cyberyimein/Meganeura/actions/runs/36763194384)

## 技术栈

Python / FastAPI / SQLite / Vue 3 / TypeScript / SwiftUI / AppKit / MCP / Playwright MCP / OpenRouter
