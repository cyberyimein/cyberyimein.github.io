# Kabumemo: A 100% Vibecoding AI Development Experiment

Kabumemo is a personal stock trading record website built purely by AI. In this project, I tried to challenge "zero handwritten code" and completed the development entirely by guiding GitHub Copilot Agent through instructions. This is not only a functional personal project, but also a benchmark test used to verify the capability gap between Copilot Agent and Claude Code (CC).

## Background

This project was initiated in the early days after Claude Code was released. At that time, GitHub Copilot Agent was still in testing, and the industry still had doubts about its ability to "build fully automatically." Through this project, I wanted to verify a core hypothesis: for completely personalized system requirements, do current AI Agents already have the ability to independently complete the whole process from architectural design to full-stack implementation? At the same time, this can also serve as a long-term sample for me to observe the iterative evolution of Copilot Agent.

## Implementation

In terms of technology choices, although the project functions are not complex, I deliberately introduced strong typing constraints to verify AI performance in a strict development environment:

- Full-stack type guards: The frontend uses TypeScript instead of JavaScript, and the backend Python forcibly enables Pydantic. Through the type system and data validation models, I can control the quality of AI-generated code more precisely and reduce logic hallucinations.

- Agent benchmark testing: Whenever Copilot Agent releases a major update, I refactor the project once. By comparing the code generation efficiency and bug rate of different versions, I quantify the improvement in AI capability.

- Zero handwritten intervention: Throughout the whole process, I am only responsible for proposing requirements and reviewing the logic. All code changes, environment configuration, and debugging are completed by the Agent.

## Future Work

At present, I am building my own personal Local Agent, and Kabumemo will be integrated into it as an important module:

* CLI mode expansion: Add a command-line tool to the system so that the Agent can use it directly.

* Automated entry: Hand over the entry of trading records to the local Agent, realizing a fully automated flow from data fetching to storage.
