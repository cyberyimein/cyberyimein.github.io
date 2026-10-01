# Meganeura: delegating Agent execution through business capabilities

Meganeura is my personal Agent Runtime project. An external Agent interprets a request, an internal Runtime loads business knowledge and executes the task, and a native macOS Gateway connects to the user's browser and Blender. Version v0.1.0 is now public, with functional task and management interfaces.

## Background and goal

The project extends the Harness experience from Anomalo: users initiate work through a familiar Agent, while operational steps, business Skills, and tool configuration stay on the execution side. A public Capability defines business inputs and results; the Know-how Vault stores internal business assets.

## Design and implementation

The Interaction Agent handles conversation and delegation. The Execution Model processes tasks with separate configuration and context. The task Runtime loads the asset versions required by a workflow, saves SQLite checkpoints, reports progress through events, and pauses for sign-in, additional input, or submission confirmation.

Gateway connects outbound to Runtime, manages local MCP adapters on demand, and relays JSON-RPC. The browser path uses a pinned Playwright MCP version and the official extension to connect to a user-selected tab. The Blender path connects to an already running local Blender MCP endpoint. Runtime handles business policy and tool authorization.

## Current capabilities

- Create, query, and cancel tasks through REST / MCP; provide input and subscribe to events.
- Manage internal Skills, Prompts, Tools, MCP configuration, asset versions, workflow dependencies, and model profiles.
- Handle browser sign-in, form entry, and final submission confirmation in an expense workflow.
- Create objects through the experimental Blender adapter and return image results to the task interface.
- Use Chinese, Japanese, and English in the Vue Dashboard and SwiftUI Gateway. Interfaces emphasize actions and status, with installation guides and debugging details available on demand.

## Boundaries and tradeoffs

Public interfaces do not return internal Skill text, workflow definitions, or model configuration. Execution context is still sent to the configured model service, so the OpenRouter demo uses synthetic data only. Identity switching is a Demo mechanism; enterprise SSO, RBAC, device authentication, and production secret management are not implemented.

Offline tests and builds do not establish reliability across real browser or Blender environments. Blender scene operations modify the current scene and require a separate demonstration scene.

## Status and next step

The public repository's first CI run passed backend, Web, and macOS Gateway checks. Local validation passed 118 backend tests, 20 Dashboard tests, and Gateway smoke checks. Full XCTest remains unverified in the current Command Line Tools environment.

Follow-up work includes Blender restart recovery and real scene regression checks, native app packaging, and production identity and authorization.

[Repository](https://github.com/cyberyimein/Meganeura) · [First CI run](https://github.com/cyberyimein/Meganeura/actions/runs/36763194384)

## Technology stack

Python / FastAPI / SQLite / Vue 3 / TypeScript / SwiftUI / AppKit / MCP / Playwright MCP / OpenRouter
