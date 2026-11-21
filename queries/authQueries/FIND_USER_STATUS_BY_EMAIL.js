const findUserStatusByEmailQuery = `SELECT is_deleted, is_account_verified, reset_otp, reset_otp_expire_at, recovery_otp, recovery_otp_expire_at FROM todo_app.users WHERE email = $1;`;
export default findUserStatusByEmailQuery;
