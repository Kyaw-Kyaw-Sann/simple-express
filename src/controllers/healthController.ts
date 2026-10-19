import type { Request, Response } from "express";

import { pool } from "../database/connection.js";

async function getHealth(request: Request, response: Response) {
  await pool.query("SELECT 1");

  response.status(200).json({
    data: {
      status: "ok",
      database: "connected"
    }
  });
}

export { getHealth };
