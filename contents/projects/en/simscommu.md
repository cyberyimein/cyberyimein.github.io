# SimsCommu: A Speaking Practice Experiment That Starts and Ends with Voice

SimsCommu is a multi-agent speaking practice web application. The starting point of this project is actually very simple: first, I personally want to practice speaking, and second, I want to verify whether the three-stage STT, TTT, and TTS voice architecture can be organized into a genuinely usable AI application.

## Background

I have always wanted to build an AI application that starts with voice and ends with voice, instead of staying only at the text chat layer. In China's ChatAI market, the product with the largest share is not the one with the best raw AI capability, but Doubao, which was among the first to realize the interaction pattern of "the user speaks, the AI answers." ATA (Audio-to-Audio) interaction will almost certainly become the mainstream form of conversational AI in the future.

So the background of SimsCommu is not complicated: I want to build a system for my own speaking practice, while also using it to validate a concrete engineering route, where STT is responsible for listening, TTT is responsible for understanding and generation, and TTS is responsible for speaking. If this works, many later voice scenarios can keep growing on top of the same base.

## Implementation

The current implementation has already connected this main loop. The user speaks first, the system sends the audio into STT, then passes the text to the dialogue-layer LLM for processing, and finally uses TTS to play the reply back out. To make practice feel closer to a scene conversation, I did not build it as a single-role chatbot. Instead, I added a host agent. The host agent analyzes the conversation setup, assigns the corresponding business roles, and lets the system decide who should reply in the next turn.

Structurally, this is still a fairly clear three-stage application: STT -> TTT -> TTS. Frankly speaking, by the time I implemented this code, that structure was already outdated. The industry had already implemented duplex architectures in which STT and TTS happen at the same time. The AI can interrupt the user, and the user can also cut in at any time.

## Future Work

1. Continue optimizing the host agent by adding evaluation, reminders, and polishing for STT output, along with the ability to correct accent recognition errors, so it does more than just assign turns and can actually guide practice and produce more suitable replies.

2. Gradually move the current STT -> TTT -> TTS serial structure toward a duplex voice architecture, reducing waiting and making the whole practice process feel more like a real-time conversation.