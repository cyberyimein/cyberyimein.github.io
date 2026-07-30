# Classified Article Redaction Policy

## Purpose

Keep the article technically informative while preventing disclosure of employer, customer, partner, and internal business information. Apply the smallest safe redaction: retain public technology and generic engineering structure, but black out the business-specific term that connects them to a real organization or workflow.

## Information that must be blacked out

Redact a span when it contains or enables a reasonable inference about any of the following:

- employer, client, partner, vendor, department, team, or individual identities that are not already approved for publication;
- internal project, product, feature, service, model, agent, repository, database, dataset, dashboard, document, or code names;
- proprietary business objectives, use cases, workflows, decision rules, operating procedures, and customer journeys;
- non-public protocols, tools, APIs, endpoints, hosts, URLs, cloud resources, tenants, subscriptions, environments, topology, permissions, or security controls;
- case, ticket, order, account, customer, contract, tenant, employee, model, dataset, or other internal identifiers and identifier formats;
- internal knowledge-base content, prompts, search queries, taxonomies, field names, schemas, examples, and distinctive company terminology;
- exact metrics, baselines, targets, sample sizes, accuracy or quality changes, costs, volumes, adoption, revenue effects, and other business outcomes not approved for publication;
- unannounced dates, milestones, releases, incidents, vulnerabilities, migrations, roadmaps, organizational changes, and future plans;
- credentials, secrets, personal data, customer data, production data, or any material restricted by policy, contract, NDA, privacy, or law.

Treat an exact value as sensitive even when a qualitative statement is publishable. Treat a combination of facts as sensitive when the combination could identify the hidden business context.

## Information normally safe to retain

Retain only when the surrounding context does not make it identifying:

- publicly documented technology names such as Azure AI Foundry, FastAPI, Python, MCP, and RAG;
- generic architectural patterns such as multi-Agent collaboration, retrieval, tool execution, result checking, and separation of expert roles;
- the author's personal engineering actions and high-level lessons;
- qualitative implementation or outcome claims explicitly approved for public release;
- generic labels such as Expert A, Expert B, and Expert C.

Public availability must be verifiable. Do not assume that a name is public because it sounds generic or appears in a local repository.

## Black-block format

Use the Unicode full block `█` inline. Do not use HTML, spoiler syntax, `[REDACTED]`, asterisks, or prose such as “a redacted feature” when the historical sentence can safely remain.

Use fixed visual categories that do not reveal the original character count:

- `██` for a short identifier or identifier prefix;
- `█████` for a business, product, feature, dataset, team, customer, or metric subject;
- `███████` for a protocol, system, service, workflow, or longer named concept.

These are visual classes, not length measurements. Use the same class for the equivalent span in Chinese, English, and Japanese. Do not vary the number of blocks to match the source word.

Examples:

```markdown
通过 ███████ MCP 协议，Agent 可以执行脚本并完成 ███████ 业务流程。
Expert A turns vague requirements and ██ identifiers into search instructions.
最终改善了 █████ 功能的准确率。
```

Do not place the source value in comments, annotations, link destinations, alt text, commit messages, or adjacent explanations.

## Redaction quality rules

1. Preserve syntax and engineering meaning around the black block.
2. Redact the smallest safe span, including adjacent qualifiers when they would reveal the value.
3. Keep useful public detail; do not turn the whole article into a disclaimer.
4. Remove or generalize a sentence when its remaining context makes the hidden value obvious.
5. Never invent a replacement business name, result, metric, motivation, or conclusion.
6. Never recover a hidden value from Git history or another locale.
7. Never copy sensitive source material into the skill, a scratch file, test fixture, log, review comment, or delivery note.

## Three-language parity

Redaction is a semantic operation, not a character-level translation.

- Hide the same fact in every locale, even when its word order differs.
- Keep the same public claims and confidence level.
- Ensure no locale contains a more specific role, workflow, identifier, metric, or result.
- Use the same block class for corresponding hidden concepts.
- Search all three editions for source tokens and translated variants before delivery.

## Required footer

End every classified article with:

```markdown
---

CLASSIFIED — CyberYimein Internal Policy

Details have been redacted in accordance with organizational security protocols.
```

Keep this footer unchanged in all locales to preserve the site's historical classified-document identity.
