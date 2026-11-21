import * as z from "zod";
import AppError from "../../errorHandlers/AppError.js";
const validate = ({ schema, options, check = false }) => {
  return (req, res, next) => {
    try {
      const validationSchema = z.object(schema);

      const objToParse = options.reduce((acc, curr) => {
        return { ...acc, ...req[curr] };
      }, {});

      const parsed = validationSchema.safeParse(objToParse);

      if (!parsed.success) {
        const errorMessage = parsed.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join(", ");
        const error = new AppError(errorMessage, 400);
        return next(error);
      }

      const safeData = parsed.data;
      if (check) {
        if (safeData.password !== safeData.confirmPassword) {
          const error = new AppError("passwords are not matched", 400);
          return next(error);
        }

        const { confirmPassword, ...restData } = safeData;

        res.locals.safeData = restData;
      } else {
        res.locals.safeData = safeData;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
export default validate;
