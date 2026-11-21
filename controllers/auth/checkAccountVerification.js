import findUserByIdQuery from "../../queries/authQueries/FIND_USER_BY_ID.js";
import { pool } from "../../db/connection.js";
import AppError from "../../errorHandlers/AppError.js";
const checkAccountVerification = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await pool.query(findUserByIdQuery, [userId]);
    const { is_account_verified, email } = user.rows[0];

    if (is_account_verified) {
      const error = new AppError("user has already verified", 403);
      return next(error);
    }

    if (res.locals.safeData) {
      res.locals.safeData.email = email;
    } else {
      res.locals.safeData = { email };
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkAccountVerification;
