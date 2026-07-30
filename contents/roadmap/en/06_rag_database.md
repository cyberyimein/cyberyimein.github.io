# Experiment: Making retrieval a traceable context layer

This card records the local retrieval experiment in myRAG. The current conclusion is that documents, index versions, and retrieval runs can be managed separately, then used for hybrid retrieval that returns evidence chunks with sources. It provides an inspectable data layer for context assembly in the Anomalo Harness.

## Question

When an Agent relies only on short-lived session context, retrieved material is difficult to reuse and difficult to explain. The question was how to turn document ingestion, chunking, indexing, and retrieval into a repeatable workflow instead of placing raw text directly into a prompt.

## Method

myRAG stores documents, immutable configuration versions, index state, and retrieval runs per project. Version one supports recursive length chunking and semantic paragraph chunking, uses OpenRouter embeddings together with SQLite FTS5 keyword recall, and merges candidates with RRF. An optional hierarchical description index stores vectors for the original chunks, chunk descriptions, and document descriptions; document vectors are only a soft routing boost, while original chunks remain the evidence. The REST API covers project creation, document import, reindexing, project retrieval, and primary-database retrieval.

## Result

The API flow and tests cover the loop from project creation through document import, configuration, reindexing, and retrieval. Test results include both content-vector and keyword matches while retaining chunk sources and rank information. This experiment provides traceable retrieval evidence, but the current code evidence describes a separate myRAG workbench; the Anomalo repository still lists RAG as a Harness evolution goal, so it should not be described as a completed direct adapter in the same repository.

## Limitations

Version one targets English material and keeps the tokenizer as `none`. Building vectors requires an OpenRouter API key, and description generation adds chat and embedding calls. The README lists East Asian tokenizers and MCP as later experiments, so this card validates the RAG retrieval foundation rather than a complete MCP database service.

## Subsequent Impact

RAG gives the Harness an observable interface for “long-term material”: before context assembly, an Agent can receive chunks, sources, and match types. The next step is to decide how Anomalo should connect to myRAG and evaluate retrieval quality on real tasks instead of treating a finished index as equivalent to answer quality.
