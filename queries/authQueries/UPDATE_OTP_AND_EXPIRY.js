const updateOtpAndExpiryQuery = `UPDATE todo_app.users SET verify_otp=$1,verify_otp_expire_at=$2 WHERE id=$3;`;
export default updateOtpAndExpiryQuery;
