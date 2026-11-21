import jwt from "jsonwebtoken";
import AppError from "../errorHandlers/AppError.js";
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      const error = new AppError("no token for authentication", 401);
      return next(error);
    }
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) {
        const error = new AppError(`[${err.name}] ${err.message}`, 401);
        return next(error);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
