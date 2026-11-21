import findUserStatusByEmailQuery from "../../queries/authQueries/FIND_USER_STATUS_BY_EMAIL.js";
import { pool } from "../../db/connection.js";
import AppError from "../../errorHandlers/AppError.js";
const checkResetOtp = async (req, res, next) => {
  try {
    const { email, otp } = res.locals.safeData;

    const user = await pool.query(findUserStatusByEmailQuery, [email]);
    if (!user.rowCount) {
      const error = new AppError(`user with email ${email} was not found`, 404);
      return next(error);
    }
    const { is_account_verified, reset_otp, reset_otp_expire_at } =
      user.rows[0];

    if (!is_account_verified) {
      const error = new AppError("user is not verified", 403);
      return next(error);
    }

    if (!reset_otp || reset_otp !== otp) {
      const error = new AppError(
        "otp is not matched to corresponding user's otp",
        400,
      );
      return next(error);
    }

    if (reset_otp_expire_at < Date.now()) {
      const error = new AppError("otp expired", 410);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default checkResetOtp;
