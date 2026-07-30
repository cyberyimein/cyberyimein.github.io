# Experiment: Letting an Agent read the room

This experiment validates Anomalo's path for the new MCP protocol. Through the room-climate MCP Server exposed by FruitSpy, the Agent can now read the temperature, humidity, and CO2 concentration in my room. The current conclusion is that the protocol connection and structured tool call work, but this is not yet a continuous environmental-monitoring system.

## Question

MCP should connect not only abstract software services but also real environmental state within explicit boundaries. The question was whether Anomalo could use the new stateless protocol to connect to a remote Streamable HTTP Server, discover a room-climate tool, and pass sensor results to the Agent.

## Method

Anomalo configures `fruitspy_room_climate` with `streamable_http`, uses protocol mode `auto`, and points to FruitSpy's `/api/v1/tools/room-climate/mcp` endpoint. The MCP Provider probes `server/discover` first and falls back to the older `initialize` handshake when needed. After discovery, it calls `get_room_climate` for structured content. The configuration and remote address are trusted-network settings, and the server is still activated per session.

## Result

In the actual validation, I had the Agent read the room temperature, humidity, and CO2 concentration successfully. Anomalo tests also cover remote tool discovery, structured `temperature_c` content, request metadata, and the `2026-07-28` modern-protocol marker, while retaining recognition of the `2025-11-25` legacy fallback. This establishes a usable Agent-to-MCP-Server call path, not a sensor-calibration report.

## Limitations

The current configuration targets a trusted LAN and depends on the FruitSpy service and an online sensor. This validation records a working current read; it does not establish continuous sampling, history storage, threshold alerts, or sensor accuracy. The tests primarily verify the MCP adapter rather than the physical device itself.

## Subsequent Impact

Environmental sensing extends the Harness from software tools to a physical state in the room and gives the MCP branch a real, observable input. The next step is to record repeated readings, service-unavailable cases, and malformed data before deciding whether environmental context belongs in Agent memory or automation rules.
