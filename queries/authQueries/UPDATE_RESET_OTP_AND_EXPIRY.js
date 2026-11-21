const updateResetOtpAndExpiryQuery = `UPDATE todo_app.users SET reset_otp=$1,reset_otp_expire_at=$2 WHERE email=$3;`;
export default updateResetOtpAndExpiryQuery;
