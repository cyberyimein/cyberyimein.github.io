# Urus: Turning US equity research into a reviewable workflow

Urus is a research and decision-support system for US stocks and ETFs. It puts market and macro data, technical and relative-strength indicators, option structure, research reports, and optional Agent analysis into one workflow with explicit run states and evidence. The current version is 0.1.0 and remains under active development; live data sources and the Agent are disabled by default, and the system does not place broker orders.

## Background and Goal

Equity research often combines market conditions, macro context, option structure, and comparisons across instruments. The difficulty is not only the number of sources. Each run also needs a time boundary: what data was used, which steps were skipped, and which outputs were placeholders should remain reviewable later.

Urus starts from a research flow made of seven replaceable steps: market collection, macro-event summaries, option collection, instrument collection, company-event summaries, decision analysis, and output. The goal is not to turn one indicator into a trading instruction. It is to preserve each run's input snapshot, data quality, model output, and tool trace so later research or Agent analysis can work from frozen evidence.

## Design and Implementation

Urus uses one FastAPI backend and one Vue 3 frontend. They can be started and deployed independently. The backend uses SQLAlchemy and Alembic for persistence. The frontend reads through a centralized API client and does not access the database or external market services directly.

Each run records a `Run`, `StepRun`, and `Snapshot`. The frontend consumes a small read model, while option chains, instrument daily bars, and technical inputs are stored in normalized SQLite tables and committed with the snapshot in one transaction. This keeps the result quick to display while preserving the boundaries needed for later recalculation and inspection.

Live data enters through explicit adapters. Moomoo OpenD provides batched ETF and equity snapshots and daily bars, while Yahoo Finance and FRED provide daily macro context. OpenD may run on another host on the development LAN, but its address belongs only in local or deployment configuration.

The Stage 4B Agent does not receive an open-ended database interface. The system first compresses paired snapshots into a decision packet with source hashes, changes, quality warnings, and execution limits. `urus-equity-decision` and `urus-options-decision` then handle bounded research tasks. When OpenRouter is enabled, the model can use only read-only data and math tools, and decisions, model turns, and tool traces are persisted in SQLite.

## Current Capabilities

- Stage 1A includes batched ETF snapshots, QQQ daily technical indicators, and daily macro data from Yahoo Finance and FRED.
- When Moomoo is enabled, Stage 2 collects option chains and calculates DEX, GEX, Gamma Wall, Max Pain, Expected Move, Spot Gamma Profile, and Gamma Flip.
- Stage 3A uses QQQ as a benchmark for the configured core ETFs and public watchlist, calculating returns, moving averages, volatility, ATR, Bollinger Bands, MACD, volume signals, relative returns, beta, and correlation.
- The frontend provides Dashboard, Runs, run-detail, and research-report views, and keeps regular, pre-market, and after-hours prices separate.
- The scheduled collection script uses `exchange-calendars` for trading days, holidays, and early closes; scheduled collection skips AI decision-making by default.
- Stage 4B provides optional decision packets, equity ranking, option-structure interpretation, and audit records. When live data or the Agent is disabled, the system preserves states such as `disabled`, `unavailable`, `placeholder`, `partial`, and `skipped`.

## Boundaries and Tradeoffs

Urus currently has no login, authorization, multi-tenant isolation, Sentry, Prometheus, or complete container orchestration. It should not be exposed directly to the public internet. It does not connect to broker order execution, perform automated trading, or provide investment advice.

Option structure is still a model output, not known market-maker net positioning. The current Gamma calculation uses explicit risk-free rate, dividend rate, spot range, and point-count settings, together with a Call-positive and Put-negative positioning assumption. Dynamic rates, dynamic dividends, exact 0DTE remaining time, VEX/Vanna, and tick-level option history are later precision tasks.

Macro and company-event summaries remain conditional steps. 1B and 3B normally skip when no relevant event exists. An overall `mixed` run status does not mean that completed data collection failed; it can mean that later steps are still `skipped` or `placeholder`.

## Status and Next Step

Urus is actively developing at version 0.1.0. Stage 1A, option-structure persistence, and Stage 3A are connected to the same workflow and frontend. The backend pytest suite, frontend Vitest suite, and production build all pass in the current checkout.

The next step is to implement 3B company-event and financial summaries, extend sector benchmarks and the watchlist, and gradually add longer historical archives and dynamic rate and dividend models. Authentication and access control are prerequisites for deployment beyond a trusted network.

## Technology Stack

Python 3.11+ / FastAPI / SQLAlchemy / Alembic / Vue 3 / TypeScript / Vite / Pinia / SQLite / PostgreSQL / Moomoo OpenD / FRED / Yahoo Finance / OpenRouter / pytest / Vitest
