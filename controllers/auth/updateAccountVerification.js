import { pool } from "../../db/connection.js";
import updateAccountVerificationQuery from "../../queries/authQueries/UPDATE_ACCOUNT_VERIFICATION.js";
const updateAccountVerificationStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await pool.query(updateAccountVerificationQuery, [userId]);

    next();
  } catch (error) {
    next(error);
  }
};

export default updateAccountVerificationStatus;
