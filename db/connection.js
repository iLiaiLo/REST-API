import { Pool } from "pg";
import dotenv from "dotenv";
import createSchemaQuery from "../queries/schemas/CREATE_TODO_APP_SCHEMA.js";
import createUsersTableQuery from "../queries/tables/USERS_TABLE.js";
import createTasksTableQuery from "../queries/tables/TASKS_TABLE.js";
dotenv.config();
const pool = new Pool({
  connectionString: process.env.PG_URL,
});

const rollbackTransaction = async (client) => {
  if (!client) {
    throw new Error("Database client is not available");
  }
  try {
    await client.query("ROLLBACK");
  } catch (error) {
    console.error("Rollback failed:", error.message);
  }
};

const connectToDb = async () => {
  let client;
  try {
    client = await pool.connect();
    const createSchema = createSchemaQuery;
    const createUsersTable = createUsersTableQuery;
    const createTaskTable = createTasksTableQuery;

    await client.query("BEGIN");
    await client.query(createSchema);
    await client.query(createUsersTable);
    await client.query(createTaskTable);

    await client.query("COMMIT");

    console.log("successfully connected to database!");
  } catch (error) {
    console.log("error during database connection " + error.message);
    await rollbackTransaction(client);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};

export { connectToDb, pool };
