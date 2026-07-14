# Anomalo: Bringing an Agent Out of the Browser and into the Physical World

Anomalo is my personal AI engineering laboratory. An event-driven FastAPI agent host and a Vue control panel bring agent-harness experiments, StackChan robot control, and personal stock research into one observable, working system.

## Why This Project Exists

Agent-harness technology is developing extremely quickly, with new architectures, tools, and practices appearing almost every day. I believe the best way to learn these technologies is not only to read the documentation or compare frameworks, but to build the whole thing myself at least once.

That is why I do not want emerging agent techniques to remain as articles, isolated demos, or framework comparisons. Streaming runtimes, tool calling, context assembly, prompt profiles, memory, skills, MCP, sandboxed execution, and human approval flows reveal their real boundaries and costs only when they are connected as a working system.

Anomalo also lets me explore embodiment. Through the Buddy bridge, the agent can connect to a StackChan-style device and handle serial or TCP communication, touch events, state changes, voice turns, low-frequency vision, and movement commands. The browser agent no longer produces only text; it begins to sense and affect a physical environment.

The third direction is personal stock research. The repository contains a deterministic, testable market-analysis engine with data adapters, technical evidence, ranking, and reports. AI is intended to explain market context, investigate setups, and organize research—not to act as an opaque autonomous trading system.

## What Is Implemented

- Streams agent lifecycle, message, and tool events over WebSocket or REST.
- Uses an OpenAI SDK-compatible client with OpenRouter defaults and a local mock mode.
- Loads prompt profiles, memory, Python skills, and MCP servers at runtime.
- Provides one Vue control panel for chat, context inspection, Buddy control, and stock analysis.
- Supports STT, TTS, local voice conversations, and a StackChan device bridge.
- Runs deterministic stock analysis with mock data or Futu OpenD.
- Supports a separate Python sandbox service plus Apple Container build and deployment.

## Technical Specifications

FastAPI / Vue 3 / Vite / OpenRouter / MCP / Python 3.12 / WebSocket / Apple Container

## Project Status

Anomalo is in active v0.1 development. It remains an experimental personal project intended for a trusted network, not a hardened multi-user service. The next phase will keep refining the boundaries between the agent, physical devices, and research tools so that every tool call, judgment, and human approval remains observable and explainable.
