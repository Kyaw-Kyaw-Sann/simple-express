import express from "express";

import { port } from "./config.js";
import { createWelcomeMessage } from "./message.js";

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Aung Aung", role: "admin" },
  { id: 2, name: "Su Su", role: "member" },
  { id: 3, name: "Ko Ko", role: "member" }
];

app.get("/", (request, response) => {
  response.status(200).json(createWelcomeMessage());
});

app.get("/about", (request, response) => {
  response.status(200).json({
    project: "Simple Express",
    purpose: "Learn Express.js and build a CRUD REST API"
  });
});

app.get("/api/users", (request, response) => {
  const { role } = request.query;
  const matchingUsers = role
    ? users.filter((user) => user.role === role)
    : users;

  response.status(200).json(matchingUsers);
});

app.get("/api/users/:id", (request, response) => {
  const userId = Number(request.params.id);
  const user = users.find((currentUser) => currentUser.id === userId);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.status(200).json(user);
});

app.post("/api/greet", (request, response) => {
  const { name = "Guest" } = request.body;

  response.status(200).json({ message: `Hello, ${name}!` });
});

app.use((request, response) => {
  response.status(404).json({ message: "Route not found" });
});

app.use((error, request, response, next) => {
  if (error.status === 400) {
    response.status(400).json({ message: "Invalid JSON body" });
    return;
  }

  console.error(error);
  response.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
