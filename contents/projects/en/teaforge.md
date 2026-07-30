# TeaForge: Turning Test Runs into Auditable Engineering Evidence

TeaForge is a Python CLI and Agent Skill that turns automated tests into reviewable, versioned engineering documents. Version 0.2.0 completes its original objective: generating PCL documents, coverage reports, Mermaid diagrams, and optional PDFs for pytest, Jest, Angular/Jest, and Playwright.

## Background and goal

When an agent can generate code and tests quickly, the engineering problem shifts to verifying the result. Green tests alone do not explain the test subject, expected and actual values, executed branches, or whether a failure was hidden. TeaForge keeps that evidence available for another engineer or agent to review.

## Design and implementation

TeaForge maps each test to a provable Test Subject and keeps design-time static evidence separate from runtime evidence. The Python workflow uses pytest. JavaScript and TypeScript workflows use packaged Tree-sitter grammars to extract structural evidence instead of guessing source relationships with regular expressions.

Jest supports static, runtime, and automatic evidence modes. Runtime mode invokes only the Jest already installed by the target project and records matcher, expected value, actual value, pass/fail state, `.not`, Promise, and thrown-error behavior. The coverage workflow reads Python coverage or Jest/Istanbul data, produces file-level C0/C1 metrics, and can add typed Mermaid flowchart and sequence-diagram pages.

## Current capabilities

- Generates versioned PCL documents from pytest, Jest/TypeScript, Angular/Jest, and Playwright tests.
- Emits sibling JSON and HTML artifacts and splits large matrices into fixed 25-column sheets.
- Produces file-level C0/C1 coverage reports from Python coverage or Istanbul data.
- Generates and validates Mermaid flowcharts and sequence diagrams and can export PDFs through optional WeasyPrint support.
- Uses `teaforge doctor` to check runners, renderers, packaged resources, and target-project capabilities.
- Uses separate exit codes for tool errors, Jest runs with failure evidence, and reports that miss coverage gates.

## Boundaries and tradeoffs

TeaForge is not a TypeScript type checker and does not infer dynamic imports or complex dynamic test construction. Jest must come from a runner already installed by the target project; TeaForge never uses `npx` to download dependencies. It fails explicitly when it cannot prove source identity, diagram type, or a required capability.

Runtime evidence applies default redaction for common credential keys and patterns and limits values, records, and file sizes. Coverage remains file-level evidence; organization-wide aggregation and policy profiles are outside the current product boundary. PDF and Mermaid rendering are optional capabilities that depend on external tools.

## Status and next step

TeaForge v0.2.0 completes its original objective, and the current product boundary is closed. Organization-level reporting and more complex integration-test strategies remain possible future explorations, but they are not implemented capabilities of the current version.

## Technology stack

Python 3.11+ / Typer / pytest / Jest / Angular / Playwright / Tree-sitter / coverage.py / Istanbul / Mermaid / Jinja2 / WeasyPrint
