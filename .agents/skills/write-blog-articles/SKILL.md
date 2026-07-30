---
name: write-blog-articles
description: Create, rewrite, translate, or review CyberYimein project and experiment articles in concise technical-blog style. Use for content under contents/projects or contents/roadmap, and when synchronizing their Chinese, English, Japanese, projects.json, or roadmap.json representations.
---

# Write Blog Articles

Apply one editorial standard to all CyberYimein articles. Treat Chinese, English, and Japanese as three equivalent editions of the same article.

Read [references/style-guide.md](references/style-guide.md) completely before drafting, rewriting, translating, or reviewing an article.

## Workflow

### 1. Establish the article set

- Locate the `cn`, `en`, and `jp` Markdown files for the same item.
- Locate the matching entries in `assets/data/projects.json` and `assets/data/roadmap.json`.
- Identify whether the item is a project, an experiment, or a site/meta article.
- Treat an existing edition as input, not automatically as authoritative truth.

### 2. Build an evidence sheet

For a project with an available local or public repository:

- Inspect the repository before writing.
- Read its README first, then relevant manifests, architecture notes, ADRs, release notes, configuration, and current implementation.
- Prefer current implementation and versioned documentation over old prose.
- Record the purpose, implemented capabilities, architecture, constraints, status, version, and next step.
- Distinguish verified implementation from plans and personal interpretation.
- Do not copy README phrasing mechanically; synthesize it into the blog's voice.

If only a repository URL is available, inspect it with the appropriate connected source or browser when access is possible. If it cannot be accessed, state that limitation and continue only with facts available in the current project.

For an experiment, unpublished project, classified item, or any item whose motivation, result, or conclusion is not documented:

- Ask the author targeted questions before drafting.
- Confirm at minimum: the question being tested, why it mattered, how the experiment was run, what was observed, what remains uncertain, and how the result affected later work.
- Ask one focused group of questions at a time.
- Do not invent motivation, chronology, evaluation results, technical choices, or conclusions to fill gaps.
- Continue independently with verified sections while waiting only when doing so cannot bias the missing content.

### 3. Draft the Chinese edition

- Use Chinese as the working semantic baseline unless the author explicitly chooses another source language.
- Select the project or experiment structure from the style guide.
- Lead with the article's identity and current conclusion.
- Keep only details that explain the goal, design, evidence, tradeoffs, or status.
- Mark plans as plans and opinions as opinions.

### 4. Produce English and Japanese editions

- Translate meaning, not Chinese syntax.
- Preserve the same title claim, section order, facts, qualifications, status, versions, and list membership.
- Write idiomatic technical English and natural Japanese.
- Do not add explanation, confidence, praise, or specificity in only one language.
- Retain established product names, API names, protocol names, commands, and code identifiers.

### 5. Synchronize metadata

- Update the matching localized `title`, `description` or `desc`, `statusReason`, and other reader-facing fields when the article changes their meaning.
- Keep status, version, percentages, repository links, and technology names consistent with verified sources.
- Preserve unrelated JSON fields and existing formatting where practical.
- Never update one locale without checking the other two.

### 6. Perform the editorial review

Review all three editions side by side:

- Check semantic parity section by section.
- Check every number, version, status, technology, limitation, and future claim.
- Remove unsupported industry claims and promotional wording.
- Normalize terminology, capitalization, punctuation, and heading style.
- Verify Markdown uses only constructs supported by `assets/js/md.js`.
- Report unresolved factual gaps instead of hiding them with fluent prose.

## Delivery

When asked to edit files, finish the complete article set and summarize:

- sources inspected;
- author decisions incorporated;
- files changed;
- unresolved facts or deliberate differences between locales.

When asked only to discuss or review, do not modify articles. Present concrete findings and the smallest set of questions needed to proceed.
