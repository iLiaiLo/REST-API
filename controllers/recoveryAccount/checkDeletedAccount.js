import { pool } from "../../db/connection.js";
import AppError from "../../errorHandlers/AppError.js";
import findUserStatusByEmailQuery from "../../queries/authQueries/FIND_USER_STATUS_BY_EMAIL.js";
const checkDeletedAccount = async (req, res, next) => {
  try {
    const { email } = res.locals.safeData;

    const user = await pool.query(findUserStatusByEmailQuery, [email]);
    if (!user.rowCount) {
      const error = new AppError("user not found", 404);
      return next(error);
    }

    if (user.rows[0].is_account_verified) {
      const error = new AppError("user already verified.", 403);
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkDeletedAccount;
