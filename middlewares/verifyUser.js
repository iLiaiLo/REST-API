import { pool } from "../db/connection.js";
import findUserByIdQuery from "../queries/authQueries/FIND_USER_BY_ID.js";
import AppError from "../errorHandlers/AppError.js";
import cache from "../cache/appCache.js";
const verifyUser = async (req, res, next) => {
  try {
    const id = req.user.id;
    const cachedStatus = cache.get(`user:${id}:verification_status`);
    if (cachedStatus) {
      console.log("user is verified");
      return next();
    }
    const user = await pool.query(findUserByIdQuery, [id]);
    if (!user.rowCount) {
      const error = new AppError("user not found", 404);
      return next(error);
    }
    const userIsVerified = user.rows[0].is_account_verified;
    if (!userIsVerified) {
      const error = new AppError("user is not verified", 403);
      return next(error);
    }
    cache.set(`user:${id}:verification_status`, userIsVerified);
    next();
  } catch (error) {
    next(error);
  }
};
export default verifyUser;
