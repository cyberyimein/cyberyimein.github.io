# 基于Azure AI Foundry 的agent

基于 Azure AI Foundry，实践了多 Agent 协作、MCP 调用、RAG 检索等机能。

## 概略

1. 实践1: MCP调用

我基于 FastAPI 开发了一个 App，让 AI 编写 Python 脚本。通过 ███████ MCP 协议，Agent 现在可以自己运行这些代码并完成 ███████ 业务流程，实现了全自动化。

2. 实践2: 多Agent协作检索

利用 Azure AI Foundry 搭建了多专家协作模式：

- 专家 A：把用户模糊的需求和 ██ 编号变成专业的搜索指令。
- 专家 B：负责上网查资料。
- 专家 C：汇总、整理、结构化信息，如果发现不全还会要求补充搜索。

通过这种方式，优化了 █████ 的信息检索质量。

3. 实践3: 知识库（RAG）与结果质检

在 █████ 功能里加入了 RAG 知识库。Agent 在回答前会先去库里找 “Know-how” 来优化提示词。核心的是，我设计了 Agent 互相评测的机制，自动检查生成的答案是否真的参考了这些知识。最终优化了 █████ 功能的准确率。

---

CLASSIFIED — CyberYimein Internal Policy

Details have been redacted in accordance with organizational security protocols.
