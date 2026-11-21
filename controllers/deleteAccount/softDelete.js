import { pool } from "../../db/connection.js";
import AppError from "../../errorHandlers/AppError.js";
import softDeleteQuery from "../../queries/authQueries/SOFT_DELETE.js";
import cache from "../../cache/appCache.js";
const softDelete = async (req, res, next) => {
  try {
    const id = req.user.id;
    const deleteAccount = await pool.query(softDeleteQuery, [id]);
    if (!deleteAccount.rowCount) {
      const error = new AppError("unable to perform soft delete", 404);
      return next(error);
    }

    const { email } = deleteAccount.rows[0];

    res.locals.safeData = { email };

    const options = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };
    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options);

    cache.del(`user:${id}:verification_status`);

    next();
  } catch (error) {
    next(error);
  }
};

export default softDelete;
