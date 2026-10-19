USE simple_express_db;

-- READ all users
SELECT id, name, role, created_at, updated_at
FROM users;

-- READ one user. Use a parameter for the id in Node.js.
SELECT id, name, role, created_at, updated_at
FROM users
WHERE id = ?;

-- CREATE a user. Pass name and role as parameters from Node.js.
INSERT INTO users (name, role)
VALUES (?, ?);

-- UPDATE a user. Pass name, role, and id as parameters from Node.js.
UPDATE users
SET name = ?, role = ?
WHERE id = ?;

-- DELETE a user. Use a parameter for the id in Node.js.
DELETE FROM users
WHERE id = ?;
