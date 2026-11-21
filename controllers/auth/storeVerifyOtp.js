import { pool } from "../../db/connection.js";
import crypto from "crypto";
import updateOtpAndExpiryQuery from "../../queries/authQueries/UPDATE_OTP_AND_EXPIRY.js";
const storeVerifyOtp = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const OTP = crypto.randomInt(100_000, 1000_000);
    const expireAt = Date.now() + 15 * 60 * 1000;

    await pool.query(updateOtpAndExpiryQuery, [OTP, expireAt, userId]);

    res.locals.verificationOTP = OTP;
    next();
  } catch (error) {
    next(error);
  }
};
export default storeVerifyOtp;
