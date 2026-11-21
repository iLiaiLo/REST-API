import { pool } from "../../db/connection.js";
import updatePasswordQuery from "../../queries/authQueries/UPDATE_PASSWORD.js";
import bcrypt from "bcrypt";

const updatePassword = async (req, res, next) => {
  try {
    const { email, password } = res.locals.safeData;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(updatePasswordQuery, [hashedPassword, email]);

    const options = {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };

    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options);

    next();
  } catch (error) {
    next(error);
  }
};

export default updatePassword;
