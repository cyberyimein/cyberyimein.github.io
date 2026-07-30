# Experiment：把 Python 执行移出 Anomalo

这项验证把 Anomalo 的 `sandbox_python_run` 交给独立的 FruitSpy 服务。当前结论是：Agent 可以提交短 Python 程序，接收标准输出、错误和可选 artifact，而执行过程不在 Anomalo 主进程中完成。

## 问题

Agent 需要 Python 来做计算、数据检查和绘图，但让任意代码直接进入事件驱动的 Agent Host，会把工具能力和执行风险放在同一个进程里。问题是如何保留调用体验，同时把执行边界移到独立服务。

## 方法

Anomalo 只有在启用开关、FruitSpy 状态为 ready 且共享令牌存在时，才发布 `sandbox_python_run`。调用会把代码、超时和可选 artifact 列表提交到 FruitSpy 的 `/api/v1/tools/python/executions` 接口。FruitSpy 为每次执行启动新的 Apple Container，限制 CPU、内存、并发、输出大小和运行时间，收集结果后销毁容器。Anomalo 再把允许下载的 artifact 缓存到自己的受限目录。

## 结果

Anomalo 的测试覆盖了工具就绪检查、带超时的执行、标准输出回传和 artifact 下载。示例执行 `print(sum(range(10)))` 返回 `45`，图片 artifact 也能被缓存并通过受限路由读取。README 同时明确了 FruitSpy 不属于 Anomalo 仓库，而是独立部署的执行服务。

## 局限

这不是让 Anomalo 自己变成沙箱。Anomalo 仍然是适配器，隔离边界由 FruitSpy 提供；共享令牌、可信网络和服务状态都属于运行前提。Anomalo 内部的 Skill 代码仍按可信代码处理，缓存的 artifact 也只是短期结果，不是永久存档。

## 后续影响

Python 执行从一次本地调用变成了 Harness 的独立能力节点。它和联网检索、RAG 以及 MCP 可以共享同一个 Agent 运行时，同时保持各自的故障和安全边界。
