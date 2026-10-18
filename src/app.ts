import express, { type ErrorRequestHandler } from "express";

import { userRouter } from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcome to the Simple Express learning project",
    phase: "Phase 5 - Basic Project Organization"
  });
});

app.get("/about", (request, response) => {
  response.status(200).json({
    project: "Simple Express",
    purpose: "Learn Express.js and build a CRUD REST API"
  });
});

app.use("/api/users", userRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (error.status === 400) {
    response.status(400).json({ message: "Invalid JSON body" });
    return;
  }

  console.error(error);
  response.status(500).json({ message: "Internal server error" });
};

app.use(errorHandler);

export { app };
