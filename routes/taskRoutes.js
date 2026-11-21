import { Router } from "express";

import getTodos from "../controllers/tasks/getTodos.js";
import addTodo from "../controllers/tasks/addTodo.js";
import updateTodo from "../controllers/tasks/updateTodo.js";
import deleteTodo from "../controllers/tasks/deleteTodo.js";
import restoreTodo from "../controllers/tasks/restoreTodo.js";
import getDeletedTodos from "../controllers/tasks/getDeletedTodos.js";
import getTodosByStatus from "../controllers/tasks/getTodosByStatus.js";
import getTodoById from "../controllers/tasks/getTodoById.js";
import getDeletedTodo from "../controllers/tasks/getDeletedTodo.js";

import authorize from "../middlewares/authorize.js";

import validate from "../middlewares/validation/validate.js";

import {
  querySchema,
  taskIdSchema,
  deletedQuerySchema,
  taskSchema,
  statusSchema,
  updateTaskSchema,
} from "../utils/zod/schemas/task.js";

const taskRouter = Router();

taskRouter.get(
  "/deleted",
  authorize(["admin"]),
  validate({ schema: deletedQuerySchema, options: ["query"] }),
  getDeletedTodos,
);

taskRouter.get(
  "/deleted/:id",
  authorize(["admin"]),
  validate({ schema: taskIdSchema, options: ["params"] }),
  getDeletedTodo,
);

taskRouter.get(
  "/status",
  authorize(["user", "admin"]),
  validate({ schema: statusSchema, options: ["query"] }),
  getTodosByStatus,
);

taskRouter.get(
  "/",
  authorize(["user", "admin"]),
  validate({ schema: querySchema, options: ["query"] }),
  getTodos,
);

taskRouter.get(
  "/:id",
  authorize(["user", "admin"]),
  validate({ schema: taskIdSchema, options: ["params"] }),
  getTodoById,
);

taskRouter.post(
  "/",
  authorize(["admin"]),
  validate({ schema: taskSchema, options: ["body"] }),
  addTodo,
);

taskRouter.put(
  "/:id",
  authorize(["admin"]),
  validate({ schema: updateTaskSchema, options: ["params", "body"] }),
  updateTodo,
);
taskRouter.delete(
  "/:id",
  authorize(["admin"]),
  validate({ schema: taskIdSchema, options: ["params"] }),
  deleteTodo,
);

taskRouter.patch(
  "/restore/:id",
  authorize(["admin"]),
  validate({ schema: taskIdSchema, options: ["params"] }),
  restoreTodo,
);

export default taskRouter;
