# Simple Express

A beginner-friendly REST API learning project built step by step with Node.js, Express.js, and MySQL.

## Current phase

Phase 3 — REST API Structure

This phase demonstrates Express routes, route parameters, query parameters, and JSON request bodies.

## Run

```bash
npm install
npm start
```

The server runs at `http://localhost:3000` by default.

## Endpoints

- `GET /` — current project phase
- `GET /about` — project information
- `GET /api/users` — all sample users
- `GET /api/users?role=member` — users filtered by a query parameter
- `GET /api/users/:id` — one user selected by a route parameter
- `POST /api/greet` — greeting created from a JSON request body such as `{ "name": "Mya" }`

Unknown routes return a JSON `404` response.
