# BuddyNeko: Giving an Agent a Cat-Shaped Body

BuddyNeko is a community Buddy design for the M5Stack CoreS3 StackChan. It turns the CoreS3 into a cat-shaped desktop terminal: high-level AI, STT/TTS, tool calls, and policy decisions stay on the host, while the device focuses on expressions, touch, camera sensing, audio, LEDs, and servo movement through the lightweight Call Buddy protocol.

## From Agent Host to Physical Buddy

An agent that can only return text is difficult to experience as a desktop companion. Coding, thinking, waiting for approval, completion, and errors can all become visible through expressions, lights, movement, and touch. BuddyNeko does not try to push complex reasoning onto the ESP32. It keeps the device simple, buildable, and debuggable while the host agent owns model calls, tools, and policy.

This creates a clear physical boundary for an Agent Host such as Anomalo: the host owns AI, STT, TTS, tools, and authorization policy; StackChan renders those states and sends touch, audio, and sensor events back to the host.

## What Is Implemented

- 16-color cat sprite animations for the CoreS3 display; the current firmware identifies itself as `0.7.0`.
- USB Serial at 115200 and optional TCP text/event transport.
- Call Buddy commands for idle, listening, thinking, speaking, coding, approval, done, and error states.
- Touch interaction, approval responses, servo movement, RGB effects, camera following, and an optional host vision endpoint.
- Half-duplex PCM16 microphone and speaker transport, keeping speech processing on the host.
- Dependency-free Python tools for asset generation, display capture, and development-host lease maintenance.

## Call Buddy and Safety Boundaries

The protocol uses line-oriented text commands and JSON Lines events. It starts with USB Serial and can reuse the same model over a TCP agent connection. Development mode must explicitly request and renew a short-lived lease over USB Serial; plugging in USB power never selects a development host automatically, and an expired lease returns the device to its deployment host.

The device only captures approval intent. Final authorization remains with the host policy, and servo movement stays within firmware safety limits. This boundary keeps the physical device easy to iterate on without hiding security decisions inside an unobservable hardware interaction.

## Technical Specifications

C++ / Arduino / ESP32-S3 / M5Stack CoreS3 / StackChan BSP / Python / USB Serial / TCP / PCM16

## Project Status

BuddyNeko is in active development, and the firmware can be compiled for real CoreS3 StackChan hardware. It is a community-designed physical Buddy, not official M5Stack factory firmware. The next step is to keep refining its connection to an independent Agent Host so that expressions, movement, voice, and approval can become part of an agent workflow on the desk.
