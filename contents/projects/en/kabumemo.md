# Kabumemo: A Personal Trading Journal Evolving with Agents

Kabumemo is an offline-first personal stock trading journal for managing trades, positions, funds, tax, and broker reports. It began as a weekend CRUD tool. After several agent-led refactors, it now combines a Vue 3 frontend, a FastAPI backend, and two synchronized local data stores.

## Background and Goal

I originally tracked trades in Notion, but a general-purpose table could not represent funding groups, multi-currency settlement, and tax status naturally. Instead of continuing to reshape my data around the tool, I built a model around my own trading workflow.

The project also tests whether an agent can maintain real software over time. I define requirements and review the result; the agent implements and refactors the system. The question is not how much code it can generate at once, but whether it can understand an existing domain model and change the frontend, backend, and deployment without damaging real data.

## Design and Implementation

The frontend uses Vue 3, TypeScript, and Vite. It opens on a broker report center while retaining manual trade entry as a correction path. The FastAPI backend handles trade validation, position and return calculations, cash activity, tax, and data imports, with Pydantic models constraining API data.

Broker reports follow a preview, apply, and undo workflow. The importer supports Japanese and US equity trades together with JPY and foreign-currency cash reports. Stable business IDs prevent duplicate imports, and the system links related trades and cash movements.

JSON files remain the inspectable and recoverable primary data source. Each write is mirrored to SQLite. Maintenance scripts check parity between the two stores and can rebuild structured data from either JSON or broker CSV files.

## Current Capabilities

- Record and edit trades, then calculate positions and realized profit and loss by currency, funding group, and account type.
- Import trades and cash activity from broker reports, preview duplicates, and undo an import.
- Manage funding groups, capital additions, foreign-exchange records, per-trade tax settlements, and annual tax settlements.
- Record stock splits and apply their adjustments to positions and realized profit and loss.
- View one year of price history, buy and sell markers, and round-trip gross profit, net profit, tax impact, and annualized return.
- Review and batch-delete suspicious duplicate trades, with pytest and Vue type checking protecting critical data flows.

## Boundaries and Tradeoffs

Kabumemo is designed for a personal workflow, not as a general brokerage or multi-user investment platform. Its current data model focuses on JPY, USD, and the supported broker reports. Manual entry mainly corrects or supplements imported data.

Dual storage does not create two independent sources of truth. JSON stays readable and recoverable, while SQLite supports structured queries and external tools. Parity checks detect drift between them.

## Status and Next Step

Kabumemo remains in active development. The production build packages the Vue frontend and FastAPI backend into one OCI image and runs it with Apple Container on a Mac mini. The data directory is mounted from the host, so replacing the container does not remove trading records.

The next phase will improve backup and restore, filtering, and export, while expanding tests for multi-currency, cross-group, and broker-report edge cases.

## Technology Stack

Vue 3 / TypeScript / Vite / FastAPI / Pydantic / JSON / SQLite / ECharts / pytest / Apple Container
