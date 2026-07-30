# Experiment: Moving Python execution out of Anomalo

This experiment delegates Anomalo's `sandbox_python_run` to a separate FruitSpy service. The current conclusion is that an Agent can submit short Python programs and receive stdout, errors, and optional artifacts without executing the code inside Anomalo's main process.

## Question

An Agent needs Python for calculations, data checks, and plotting, but placing arbitrary code in the event-driven Agent Host would put the tool and its execution risk in the same process. The question was how to keep the calling experience while moving the execution boundary to a separate service.

## Method

Anomalo publishes `sandbox_python_run` only when the feature is enabled, FruitSpy reports `ready`, and a shared token is configured. A call submits the code, timeout, and optional artifact list to FruitSpy's `/api/v1/tools/python/executions` endpoint. FruitSpy starts a fresh Apple Container for each execution, limits CPU, memory, concurrency, output size, and runtime, collects the result, and destroys the container. Anomalo then caches permitted artifacts in its restricted directory.

## Result

Anomalo tests cover readiness checks, timed execution, stdout, and artifact download. A sample `print(sum(range(10)))` execution returns `45`, and an image artifact can be cached and served through the restricted artifact route. The README also makes clear that FruitSpy is a separately deployed execution service rather than part of the Anomalo repository.

## Limitations

This does not turn Anomalo itself into a sandbox. Anomalo remains an adapter; FruitSpy supplies the isolation boundary, and the shared token, trusted network, and service readiness are runtime prerequisites. Skill code inside Anomalo is still treated as trusted code, and cached artifacts are short-lived results rather than permanent storage.

## Subsequent Impact

Python execution became an independent Harness capability instead of a local call. It can share the Agent runtime with web retrieval, RAG, and MCP while keeping its failure and security boundaries separate.
