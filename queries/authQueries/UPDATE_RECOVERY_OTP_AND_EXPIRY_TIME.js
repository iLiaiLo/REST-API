const updateRecoveryOtpAndExpiryQuery = `UPDATE todo_app.users SET recovery_otp=$1, recovery_otp_expire_at=$2 WHERE email=$3;`;
export default updateRecoveryOtpAndExpiryQuery;
