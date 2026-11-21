import { pool } from "../../db/connection.js";
import crypto from "crypto";
import updateRecoveryOtpAndExpiryQuery from "../../queries/authQueries/UPDATE_RECOVERY_OTP_AND_EXPIRY_TIME.js";
import AppError from "../../errorHandlers/AppError.js";
const storeRecoveryOtp = async (req, res, next) => {
  try {
    const { email } = res.locals.safeData;
    const recoveryOTP = crypto.randomInt(100_000, 1000_000);
    const recoveryOTPExpireAt = Date.now() + 15 * 60 * 1000;

    const userToUpdate = await pool.query(updateRecoveryOtpAndExpiryQuery, [
      recoveryOTP,
      recoveryOTPExpireAt,
      email,
    ]);
    if (!userToUpdate.rowCount) {
      const error = new AppError("user was not found to update recovery OTP");
      return next(error);
    }

    res.locals.recoveryOTP = recoveryOTP;
    next();
  } catch (error) {
    next(error);
  }
};

export default storeRecoveryOtp;
