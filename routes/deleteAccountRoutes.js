import { Router } from "express";

import softDelete from "../controllers/deleteAccount/softDelete.js";
import sendAccountStatus from "../middlewares/account/sendAccountStatus.js";
import { deleteAccountStatusOptions } from "../utils/messages.js";
const deleteAccountRouter = Router();

deleteAccountRouter.delete(
  "/soft-delete",
  softDelete,
  sendAccountStatus(deleteAccountStatusOptions),
);

export default deleteAccountRouter;
