# Simple Express

A beginner-friendly REST API learning project built step by step with TypeScript, Node.js, Express.js, and MySQL.

## Current phase

Phase 5 - Basic Project Organization

The CRUD API is separated into small files for the Express app, server, routes, controllers, data, types, and configuration.

## Run

```bash
npm install
npm run dev
```

The server runs at `http://localhost:3000` by default.

## Check and build

```bash
npm run typecheck
npm run build
npm start
```

Compiled JavaScript is written to the `dist` folder.

## Endpoints

- `GET /` - current project phase
- `GET /about` - project information
- `POST /api/users` - create a user
- `GET /api/users` - read all users
- `GET /api/users?role=member` - filter users by role
- `GET /api/users/:id` - read one user
- `PATCH /api/users/:id` - update a user's name or role
- `DELETE /api/users/:id` - delete a user

Create request example:

```json
{
  "name": "Mya Mya",
  "role": "member"
}
```

Unknown routes return a JSON `404` response.

## Project structure

```text
src/
|-- app.ts
|-- server.ts
|-- config/
|   `-- env.ts
|-- controllers/
|   `-- userController.ts
|-- data/
|   `-- users.ts
|-- routes/
|   `-- userRoutes.ts
`-- types/
    `-- user.ts
```
