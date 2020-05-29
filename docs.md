# Sources

* The data from sources are read by calling the respective main functions, without data.
* Both sync and async functions follow the same interface to respond, so to make interop feasible.
* Async sources could use **context.refreshState** to trigger updates.
* Sources should be deterministic, so to allow for memoization.
* Since results are memoized, sources with complex data should take care in returning object references. Hence the equality check will pass, despite changes.
