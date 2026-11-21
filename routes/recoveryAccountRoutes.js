import { Router } from "express";
import checkDeletedAccount from "../controllers/recoveryAccount/checkDeletedAccount.js";
import storeRecoveryOtp from "../controllers/recoveryAccount/storeRecoveryOtp.js";

import checkRecoveryOtp from "../controllers/recoveryAccount/checkRecoveryOtp.js";
import recoverDeletedAccount from "../controllers/recoveryAccount/recoverDeletedAccount.js";
import sendOTP from "../middlewares/account/sendOTP.js";
import sendAccountStatus from "../middlewares/account/sendAccountStatus.js";
import {
  recoveryAccountStatusOptions,
  recoveryOtpOptions,
} from "../utils/messages.js";
import validate from "../middlewares/validation/validate.js";
import {
  recoveryAccountSchema,
  userEmailSchema,
} from "../utils/zod/schemas/auth.js";

const recoveryAccountRouter = Router();

recoveryAccountRouter.post(
  "/send-recovery-otp",
  validate({ schema: userEmailSchema, options: ["body"] }),
  checkDeletedAccount,
  storeRecoveryOtp,
  sendOTP(recoveryOtpOptions),
);

recoveryAccountRouter.post(
  "/verify-restored-account",
  validate({ schema: recoveryAccountSchema, options: ["body"], check: true }),
  checkRecoveryOtp,
  recoverDeletedAccount,
  sendAccountStatus(recoveryAccountStatusOptions),
);

export default recoveryAccountRouter;
