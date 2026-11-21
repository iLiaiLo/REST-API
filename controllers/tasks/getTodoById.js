import cache from "../../cache/appCache.js";
import { pool } from "../../db/connection.js";
import { getTaskById } from "../../queries/taskqueries/GET_TASK_BY_ID.js";
import AppError from "../../errorHandlers/AppError.js";

const getTodoById = async (req, res, next) => {
  try {
    const { id } = res.locals.safeData;
    const cacheKey = `task:${id}`;
    const cachedTask = cache.get(cacheKey);

    if (cachedTask) {
      return res.status(200).json(cachedTask);
    }

    const result = await pool.query(getTaskById, [id]);
    if (!result.rowCount) {
      return next(new AppError("task not found", 404));
    }

    const task = result.rows[0];
    cache.set(cacheKey, task);
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export default getTodoById;
