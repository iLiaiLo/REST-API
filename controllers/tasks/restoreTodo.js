import { pool } from "../../db/connection.js";
import restoreDeletedTaskQuery from "../../queries/taskqueries/RESTORE_DELETED_TASK.js";
import AppError from "../../errorHandlers/AppError.js";
import { io } from "../../websocket/socket.js";
const restoreTodo = async (req, res, next) => {
  try {
    const { id } = res.locals.safeData;
    const ownerId = req.user.id;
    const restoredTask = await pool.query(restoreDeletedTaskQuery, [
      ownerId,
      id,
    ]);

    if (!restoredTask.rowCount) {
      const error = new AppError("unable to restore non-existing task", 404);
      return next(error);
    }

    io.emit("restore_todo", { id });
    return res
      .status(200)
      .json({ message: `task with id ${id} successfully restored.`, id });
  } catch (error) {
    next(error);
  }
};

export default restoreTodo;
