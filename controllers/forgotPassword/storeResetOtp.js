import { pool } from "../../db/connection.js";
import crypto from "crypto";
import updateResetOtpAndExpiryQuery from "../../queries/authQueries/UPDATE_RESET_OTP_AND_EXPIRY.js";
const storeResetOtp = async (req, res, next) => {
  try {
    const { email } = res.locals.safeData;
    const resetOTP = crypto.randomInt(100_000, 1000_000);
    const resetExpireAt = Date.now() + 15 * 60 * 1000;

    await pool.query(updateResetOtpAndExpiryQuery, [
      resetOTP,
      resetExpireAt,
      email,
    ]);

    res.locals.resetPasswordOTP = resetOTP;
    next();
  } catch (error) {
    next(error);
  }
};

export default storeResetOtp;
