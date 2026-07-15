# TeaForge: Forging Automated Tests into Auditable Engineering Evidence

When AI agents can generate large amounts of code and tests in minutes, the human bottleneck moves from writing to verification. A row of green tests does not explain what was tested, what values were expected and observed, which branches ran, whether failures were hidden, or whether another engineer can audit the result.

TeaForge turns executable tests into reviewable engineering evidence. It is an installable Python CLI with an Agent Skill, giving engineers and coding agents the same commands and boundaries for producing Japanese-style PCL documents, coverage reports, flowcharts, sequence diagrams, and PDFs.

## From Demo to v0.2.0

TeaForge began as an experiment that generated test checklists from pytest. The completed v0.2.0 supports pytest, Jest and TypeScript, Angular/Jest, and Playwright, mapping each test to a proven Test Subject. For JavaScript and TypeScript, packaged Tree-sitter grammars produce structural evidence instead of relying on fragile regular expressions.

Jest supports static, runtime, and automatic evidence modes. Runtime mode invokes the target project's already-installed, locked Jest and captures matcher, expected value, observed actual value, pass/fail state, `.not`, Promise, and thrown-error behavior. TeaForge never uses `npx` to download a runner and does not disguise test failures as tool success; an evidence-bearing failed test run has its own exit code.

## PCL and Coverage

PCL documents are grouped by test subject and emitted as adjacent, versioned JSON and HTML artifacts. Large matrices split into fixed 25-column sheets without changing the stable subject identity or schema version.

Coverage generation reads Python coverage or Jest/Istanbul data, produces file-level C0/C1 metrics, and can enforce minimum thresholds. Reports may include typed Mermaid flowchart and sequence-diagram pages and can be exported to PDF with optional WeasyPrint support. A metric with no measurable statements or branches is reported as N/A instead of being turned into a flattering percentage.

## Boundaries Designed for Agents

`teaforge doctor` checks target projects, runners, renderers, and packaged resources in human-readable or JSON form. External processes use exact paths, one workflow deadline, bounded diagnostics, and process-tree cleanup after a timeout. Artifacts use same-directory temporary files and atomic replacement so interrupted writes do not destroy the last valid report.

Runtime evidence redacts common credential keys and patterns and enforces value, record, and file-size limits. TeaForge prefers an explicit failure when it cannot prove source identity, diagram type, or an environmental capability over producing a plausible but unauditable document.

## Cross-Platform Quality Gates

CI covers Linux and Windows, Python 3.11 through 3.14, and Node 20 and 22. It enforces Ruff, an 80% branch-coverage baseline, wheel and sdist builds, real pytest coverage from an isolated install, Jest smoke tests, Mermaid validation, and PDF checks. Architecture decisions live in ADRs, while the shared domain language is maintained in CONTEXT.md.

## Technical Specifications

Python 3.11+ / Typer / pytest / Jest / Angular / Playwright / Tree-sitter / coverage.py / Istanbul / Mermaid / Jinja2 / WeasyPrint

## Project Status: Completed

TeaForge v0.2.0 completes its original objective: reliably converting multi-framework test evidence into auditable, versioned engineering artifacts that humans and agents can use together. Organization-level reporting and broader integration-test strategies remain possible future directions, but the current product boundary is complete.
