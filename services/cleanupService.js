import { PgBoss } from "pg-boss";
import { pool } from "../db/connection.js";
import {
  hardDeleteTask,
  hardDeleteUser,
} from "../queries/taskqueries/HARD_DELETE.js";

const pgUrl = process.env.PG_URL;
const queueName = process.env.TASKS_QUEUE;
const boss = new PgBoss(pgUrl);
const startCleanupService = async () => {
  try {
    boss.on("error", console.error);

    await boss.start();

    await boss.createQueue(queueName, {
      deleteAfterSeconds: 604800,
    });
    console.log("Cleanup service queue has been created");

    await boss.schedule(queueName, "0 0 * * *");

    await boss.work(queueName, async () => {
      try {
        await Promise.all([
          pool.query(hardDeleteTask),
          pool.query(hardDeleteUser),
        ]);

        console.log("cleanup completed");
      } catch (error) {
        console.log({ error: error.message });
      }
    });
  } catch (error) {
    console.error({ error: error.message });
    throw error;
  }
};
export { startCleanupService, boss };
