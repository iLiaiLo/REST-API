import { Router } from "express";

import verifyUserByEmail from "../controllers/forgotPassword/verifyUserByEmail.js";
import storeResetOtp from "../controllers/forgotPassword/storeResetOtp.js";

import checkResetOtp from "../controllers/forgotPassword/checkResetOtp.js";
import updatePassword from "../controllers/forgotPassword/updatePassword.js";

import sendOTP from "../middlewares/account/sendOTP.js";
import sendAccountStatus from "../middlewares/account/sendAccountStatus.js";

import {
  passwordResetOtpOptions,
  updatePasswordStatusOptions,
} from "../utils/messages.js";
import validate from "../middlewares/validation/validate.js";

import {
  resetPasswordInputSchema,
  userEmailSchema,
} from "../utils/zod/schemas/auth.js";

const forgotpasswordRouter = Router();

forgotpasswordRouter.post(
  "/send-reset-otp",
  validate({ schema: userEmailSchema, options: ["body"] }),
  verifyUserByEmail,
  storeResetOtp,
  sendOTP(passwordResetOtpOptions),
);

forgotpasswordRouter.post(
  "/update-password",
  validate({
    schema: resetPasswordInputSchema,
    options: ["body"],
    check: true,
  }),
  checkResetOtp,
  updatePassword,
  sendAccountStatus(updatePasswordStatusOptions),
);

export default forgotpasswordRouter;
