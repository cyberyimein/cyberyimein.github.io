# Anomalo: An Agent Harness, Physical Interface, and Stock Research in One Runtime

Anomalo is my personal AI engineering laboratory. An event-driven FastAPI agent host and a Vue control panel bring agent-harness experiments, StackChan device control, and personal stock research into one observable runtime. The current version is v0.1 and remains in active development.

## Background and goal

I use Anomalo as a long-running laboratory. New agent techniques reveal their boundaries, state transitions, and operational cost only when they are connected into a working system. The project covers streaming runtimes, tool calling, context assembly, prompt profiles, memory, skills, MCP, sandboxed execution, and human approval.

Another goal is to move an agent from the browser onto a desktop device. StackChan renders state, receives touch input, and transports audio, while the host owns model calls, tool execution, and authorization policy. Stock research provides a concrete domain boundary: a deterministic engine produces testable market evidence, while the agent explains and organizes the research process.

## Design and implementation

The agent host uses FastAPI for REST and WebSocket interfaces. Each run assembles a model request from prompt profiles, optional `AGENTS.md` memory, skills, MCP server configuration, and session history. The client is OpenAI SDK-compatible and defaults to OpenRouter; without an API key, the application can use a deterministic mock mode.

The runtime emits typed lifecycle, message, model-request, tool-call, tool-result, and error events. The Vue control panel exposes this context for inspection. The Buddy bridge connects StackChan over serial or TCP and brings voice, touch, approval, and device state into the same event flow.

The stock module is separate from the agent. It combines market-data adapters, technical evidence, ranking, and reports into a deterministic analysis pipeline, using mock data or Futu OpenD. The Python tool is relayed by the separate FruitSpy service and, when configured, runs inside a disposable Apple container.

## Current capabilities

- Streams agent lifecycle, message, and tool events over WebSocket or REST.
- Loads prompt profiles, memory, Python skills, and MCP servers at runtime.
- Provides one Vue control panel for chat, context inspection, Buddy state, and stock analysis.
- Supports STT, TTS, local voice sessions, and a serial or TCP StackChan bridge.
- Provides web search and Markdown fetch tools and records Web Activity for the current session.
- Runs deterministic stock analysis with mock data or Futu OpenD.
- Supports a separate Python sandbox service plus Apple Container image builds and remote deployment.

## Boundaries and tradeoffs

Anomalo is intended for personal use on a trusted network, not as a hardened multi-user service. MCP configurations, skills, remote services, and external tools are trusted code or trusted configuration; deployment must provide its own access control and credential handling.

StackChan handles physical presentation and input, while the host policy remains responsible for tool authorization and approvals. Stock reports are analytical software output, not investment advice, and agent explanations do not replace the underlying data or calculations.

## Status and next step

Anomalo is in active v0.1 development. The next step is to consolidate web retrieval, container sandboxing, and the separate RAG validation work into stable harness capabilities while keeping tool calls, judgments, and human approvals observable and explainable.

## Technology stack

FastAPI / Vue 3 / Vite / OpenRouter / MCP / Python 3.12 / WebSocket / Apple Container
