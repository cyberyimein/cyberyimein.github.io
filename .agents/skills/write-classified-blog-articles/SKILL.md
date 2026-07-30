---
name: write-classified-blog-articles
description: Create, rewrite, translate, or review CyberYimein articles about employer, client, partner, NDA-bound, internal, unpublished, or otherwise non-public business work. Use when a blog article must preserve useful engineering detail and the project's historical classified-document style while replacing sensitive business terms with black-block redactions across Chinese, English, Japanese, and site metadata.
---

# Write Classified Blog Articles

Publish a useful technical account without exposing company or client information. Preserve the original narrative and redact only the sensitive spans with `█`; do not replace the article with a generic explanation that information was removed.

Read both of these files completely before drafting, translating, editing, or reviewing:

- [the general blog style guide](../write-blog-articles/references/style-guide.md);
- [the classified redaction policy](references/redaction-policy.md).

If either file is unavailable, stop before editing and report the missing dependency.

## Workflow

### 1. Establish the publication set

- Locate the Chinese, English, and Japanese Markdown editions and the matching `assets/data/projects.json` or `assets/data/roadmap.json` entry.
- Treat the unredacted source as sensitive even when it appears in the prompt, local files, or Git history.
- Use Git history only to learn the public article's structure, voice, and existing redaction boundaries. Never reconstruct, repeat, or expose text hidden by a black block.
- Do not send sensitive source material to web searches, external connectors, or third-party services.

### 2. Build a private disclosure map

- Mark every sensitive span using the categories in the redaction policy.
- Separate public technologies and generic engineering patterns from employer-specific business context.
- Consider combinations of individually harmless facts that could identify the company, customer, system, dataset, or workflow.
- When classification is uncertain, keep the span redacted and ask the author one focused question. Do not guess that it is public.

Do not save the disclosure map or original sensitive values in the repository.

### 3. Draft in the historical classified style

- Preserve the first-person engineering account, the sequence of practices, and safe implementation details.
- Replace only sensitive spans with black blocks. Keep the surrounding grammar readable.
- Prefer the compact historical shape: a direct title and introduction, `## 概略` / `## Overview` / `## 概要`, then numbered practices with short explanatory paragraphs or lists.
- Do not add invented evaluation criteria, limitations, migration plans, or claims merely to fit the general experiment template.
- Do not repeatedly narrate that details were redacted. The black blocks and classified footer already communicate that boundary.
- End every edition with the exact footer specified in the redaction policy.

### 4. Synchronize all public surfaces

- Apply equivalent redactions to all three languages. A reader must not recover a hidden term by switching locale.
- Keep public claims, uncertainty, numbers, architecture, status, and section order semantically aligned.
- Redact sensitive values in titles, descriptions, version fields, identifiers, links, code, tables, image captions, alt text, filenames, and other metadata—not only prose.
- For classified roadmap records, retain `"type": "classified"`, use a non-informative version such as `"██"`, and avoid progress or status detail that reveals non-public delivery information.

### 5. Perform a leakage review

Review the rendered article and the source files:

- search changed files for every known sensitive token and close variants;
- compare the three editions section by section and redaction by redaction;
- inspect JSON metadata, URLs, code blocks, captions, and link targets;
- verify black-block lengths do not encode the original token length;
- check that nearby details cannot trivially reveal a blacked-out value;
- ensure diffs, comments, delivery notes, and proposed commit messages do not repeat sensitive values.

If safe publication would require redacting most of a sentence or preserving the sentence would reveal the missing value, remove or rewrite that sentence at a higher, still-useful technical level.

## Delivery

When editing files, report only:

- the public sources and historical versions inspected;
- the files changed;
- the categories of information redacted;
- unresolved classification decisions stated generically.

Never include the original sensitive values in the delivery summary.
