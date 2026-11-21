import { uuidv7 } from "uuidv7";

import { pool } from "../../db/connection.js";
import addTaskQuery from "../../queries/taskqueries/ADD_TASK.js";
import { io } from "../../websocket/socket.js";
const addTodo = async (req, res, next) => {
  try {
    const { text, header } = res.locals.safeData;
    const ownerId = req.user.id;
    const id = uuidv7();

    const newTask = await pool.query(addTaskQuery, [id, ownerId, text, header]);

    const { status, created_at, updated_at } = newTask.rows[0];
    const resData = {
      id,
      text,
      header,
      status,
      created_at,
      updated_at,
    };

    io.emit("add_todo", resData);

    return res.status(201).json({ message: "task successfully created", id });
  } catch (error) {
    next(error);
  }
};

export default addTodo;
