# Simple Express

A beginner-friendly CRUD REST API built with TypeScript, Node.js, Express.js, and MySQL.

## Features

- MySQL-backed user CRUD operations
- TypeScript types and strict checking
- Route, query, and request-body validation
- Pagination, role filtering, name search, and safe sorting
- Consistent JSON success and error responses
- Centralized `404` and `500` error handling
- Database health endpoint
- Reusable API smoke test

## Requirements

- Node.js 20.6 or newer
- npm
- MySQL 8.0 or newer

## Setup

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env` and enter your MySQL settings:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=simple_express_db
```

Create the database, table, and sample records:

```bash
mysql -u root -p -e "source database/schema.sql"
mysql -u root -p -e "source database/seed.sql"
```

Do not commit `.env` because it contains local credentials.

## Run

Development mode:

```bash
npm run dev
```

Production build:

```bash
npm run typecheck
npm run build
npm start
```

The server runs at `http://localhost:3000` by default.

## Endpoints

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/` | Project information |
| `GET` | `/about` | Project purpose |
| `GET` | `/health` | API and database health |
| `GET` | `/api/users` | Paginated user list |
| `GET` | `/api/users/:id` | Read one user |
| `POST` | `/api/users` | Create a user |
| `PUT` | `/api/users/:id` | Replace a user's name and role |
| `PATCH` | `/api/users/:id` | Update a user's name or role |
| `DELETE` | `/api/users/:id` | Delete a user |

Create or replace request body:

```json
{
  "name": "Mya Mya",
  "role": "member"
}
```

## List query parameters

```http
GET /api/users?page=1&limit=10&role=member&search=Mya&sort=name&order=asc
```

- `page` - positive integer; default `1`
- `limit` - integer from `1` to `100`; default `10`
- `role` - `admin` or `member`
- `search` - partial name search
- `sort` - `id`, `name`, or `role`
- `order` - `asc` or `desc`

List response:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

Single-resource success responses use `{ "data": ... }`. Error responses use `{ "message": "..." }`. A successful delete returns `204 No Content`.

## Smoke test

Start the server, then run this command in another terminal:

```bash
npm run test:smoke
```

The script checks health, listing, CRUD operations, validation, malformed JSON, and not-found behavior. Its temporary user is deleted after the test.

## Project structure

```text
.
|-- database/
|   |-- schema.sql
|   |-- seed.sql
|   `-- crud-examples.sql
|-- scripts/
|   `-- smoke-test.mjs
`-- src/
    |-- app.ts
    |-- server.ts
    |-- config/
    |   `-- env.ts
    |-- controllers/
    |   |-- healthController.ts
    |   `-- userController.ts
    |-- database/
    |   `-- connection.ts
    |-- middleware/
    |   |-- errorHandlers.ts
    |   `-- validateUser.ts
    |-- routes/
    |   `-- userRoutes.ts
    `-- types/
        `-- user.ts
```
