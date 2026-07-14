# FruitSpy：从服务器监控页到 Apple Container 控制台

FruitSpy 最初只是为了随手查看家里 Mac mini 的 CPU 和内存。随着这台机器逐渐承载更多个人服务，它也被彻底重构：旧的 Docker 与 Portainer 路线已经移除，现在它是一套直接运行在 macOS 宿主机上的 FastAPI + React 控制台，专门面向 Apple Container。

## 当前能力

- 实时显示宿主机 CPU、内存和存储使用情况。
- 查看 Apple Container 的状态、实时 CPU、实际内存与配置上限。
- 按需读取每个容器的近期日志，并可选择启用启动、停止和重启控制。
- 搜索宿主机安装的 npm、Homebrew、pip 和 uv 软件包及版本。
- 通过原生 macOS 菜单栏应用启动、停止服务并打开控制台。
- 构建可独立安装的一键应用包，运行时状态保存在用户 Library 目录，不再依赖源码目录。

## 与 Anomalo 的连接

FruitSpy 现在还承担 Anomalo 的 Python Tool 中继。收到经过令牌验证、来自回环地址或允许网段的请求后，它会为每次执行启动一个全新的 Apple Container，限制 CPU、内存、并发、输出大小和运行时间，收集结果后立即销毁容器。

绘图和小型结果文件可以作为短时 artifact 下载。这让 Anomalo 能使用 Python 工具，同时把任意代码执行隔离在一次性容器中，而不是直接暴露 Mac mini 宿主机。

## 安全边界

FruitSpy 面向可信局域网，当前没有用户登录系统。容器控制默认关闭，必须显式开启；控制请求使用同源限制和专用 Header。Python Tool 则使用独立令牌、来源网段白名单和内部容器网络。监控面板与高风险执行能力被有意分开配置。

## Technical Specifications

FastAPI / WebSocket / React / Vite / macOS Menu Bar App / Apple Container / Python Sandbox

## 项目状态

FruitSpy 已完成从 Docker/Colima/Portainer 到 Apple Container 的迁移，并作为 Mac mini 登录后的常驻服务运行。它仍然遵循最初的原则：不是做通用运维平台，而是为我的服务器缺什么就补什么。
