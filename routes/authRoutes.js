import { Router } from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";

import verifyToken from "../middlewares/verifyToken.js";
import checkAccountVerification from "../controllers/auth/checkAccountVerification.js";
import storeVerifyOtp from "../controllers/auth/storeVerifyOtp.js";

import checkUserOtpExpiration from "../controllers/auth/checkUserOtpExpiration.js";
import updateAccountVerificationStatus from "../controllers/auth/updateAccountVerification.js";

import refreshToken from "../controllers/auth/refresh.js";
import sendOTP from "../middlewares/account/sendOTP.js";
import sendAccountStatus from "../middlewares/account/sendAccountStatus.js";
import {
  verifyAccountStatusOptions,
  verifyOtpOptions,
} from "../utils/messages.js";
import validate from "../middlewares/validation/validate.js";

import {
  loginSchema,
  signupSchema,
  otpSchema,
} from "../utils/zod/schemas/auth.js";
const authRouter = Router();

authRouter.post(
  "/signup",
  validate({ schema: signupSchema, options: ["body"], check: true }),
  signup,
);
authRouter.post(
  "/login",
  validate({ schema: loginSchema, options: ["body"] }),
  login,
);
authRouter.post("/logout", logout);
authRouter.post("/refresh", refreshToken);

authRouter.post(
  "/send-verify-otp",
  verifyToken,
  checkAccountVerification,
  storeVerifyOtp,
  sendOTP(verifyOtpOptions),
);

authRouter.post(
  "/verify-email",
  verifyToken,
  validate({ schema: otpSchema, options: ["body"] }),
  checkAccountVerification,
  checkUserOtpExpiration,
  updateAccountVerificationStatus,
  sendAccountStatus(verifyAccountStatusOptions),
);
export default authRouter;
