# Kabumemo: From a Weekend CRUD App to a Long-Running AI Development Experiment

Kabumemo began as a personal trading journal to replace Notion. I was tired of bending my data into the shape of a general-purpose tool, so I handed the steering wheel to GPT-5 Codex and used vibe coding to build a system around my own workflow.

The first version really was a weekend CRUD project. Since then, whenever agent capabilities have taken a meaningful step forward, I have asked a newer agent to refactor it. Kabumemo is now both a tool I use and a continuous experiment in whether AI agents can maintain, extend, and deploy real software over time.

## After the Refactor

Kabumemo is no longer a static page. It is a complete Vue 3 and TypeScript frontend backed by FastAPI. The interface is organized around trades, positions, funds, and tax. It records buys and sells, calculates holdings and realized profit by currency and funding group, and manages pending tax settlements.

The funds workflow supports multiple JPY and USD groups, effective-dated capital additions, yearly performance comparisons, and exchange-rate conversion. Selected trades can be reconciled as a round trip to calculate gross and net profit, tax impact, and annualized return. Position history adds one year of prices with buy and sell markers on the chart.

JSON remains the inspectable and recoverable source of truth, while every write is mirrored into SQLite. Import, parity-check, and broker-CSV rebuild scripts give this personal application an auditable recovery path.

## The AI Development Experiment

The project still follows one rule: I define requirements and review the result; the agent writes and changes the code. TypeScript, Pydantic models, pytest, and Vue type checking form the quality boundary. I am now less interested in one-shot code generation than in whether an agent can understand an existing domain model and carry out cross-stack refactors without damaging real data.

## Deployment

The production build compiles the Vue frontend and lets FastAPI serve both the application and its API. It now runs in Apple Container on my Mac mini. Persistent data is mounted from the host, so containers and images can be replaced without taking the journal with them.

## Technical Specifications

Vue 3 / TypeScript / Vite / FastAPI / Pydantic / JSON / SQLite / ECharts / pytest / Apple Container

## Next

Planned work includes bulk import and export, better filtering, backup and restore tools, and broader multi-currency tests. The longer-term direction is to let a local agent read Kabumemo under explicit authorization and auditability, rather than handing real trading data to an opaque automation flow.
