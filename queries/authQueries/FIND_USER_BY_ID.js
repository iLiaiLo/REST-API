const findUserByIdQuery = `SELECT email, is_account_verified,verify_otp,verify_otp_expire_at FROM todo_app.users WHERE id = $1;`;
export default findUserByIdQuery;
