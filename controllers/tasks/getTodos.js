import { pool } from "../../db/connection.js";
import {
  getInitialTasks,
  getTasks,
} from "../../queries/taskqueries/GET_TASKS.js";
const getTodos = async (req, res, next) => {
  try {
    const { id, updated_at, limit } = res.locals.safeData;

    const data =
      !updated_at || !id
        ? {
            query: getInitialTasks,
            params: [limit],
          }
        : {
            query: getTasks,
            params: [updated_at, id, limit],
          };

    const tasks = await pool.query(data.query, data.params);
    const resData = tasks.rows;
    return res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
};

export default getTodos;
