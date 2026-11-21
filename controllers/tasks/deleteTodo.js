import { pool } from "../../db/connection.js";
import AppError from "../../errorHandlers/AppError.js";
import deleteTaskQuery from "../../queries/taskqueries/DELETE_TASK.js";
import { io } from "../../websocket/socket.js";
import cache from "../../cache/appCache.js";
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = res.locals.safeData;
    const ownerId = req.user.id;
    const deletedTask = await pool.query(deleteTaskQuery, [ownerId, id]);
    if (!deletedTask.rowCount) {
      const error = new AppError("task not found", 404);
      return next(error);
    }

    const cacheKey = `task:${id}`;

    cache.del(cacheKey);

    io.emit("delete_todo", { id });

    return res.status(200).json({
      message:
        "task temporarily deleted. you can restore task or it will be removed permanently in 24 hours",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteTodo;
