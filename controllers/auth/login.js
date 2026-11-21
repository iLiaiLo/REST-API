import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../../db/connection.js";
import AppError from "../../errorHandlers/AppError.js";
import findUserByEmailQuery from "../../queries/authQueries/FIND_USER_BY_EMAIL.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = res.locals.safeData;

    const exitingUser = await pool.query(findUserByEmailQuery, [email]);
    if (!exitingUser.rowCount) {
      const error = new AppError(
        `user with email ${email} does not exist`,
        404,
      );
      return next(error);
    }

    const passwordsAreSame = await bcrypt.compare(
      password,
      exitingUser.rows[0].password,
    );

    if (!passwordsAreSame) {
      const error = new AppError("passwords did not match", 401);
      return next(error);
    }

    const { role, id } = exitingUser.rows[0];

    const accessToken = jwt.sign({ role, id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
      algorithm: "HS256",
    });
    const refreshToken = jwt.sign(
      { role, id },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      },
    );

    const options = {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    };
    return res
      .cookie("accessToken", accessToken, {
        mexAge: 15 * 60 * 1000,
        ...options,
      })
      .cookie("refreshToken", refreshToken, {
        mexAge: 7 * 24 * 3600 * 1000,
        ...options,
      })
      .status(200)
      .json({
        message: "user logged in successfully",
      });
  } catch (error) {
    next(error);
  }
};

export default login;
