import { pool } from "../../db/connection.js";
import cache from "../../cache/appCache.js";
import AppError from "../../errorHandlers/AppError.js";
import updateTaskQuery from "../../queries/taskqueries/UPDATE_TASK.js";
import { io } from "../../websocket/socket.js";
const updateTodo = async (req, res, next) => {
  try {
    const { id, text, header, status } = res.locals.safeData;
    const ownerId = req.user.id;
    const updatedTask = await pool.query(updateTaskQuery, [
      text,
      header,
      status,
      ownerId,
      id,
    ]);

    if (!updatedTask.rowCount) {
      const error = new AppError("task not found to update", 404);
      return next(error);
    }

    const resData = {
      text,
      header,
      status,
      updated_at: updatedTask.rows[0].updated_at,
    };
    const cacheKey = `task:${id}`;
    cache.del(cacheKey);
    io.emit("update_todo", resData);
    return res.status(200).json({ message: "task updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default updateTodo;
