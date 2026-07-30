# BuddyNeko: A Cat-Shaped Desktop Interface for an Agent

BuddyNeko is a community Buddy design for the M5Stack CoreS3 StackChan. It turns the CoreS3 into a cat-shaped desktop terminal: the host agent owns AI, STT/TTS, tool calls, and authorization policy, while the device owns expressions, touch, camera sensing, audio, LEDs, and servo movement. The current firmware version is v0.7.0.

## Background and goal

When an agent can only return text, states such as coding, thinking, waiting for approval, completion, and failure are difficult to perceive on a desk. BuddyNeko projects those states onto a physical device while keeping the ESP32 firmware small enough to compile, debug, and connect to a different host agent.

Complex reasoning therefore stays on the host. The host owns model calls, tool execution, and authorization policy; StackChan renders state through the Call Buddy protocol and sends touch, audio, and sensor events back to the host.

## Design and implementation

Call Buddy uses line-oriented text commands and JSON Lines events. USB Serial runs at 115200 baud. When Wi-Fi is configured, TCP can carry the same commands and events, with half-duplex PCM16 audio on the same connection.

The firmware contains the state machine, 16-color cat sprites, touch handling, RGB effects, servo control, camera motion following, and display capture. A development host must explicitly request and renew a short-lived lease over USB Serial; when the lease expires, the device returns to its deployment host.

## Current capabilities

- Displays animated 16-color cat sprites on the CoreS3 screen.
- Uses Call Buddy to control idle, listening, thinking, speaking, coding, approval, done, and error states.
- Supports USB Serial, optional TCP, touch interaction, approval responses, servo movement, and RGB effects.
- Uses the camera for low-frequency motion following and can optionally send vision frames to a host endpoint.
- Transports microphone and speaker audio as half-duplex PCM16, keeping speech processing on the host.
- Provides dependency-free Python tools for asset generation, display capture, and development-host lease maintenance.

## Boundaries and tradeoffs

BuddyNeko is a community design, not official M5Stack factory firmware and not Xiaozhi firmware. The device does not run high-level AI; it handles presentation, input, and bounded movement instead.

Touch approval events express user intent only. Final authorization remains with the host policy. USB power never selects a development host automatically, and servo movement stays within firmware safety limits. The project targets trusted local or LAN use; the device protocol is not a complete identity and authentication layer.

## Status and next step

BuddyNeko is in active development, and the firmware can be compiled for real CoreS3 StackChan hardware. The next step is to keep refining its connection to an independent Agent Host so that expressions, movement, voice, and approval become stable parts of an agent workflow.

## Technology stack

C++ / Arduino / ESP32-S3 / M5Stack CoreS3 / StackChan BSP / Python / USB Serial / TCP / PCM16
