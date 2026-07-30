# FruitSpy: An Apple Container Control Plane for the Mac mini

FruitSpy is a macOS host and Apple Container dashboard for trusted-LAN use. It has completed the migration from Docker, Colima, and Portainer to Apple Container and is now an active project extending host monitoring, container management, and Anomalo's Python Tool and web-fetch relays.

## Background and goal

I needed a local tool that could read the Mac mini host state directly, inspect Apple Container workloads, and provide an agent with bounded execution. The key tradeoff was to keep the dashboard on macOS for accurate host metrics while putting arbitrary Python code in a disposable container instead of running it on the host.

FruitSpy has moved beyond a one-off migration experiment. It now owns persistent-service and login-start responsibilities, while continuing to evolve around the actual operational needs of my Mac mini.

## Design and implementation

FruitSpy uses FastAPI and WebSocket for the backend, React and Vite for the frontend, and a macOS menu bar launcher. It calls Apple's `container` CLI directly and does not use Docker Engine, the Docker socket, Compose, Portainer, or Colima to manage the workloads it displays.

The Python Tool Relay accepts token-authenticated requests from loopback or allowlisted networks. Each request starts a fresh Apple container, applies CPU, memory, concurrency, code-size, output, artifact, and timeout limits, collects the result, and removes the container. The Crawl4AI Relay follows a similar boundary for public web pages and returns Markdown.

## Current capabilities

- Shows Mac mini CPU, memory, storage, and Apple Container status.
- Exposes per-container live resources, configured limits, recent logs, and optionally enabled start, stop, and restart controls.
- Searches host npm, Homebrew, pip, and uv packages.
- Uses a menu bar app and login agents to start the service, with runtime state under the user's Library directory.
- Provides Anomalo with a disposable Apple Container Python Tool and bounded temporary artifacts.
- Provides Anomalo `web_fetch` with a Crawl4AI endpoint that enforces public-URL, timeout, concurrency, and response-size limits.

## Boundaries and tradeoffs

FruitSpy targets Apple silicon Macs running macOS 26 or later and currently has no user-login system. Container controls are disabled by default and are intended for explicit configuration on a trusted LAN. Crawl4AI 0.9.2 requires Python 3.10–3.13; the deployer must still configure tokens, network allowlists, and container limits for both relays.

FruitSpy manages Apple Container workloads only; it does not share storage with Docker, Colima, or Portainer. The monitoring dashboard and higher-risk execution capabilities are also configured separately to reduce the risk of exposing control endpoints on the LAN.

## Status and next step

FruitSpy is an active v0.1 project. The next step is to keep refining host and container state, login-time service persistence, and the operational boundaries of the Python Tool and Crawl4AI relays while keeping their tokens, source networks, and resource limits explicit.

## Technology stack

FastAPI / WebSocket / React / Vite / macOS Menu Bar App / Apple Container / Python / Crawl4AI
