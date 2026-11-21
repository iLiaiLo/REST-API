import { pool } from "../../db/connection.js";
import { getDeletedTaskById } from "../../queries/taskqueries/GET_TASK_BY_ID.js";
import AppError from "../../errorHandlers/AppError.js";
const getDeletedTodo = async (req, res, next) => {
  try {
    const { id } = res.locals.safeData;
    const ownerId = req.user.id;

    const result = await pool.query(getDeletedTaskById, [ownerId, id]);
    if (!result.rowCount) {
      return next(new AppError("task not found", 404));
    }

    const task = result.rows[0];
    return res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export default getDeletedTodo;
