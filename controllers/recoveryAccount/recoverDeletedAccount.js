import { pool } from "../../db/connection.js";
import AppError from "../../errorHandlers/AppError.js";
import updateVerificationQuery from "../../queries/authQueries/UPDATE_USER_VERIFICATION_STATUS.js";

const recoverDeletedAccount = async (req, res, next) => {
  try {
    const { email } = res.locals.safeData;
    const updateVerifactionStatus = await pool.query(updateVerificationQuery, [
      email,
    ]);
    if (!updateVerifactionStatus.rowCount) {
      const error = new AppError("user with this email not found", 404);
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default recoverDeletedAccount;
