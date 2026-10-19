import mysql from "mysql2/promise";

import { databaseConfig } from "../config/env.js";

const pool = mysql.createPool({
  ...databaseConfig,
  waitForConnections: true,
  connectionLimit: 10
});

export { pool };
