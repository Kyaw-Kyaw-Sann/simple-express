import type { ErrorRequestHandler, RequestHandler } from "express";

const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({ message: "Route not found" });
};

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error.status === 400 && error.type === "entity.parse.failed") {
    response.status(400).json({ message: "Invalid JSON body" });
    return;
  }

  console.error(error);
  response.status(500).json({ message: "Internal server error" });
};

export { errorHandler, notFoundHandler };
