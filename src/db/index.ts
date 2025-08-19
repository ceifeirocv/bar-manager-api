import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

client.connect();
export const db = drizzle(client);
