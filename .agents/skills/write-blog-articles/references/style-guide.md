# CyberYimein Blog Style Guide

## Editorial identity

Write concise, restrained, evidence-led personal technical articles. Keep the author's first-person perspective where it explains motivation or judgment, but let engineering facts carry the article.

The intended voice is:

- technically precise without sounding like product documentation;
- personal without becoming a diary;
- confident about verified facts and explicit about uncertainty;
- readable by engineers who do not know the project;
- interested in decisions, boundaries, and lessons rather than feature promotion.

## Information order

Answer these questions in order:

1. What is this?
2. What problem or question led to it?
3. How does it work?
4. What has actually been implemented or observed?
5. What are its boundaries and tradeoffs?
6. What is its current status and next concrete step?

Lead with the answer. Do not begin with a broad account of the AI industry unless that context directly changes the engineering decision.

## Project structure

Use this structure as a default, then rename or omit sections when the content calls for it:

```markdown
# Project: concise positioning or evolution

Two or three sentences defining the project, its purpose, and current state.

## Background and goal

Why it exists and what constraints shape it.

## Design and implementation

Architecture, important decisions, and reasons for those decisions.

## Current capabilities

Only implemented capabilities that matter to the article.

## Boundaries and tradeoffs

Security model, exclusions, limitations, or deliberate non-goals.

## Status and next step

Current version or lifecycle state and the next concrete task.

## Technology stack

Compact technology list.
```

Do not add a section merely to satisfy the template. A short project note may combine design and capabilities. Put a critical status such as suspended or completed near the beginning when it changes how the whole article should be read.

## Experiment structure

Use this structure for exploratory work:

```markdown
# Experiment: question or conclusion

A short definition of the experiment and its current conclusion.

## Question

What was tested and why it mattered.

## Method

How the experiment was constructed and evaluated.

## Result

What was observed. Separate observation from interpretation.

## Limitations

What this experiment does not establish.

## Subsequent impact

How the result affected later design or work.
```

Never manufacture a clean success narrative. A negative, incomplete, or superseded result is still useful when described precisely.

## Sentence and paragraph style

- Give each paragraph one main idea.
- Prefer short declarative sentences, but vary rhythm enough to avoid sounding mechanical.
- State the decision before its supporting detail.
- Prefer concrete subjects and active verbs.
- Use lists for parallel capabilities, requirements, or constraints; use prose for causality and argument.
- Avoid repeating a list in prose.
- Keep an acronym only if it recurs or is standard for the intended audience.
- Explain project-specific terms on first use.

Delete filler that does not change meaning, including habitual uses of:

- “其实”, “真正”, “非常”, “彻底”, “完整”, “简单来说”;
- “actually”, “truly”, “very”, “completely”, “simply”;
- 「実は」「本当に」「非常に」「完全に」「簡単に言えば」.

These words are allowed only when the distinction is technically meaningful.

Avoid promotional constructions such as “not merely X, but Y” when a direct statement works. Avoid unqualified claims about what the industry will certainly do. Attribute personal judgments with “我认为”, “I chose”, or 「〜と判断した」 and give the engineering reason.

## Terminology

- Use `Agent` as the standard general term in all three languages; use `AI Agent` only when distinguishing it from another kind of agent.
- Keep official names unchanged: FastAPI, Vue 3, Apple Container, MCP, WebSocket, StackChan, OpenRouter, pytest.
- Add spaces between Chinese text and Latin words or numbers: `使用 FastAPI 构建`, `v0.2.0 版本`.
- Use full-width Chinese punctuation in Chinese prose.
- Use `：` in Chinese titles and headings; do not mix it with `:`.
- Use conventional English capitalization for English headings.
- Use natural Japanese punctuation and particles; do not insert Chinese-style spacing into Japanese.
- Prefer localized section names. Keep an English heading only when it is an established proper label or deliberate site convention.

Standard section names:

