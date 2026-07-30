# SimsCommu: A Multi-Agent Application for Testing a Speaking-Practice Flow

SimsCommu is a v0.2.0 multi-agent speaking-practice web application. It connects scenario setup, role routing, remote STT, a text LLM, and remote TTS into a runnable practice flow. The current conclusion is that serial STT → TTT → TTS is useful for validating the flow, but is no longer the technical foundation for a restart.

## Background and goal

I wanted to build a practice application that starts with voice and ends with voice, while testing a specific engineering path: STT turns speech into text, TTT handles understanding and generation, and TTS turns the response back into speech. Speaking practice also needs different roles in a scenario, so the project tests multi-agent role orchestration as well.

## Design and implementation

The main application uses Fastify and TypeScript for the API and React with Vite for the frontend. The user configures the language, scenario, user role, and agent count; the application then uses OpenRouter to generate role configurations and create a session.

For each user turn, a host agent runs first. It chooses the next respondent from the scenario, user role, available roles, and conversation history, and returns a routing reason. The selected role agent then generates the reply. Session history stays in the main process memory, is capped at the latest 40 messages, and is exposed through WebSocket routing and reply events.

The frontend records audio. The main application forwards it to a separate STT service and sends the response text to a separate TTS service. The current path is serial: speech input must finish before text processing and speech output begin.

## Current capabilities

- Generates practice setup from language, scenario, user role, and agent count.
- Uses a host agent to choose the next respondent among multiple roles.
- Creates sessions, keeps bounded history, and streams routing and reply events over WebSocket.
- Sends recordings to a remote STT service and replies to a remote TTS service.
- Routes models through OpenRouter by scenario, module, or prompt ID.
- Provides development and production checks for the Fastify backend and React frontend.

## Boundaries and tradeoffs

The current implementation depends on remote STT, remote TTS, and OpenRouter configuration. Session state is kept in process memory and is not persisted across restarts. The voice path is also not live duplex, so the user and agent cannot naturally interrupt one another during the same turn.

This is a speaking-practice experiment, not a general customer-service system, and it does not treat the routing result as an objective evaluation. Host and role replies come from model calls, so their quality still depends on prompts, models, and the state of the remote services.

## Status and next step

SimsCommu is suspended pending a restart. The current implementation and its serial-architecture findings will be kept, but the existing path will not be extended. The next step is to redesign the voice path around a live duplex model, then reassess how the host agent, role orchestration, and practice feedback should join a real-time session.

## Technology stack

Fastify / TypeScript / React / Vite / OpenRouter / STT / TTS / WebSocket
