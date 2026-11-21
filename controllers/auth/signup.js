import AppError from "../../errorHandlers/AppError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../../db/connection.js";
import findUserByEmailQuery from "../../queries/authQueries/FIND_USER_BY_EMAIL.js";
import addUserQuery from "../../queries/authQueries/ADD_USER.js";

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = res.locals.safeData;

    const userExists = await pool.query(findUserByEmailQuery, [email]);
    if (userExists.rowCount) {
      const error = new AppError(
        `user with email ${email} already exists`,
        409,
      );
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";
    const id = crypto.randomUUID();
    await pool.query(addUserQuery, [id, username, email, hashedPassword, role]);

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
        maxAge: 7 * 24 * 3600 * 1000,
        ...options,
      })
      .status(201)
      .json({
        message: "user created successfully",
      });
  } catch (error) {
    next(error);
  }
};

export default signup;
