# Experiment: From vector retrieval toward agentic search

This RAG Database update explores a change in search behavior: from returning chunks ranked by vector similarity toward agentic search that follows how people look through material. The Agent browses outlines, chooses keywords, reads sources, and decides whether to search again. myRAG implements the browsing, search, and reading interfaces this process needs. Autonomous orchestration and effectiveness evaluation remain to be connected.

## Question

People consult contents, look for terms, read relevant chapters, and refine their questions. I want to test whether an Agent can follow a similar exploratory process, changing its search strategy as it reads. Vectors, keywords, and description indexes are handled internally; the external interface exposes material the Agent can navigate.

This is also a local trial of industry approaches to agentic search. Anthropic's [context engineering article](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) describes loading material on demand through tools and progressively discovering context. This experiment asks how that approach fits a document and case library, keeping source-vector retrieval as a baseline.

## Method

myRAG first builds material that can be explored. Outline and section mode preserves Markdown heading hierarchy, order, and source character ranges; plain text without an explicit outline gets one document node. The REST API separately exposes outline browsing, search, and source reading. Search returns clues and excerpts. Reading can include child sections and paginated text, while document, section, and index IDs preserve source references.

The indexer internally prepares section keywords, descriptions, and hypothetical retrieval intents, such as “How do I make source changes appear in search?” With AI cards enabled, parent sections use child descriptions, the document description lives in the root node, and only descriptions and intents are embedded. SQLite FTS5 retains lexical search over headings, terms, and source text. Keyword, semantic, and hybrid methods serve internal retrieval; the experimental interface still allows separate inspection. Offline keyword mode needs no model credentials.

User cases use a different structure: a case overview and an event timeline. Import preserves the original event records and distinguishes observations, actions, hypotheses, and results. Unconfirmed causes or outcomes remain unknown. Case snapshots use the same search and reading interfaces.

The planned Agent loop is “discover → read → assess → search again,” with the task and material already read determining when to continue. This follows the division in the Search & Fetch card: search discovers clues, and reading supplies further evidence. The primary search entry point stays pinned to a selected index version, preserving the same material for comparisons between search processes.

## Result

All 15 offline tests passed, covering outline hierarchy, Chinese keywords, source ranges and pagination, case records, pinned indexes, and description/intent-vector retrieval. Model tests used substitutes. They verified that source text was not embedded and that intent vectors could retrieve a differently worded query; they did not establish whether a real model generates accurate intents.

Frontend type checks and the build passed. Local interface checks also covered import, browsing, search, and reading. The result is the material and tool foundation for agentic search. AnomaloHaris is not connected yet; a working manual flow does not establish autonomous Agent search.

## Limitations

Outline parsing currently handles Markdown headings, and Chinese and Japanese search use simple character bigrams. Card descriptions can omit details, and hypothetical intents can exceed what the material can answer. Vector ranks express similarity, not confidence in an answer.

Real-model card quality, recall, and cost have not been evaluated. Cases support snapshot import without event append or correction. Reranking, incremental indexing, and complex document parsing are also unimplemented. Multi-step Agent exploration may increase latency and cost or follow irrelevant clues. It has not been shown to outperform a single vector-retrieval step here.

## Subsequent impact

The next step is to connect browsing, search, and reading to AnomaloHaris and run a search loop whose steps the Agent chooses. The same document and case questions will compare single-pass retrieval with active reading and follow-up searches, checking evidence sufficiency, missed material, latency, tool-call counts, and cost. Vectors remain internal indexing and retrieval options; the experiment focuses on how the Agent finds and uses material.
