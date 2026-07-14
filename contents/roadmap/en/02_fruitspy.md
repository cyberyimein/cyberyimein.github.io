# FruitSpy: From a Server Monitor to an Apple Container Control Plane

FruitSpy started as a quick way to see CPU and memory usage on my home Mac mini. As that machine began hosting more personal services, the project was comprehensively refactored. The old Docker and Portainer path is gone; FruitSpy now runs directly on the macOS host as a FastAPI and React dashboard built around Apple Container.

## What It Does Now

- Shows live host CPU, memory, and storage usage.
- Lists Apple containers with status, live CPU, actual memory usage, and configured limits.
- Fetches recent logs per container and can optionally expose start, stop, and restart controls.
- Searches installed npm, Homebrew, pip, and uv packages and their versions.
- Uses a native macOS menu bar app to start or stop the service and open the dashboard.
- Builds as a self-contained one-click application whose runtime state lives under the user Library rather than depending on the source checkout.

## The Anomalo Connection

FruitSpy now also acts as Anomalo's Python Tool relay. After accepting a token-authenticated request from loopback or an allowlisted network, it starts a fresh Apple container for that execution, applies CPU, memory, concurrency, output, and timeout limits, captures the result, and removes the container.

Plots and small result files can be returned as short-lived artifacts. This gives Anomalo a useful Python tool without exposing arbitrary execution directly on the Mac mini host.

## Security Boundary

FruitSpy is intended for a trusted LAN and currently has no user login. Container controls are disabled by default and require explicit configuration, same-origin requests, and a dedicated header. The Python Tool uses its own token, source-network allowlist, and internal container network. Monitoring and higher-risk execution are deliberately configured as separate capabilities.

## Technical Specifications

FastAPI / WebSocket / React / Vite / macOS Menu Bar App / Apple Container / Python Sandbox

## Project Status

FruitSpy has completed its migration from Docker, Colima, and Portainer to Apple Container and runs as a persistent Mac mini login service. It still follows its original principle: it is not a general operations platform; it grows whenever my own server is missing something.