| Purpose | Chinese | English | Japanese |
| --- | --- | --- | --- |
| Motivation | 背景与目标 | Background and Goal | 背景と目標 |
| Design | 设计与实现 | Design and Implementation | 設計と実装 |
| Capabilities | 当前能力 | Current Capabilities | 現在の機能 |
| Boundaries | 边界与取舍 | Boundaries and Tradeoffs | 境界とトレードオフ |
| Status | 状态与下一步 | Status and Next Step | 状態と次のステップ |
| Stack | 技术栈 | Technology Stack | 技術スタック |
| Question | 问题 | Question | 検証課題 |
| Method | 方法 | Method | 方法 |
| Result | 结果 | Result | 結果 |
| Limitations | 局限 | Limitations | 制約 |
| Impact | 后续影响 | Subsequent Impact | その後への影響 |

## Chinese edition

- Use clear modern written Chinese, not translated bureaucratic prose.
- Retain first person for personal motivation and decisions.
- Prefer “用于”“支持”“限制”“选择” over inflated phrases such as “赋能”“打造”“全面实现”.
- Avoid comma-spliced long sentences. Split cause, implementation, and result when each needs emphasis.
- Do not translate established code or product identifiers.

## English edition

- Write direct international technical English.
- Prefer active voice and concrete verbs.
- Avoid marketing adjectives such as “powerful”, “seamless”, “cutting-edge”, and “revolutionary”.
- Do not retain Chinese rhetorical sequencing such as “first, second, third” unless it represents a real ordered procedure.
- Use sentence case for headings.
- Use the same confidence level as the Chinese edition.

## Japanese edition

- Write natural technical Japanese rather than word-for-word Chinese translation.
- Prefer concise plain style (`だ・である`) for article prose and use it consistently within an article.
- Avoid excessive nominalization and repeated 「〜することができる」; prefer direct verbs such as 「対応する」「実行する」「確認できる」.
- Use Japanese technical conventions while retaining established product names.
- Preserve the same degree of certainty and personal attribution as the other editions.

## Three-language parity

The three editions must agree on:

- the central claim and current conclusion;
- section order and conceptual coverage;
- implemented versus planned capabilities;
- numbers, versions, dates, statuses, and progress;
- architecture and technology names;
- security boundaries, limitations, and non-goals;
- relationship to other projects;
- next steps.

Equivalent phrasing is required; identical sentence boundaries are not. A paragraph may be split or combined for natural expression, but it must not gain or lose a claim.

Use a semantic parity pass after translation:

1. Summarize each section of each language in one sentence.
2. Compare the three summaries.
3. Compare all factual tokens: names, numbers, versions, status words, and negations.
4. Resolve differences from evidence or ask the author.
5. Record any intentional locale-specific difference in the delivery note.

## Evidence and uncertainty

Use this priority order:

1. current implementation and tests;
2. versioned architecture documentation and ADRs;
3. current README and release notes;
4. project metadata in this site;
5. existing article prose;
6. author clarification.

Author clarification is authoritative for motivation, personal judgment, unpublished history, and intended direction. Code is authoritative for what is currently implemented.

When sources conflict, do not silently choose the most convenient statement. Identify the conflict, prefer the more current verifiable source for implementation facts, and ask the author when the difference changes the article's meaning.

Use precise uncertainty:

- verified implementation: “支持 / supports / 対応する”;
- planned work: “计划 / is planned / 予定している”;
- personal interpretation: “我认为 / I consider / 〜と考えている”;
- incomplete evidence: state what was observed and what remains unverified.

## Markdown constraints

The site renderer supports headings, paragraphs, bold, italic, inline code, links, unordered and ordered lists, checklists, fenced code blocks, tables, blockquotes, and horizontal rules.

- Use one `#` title per file.
- Use `##` for primary article sections.
- Avoid raw HTML, footnotes, nested lists, definition lists, and other unsupported constructs.
- Add a language tag to fenced code blocks where known.
- Use tables only for information that benefits from row-and-column comparison.

## Final checklist

- Is the opening understandable without prior project knowledge?
- Is every implementation claim supported by code or current documentation?
- Did the author confirm undocumented motivation and experimental conclusions?
- Does each section add information rather than repeat another section?
- Are boundaries and uncertainty explicit?
- Are Chinese, English, and Japanese semantically equivalent and idiomatic?
- Do site metadata and article status agree?
- Are terminology, punctuation, and heading conventions consistent?
- Is every Markdown construct supported by the site renderer?
