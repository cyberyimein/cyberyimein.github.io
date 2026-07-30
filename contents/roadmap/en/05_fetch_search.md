# Experiment: Search for discovery, Fetch for evidence

This card records Anomalo's `Search & Fetch` web-retrieval capability, not a simple extension of Hanami CLI. The implementation calls two tools in order: `web_search` discovers candidate sources, then `web_fetch` reads a selected page and returns Markdown an Agent can process.

## Question

An Agent needs to find a potentially relevant source, then read its body while preserving the boundary of that source. One generic “web tool” would blur discovery, evidence collection, and failure causes, so the question was how to split the path into two observable and constrained steps.

## Method

`web_search` uses DuckDuckGo HTML and returns titles, URLs, and snippets, with a short-lived cache for repeated queries. `web_fetch` accepts only public HTTP(S) targets; direct mode cleans HTML into Markdown and supports character windows with a continuation offset. In `auto` mode, a page that appears to depend on JavaScript is sent to FruitSpy's Crawl4AI endpoint. Calls, providers, and timings are recorded in the current session's Web Activity trace.

## Result

The implementation and tests cover structured search results, search caching, direct page conversion, dynamic-page fallback, and rejection of private targets and cross-origin authenticated redirects. The Agent receives candidate sources and readable page content rather than a black-box answer that mixes retrieval, generation, and citation.

## Limitations

Search depends on DuckDuckGo HTML and may encounter challenges or rate limits. Fetch is limited to public targets, and dynamic-page fallback requires a configured FruitSpy Crawl4AI service. The pair does not decide whether a source is trustworthy or generate the final conclusion; source quality and evidence interpretation remain the responsibility of the higher-level Agent.

## Subsequent Impact

This validation turned “the web” into two independently testable Harness capabilities. Its relationship to Hanami CLI is continuity of experience, not code reuse: Hanami explored an early Agent-to-tool path, while Search & Fetch became Anomalo's general composition for public web sources.
