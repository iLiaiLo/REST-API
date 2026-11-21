const updateAccountVerificationQuery = `UPDATE todo_app.users SET is_account_verified=TRUE, verify_otp='', verify_otp_expire_at=0, updated_at=CURRENT_TIMESTAMP WHERE id=$1;`;
export default updateAccountVerificationQuery;
