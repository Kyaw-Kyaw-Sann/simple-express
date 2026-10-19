function readPort(value: string | undefined, name: string, defaultValue: number) {
  if (!value) {
    return defaultValue;
  }

  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0 || parsedValue > 65535) {
    throw new Error(`${name} must be an integer between 1 and 65535`);
  }

  return parsedValue;
}

const port = readPort(process.env.PORT, "PORT", 3000);

const databaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: readPort(process.env.DB_PORT, "DB_PORT", 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "simple_express_db"
};

export { databaseConfig, port };
