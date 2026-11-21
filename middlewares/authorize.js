import AppError from "../errorHandlers/AppError.js";

const authorize = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        const error = new AppError("Unauthorized: No user found", 401);
        return next(error);
      }

      const isRolePresent = roles.includes(req.user.role);

      if (!isRolePresent) {
        const error = new AppError("Forbidden: Insufficient permissions", 403);
        return next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;
