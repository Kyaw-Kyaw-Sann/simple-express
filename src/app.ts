import express from "express";

import { getHealth } from "./controllers/healthController.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandlers.js";
import { userRouter } from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({
    data: {
      message: "Welcome to the Simple Express learning project",
      phase: "Phase 10 - Final Learning Project"
    }
  });
});

app.get("/about", (request, response) => {
  response.status(200).json({
    data: {
      project: "Simple Express",
      purpose: "Learn Express.js and build a CRUD REST API"
    }
  });
});

app.get("/health", getHealth);
app.use("/api/users", userRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
