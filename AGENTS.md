# AGENTS.md — AlgoGrowthHub Project Guidelines & Rules

## 1. Automatic API Documentation & Postman Sync Rule
Whenever ANY backend endpoint, route, controller, schema, or model in `server/src/` is created, updated, or deleted:
* **Mandatory Action:** Update [`BACKEND_API_DOCUMENTATION.md`](./BACKEND_API_DOCUMENTATION.md) immediately with the endpoint specification, parameters, request body, status codes, and error scenarios.
* **Postman Sync:** Ensure the `AlgoGrowthHub API Suite` Postman Collection is updated with working request bodies and headers.

## 2. Security & RBAC Standard
* Super Admin credentials must only be seeded via `.env`.
* Passwords must always be hashed with `bcrypt` (12 rounds).
* Dual-token JWT (Access Token 15m/1d + HttpOnly Cookie 7d) must be preserved for all authenticated endpoints.
* Never expose plaintext passwords or secret keys in logs or responses.

## 3. Database Connection Reliability
* Always maintain the 3-shard non-SRV replica set connection string format in `.env` to prevent Windows DNS resolution issues (`querySrv ECONNREFUSED`).
