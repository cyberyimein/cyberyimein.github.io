# Pelago: From test evidence to design and verification

Pelago is a design and verification tool installed inside an existing Git project. It stores requirements, design, PCL, and execution evidence. Version 0.1.0 implements a local CLI, review workbench, and host Agent workflow; interface and review details remain under development.

## Background and goal

TeaForge converts automated tests into PCL, coverage reports, and auditable evidence. Pelago carries these engineering conventions forward and moves the focus to the period before implementation: define requirements and design expectations, write tests, then use execution results to check whether the agreement holds.

This evolution addresses the relationship between design and verification. Passing tests need to trace back to specific requirements, evidence needs to distinguish design revisions, and subtask completion needs to remain separate from whole-feature delivery.

Pelago emerged alongside the development of other projects. I consider it the development process's Side B: an independent tool collecting the design and checking methods formed while working together. It continues TeaForge's ideas and sits outside the AnomaloHaris evolution branch.

## Design and implementation

Pelago installs its runtime, CLI, workbench, and Skill into the host project's `.pelago/` directory. The host Agent creates and revises archives through the CLI. The workbench presents design, PCL, and evidence for review and maintains project diagram requirements and testing rules.

Each Issue has an HTML archive with embedded JSON. Design objects use stable IDs, and references record design revisions. Changes retain history, and writes check for version conflicts. Structured data and readable documents are saved and synchronized through the host Git repository.

The workflow proceeds through design confirmation, test preparation, implementation, verification, and review. Design expectations and runtime evidence are stored separately; changes to design or tests affect the validity of subsequent evidence. The parent Issue retains responsibility for whole-scenario verification. Completing child Issues does not create parent verification results.

## Current capabilities

- Stores original requirements, design objects, file plans, and Mermaid diagrams for Features and Bugfixes. Bugfixes record reproduction, cause investigation, and As-Is/To-Be behavior.
- Uses PCL (Program Check List) to describe inputs, actions, expected outputs, and checks linked to requirements and design. Cases distinguish N Normal, E Exceptional, and I Boundary; each decision matrix sheet has at most 25 columns.
- Records design confirmation, test preparation, execution results, and host Agent reviews through the local CLI. Archive revisions support version-conflict checks and retained history.
- Uses versioned references to present a bug's related existing cases and additions together, marks added rows and matrix columns, and preserves source and execution status.
- Provides Chinese, Japanese, and English interface text, PCL labels, and export headings, with self-contained HTML and optional PDF exports. Authors' text and execution logs are not automatically translated.

## Boundaries and tradeoffs

Pelago provides no model API. The host Agent produces design, tests, and reviews, with review reports imported as evidence. Confirmation and acceptance records require actual user authorization. Review identity authentication is not implemented.

The merged PCL view supplies review context. It does not automatically execute existing cases or count a passing record from the original Issue as a passing regression. Test pass counts do not establish input or code coverage; corresponding tests and reports still need review.

Collaboration relies on the host Git repository. Live editing across clones and shared SQLite storage are not provided. PDF export requires an additional Playwright and browser environment. Direct TeaForge report import and integration verification across every technology stack are not provided.

## Status and next step

Pelago is under development at v0.1.0, with archives, workflow, and the review interface implemented. It continues TeaForge's ideas, while the current version's completion status and verification scope need separate assessment.

The next step is to refine document hierarchy, header information, action placement, and long-table reading based on actual review feedback. Acceptance continues to rely on current design, real execution results, and user confirmation.

## Technology stack

Node.js / TypeScript / Vue 3 / npm Workspaces / Mermaid / Git / HTML + JSON / Host Agent Skill
