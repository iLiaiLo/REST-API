import express from "express";
import compression from "http-compression";
import errorHandler from "./errorHandlers/errorhandler.js";
import taskRouter from "./routes/taskRoutes.js";
import limitRequests from "./middlewares/rateLimiter.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import verifyToken from "./middlewares/verifyToken.js";
import { app } from "./websocket/socket.js";
import verifyUser from "./middlewares/verifyUser.js";
import deleteAccountRouter from "./routes/deleteAccountRoutes.js";
import forgotpasswordRouter from "./routes/forgotPasswordRoutes.js";
import recoveryAccountRouter from "./routes/recoveryAccountRoutes.js";
import initializeApp from "./init/initializeApp.js";

app.use(compression());

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", limitRequests(3, 5 * 60 * 1000), authRouter);

app.use(
  "/api/tasks",
  limitRequests(60, 60 * 1000),
  verifyToken,
  verifyUser,
  taskRouter,
);

app.use(
  "/api/account/reset",
  limitRequests(3, 5 * 60 * 1000),
  forgotpasswordRouter,
);

app.use(
  "/api/account/delete",
  limitRequests(3, 5 * 60 * 1000),
  verifyToken,
  verifyUser,
  deleteAccountRouter,
);

app.use(
  "/api/account/recover",
  limitRequests(3, 5 * 60 * 1000),
  recoveryAccountRouter,
);

initializeApp();

app.use(errorHandler);
