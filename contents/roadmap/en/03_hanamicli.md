# Experiment: Testing Direct Agent Tool Calls with Hanami CLI

Hanami CLI is a small experiment that scrapes an expected cherry blossom date and updates a display page. It combines a traditional CLI with an Agent Skill to test whether an agent can call a tool directly in one concrete workflow instead of first wrapping every action in an MCP server. The public material records only a test in a local OpenClaw environment.

## Question

The experiment compares two ways to expose a tool: an agent directly calling a CLI described by a Skill, and an agent calling a tool through MCP. The question is not whether a CLI can replace MCP in every scenario, but whether a simple seasonal-data workflow can use the lighter interface.

## Method

The CLI retrieves the expected cherry blossom date from a weather-forecast site and synchronizes it to a simple display page. The Skill describes the invocation boundary and usage so a local agent can discover and run the CLI. Because the implementation repository and concrete interfaces are not public, this article does not add undocumented scraping strategies, page structure, or test data.

## Result

The recorded result is that the workflow ran successfully in a local OpenClaw environment. This shows that the CLI-plus-Skill combination is feasible for this constrained workflow, but it does not show that it can replace MCP for complex orchestration, authorization, protocol compatibility, or other agent environments.

## Limitations

No public source repository, run logs, test samples, or comparison metrics against MCP are available. Scraping reliability, seasonal-data update policy, failure handling, and long-term maintenance cost therefore remain unverified.

## Subsequent impact

The roadmap card is marked complete. The public record gives no documented next implementation; the supported conclusion is limited to this specific workflow running in a local OpenClaw environment with a traditional CLI and Skill.
