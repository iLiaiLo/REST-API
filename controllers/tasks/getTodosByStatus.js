import { pool } from "../../db/connection.js";
import {
  getInitialTasksByStatus,
  getTasksByStatus,
} from "../../queries/taskqueries/GET_TASKS_BY_STATUS.js";
const getTodosByStatus = async (req, res, next) => {
  try {
    const { status, updated_at, id, limit } = res.locals.safeData;

    const option =
      !updated_at || !id
        ? {
            query: getInitialTasksByStatus,
            params: [status, limit],
          }
        : {
            query: getTasksByStatus,
            params: [status, updated_at, id, limit],
          };

    const tasks = await pool.query(option.query, option.params);

    const data = tasks.rows;

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default getTodosByStatus;
