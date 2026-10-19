import { app } from "./app.js";
import { port } from "./config/env.js";
import { pool } from "./database/connection.js";

async function startServer() {
  try {
    const connection = await pool.getConnection();
    connection.release();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Database connection failed: ${message}`);
    await pool.end();
    process.exitCode = 1;
  }
}

void startServer();
