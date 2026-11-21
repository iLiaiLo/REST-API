import { pool } from "../../db/connection.js";
import {
  getDeletedTasks,
  getInitialDeletedTasks,
} from "../../queries/taskqueries/GET_DELETED_TASKS.js";

const getDeletedTodos = async (req, res, next) => {
  try {
    const { id, deleted_at, limit } = res.locals.safeData;
    const adminId = req.user.id;

    const data =
      !deleted_at || !id
        ? {
            query: getInitialDeletedTasks,
            params: [adminId, limit],
          }
        : {
            query: getDeletedTasks,
            params: [adminId, deleted_at, id, limit],
          };

    const getDeletedData = await pool.query(data.query, data.params);
    const deletedTodos = getDeletedData.rows;
    return res.status(200).json(deletedTodos);
  } catch (error) {
    next(error);
  }
};

export default getDeletedTodos;
