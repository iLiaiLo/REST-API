import dotenv from "dotenv";

import { server } from "../websocket/socket.js";
import { connectToDb } from "../db/connection.js";
import { startCleanupService } from "../services/cleanupService.js";
import initializeMailQueue from "../worker/worker.js";

dotenv.config();
const PORT = process.env.PORT;

const runServer = () => {
  server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

const initializeApp = async () => {
  try {
    await connectToDb();
    await startCleanupService();
    await initializeMailQueue();
    runServer();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default initializeApp;
