export const verifyOtpOptions = {
  option: "verificationOTP",
  message: "Your account verification OTP is",
  responseMessage: "Account verification OTP was successfully sent",
};

export const verifyAccountStatusOptions = {
  message: "Your account verified sucessfully",
  statusCode: 200,
};

export const deleteAccountStatusOptions = {
  message:
    "Your account has been deleted. you can recover it in 30 days or it will be deleted permanently.",
  statusCode: 204,
};

export const passwordResetOtpOptions = {
  option: "resetPasswordOTP",
  message: "Your OTP for password reset is",
  responseMessage: "OTP for password reset was sucessfully sent",
};

export const updatePasswordStatusOptions = {
  message: "Password update successfully completed",
  statusCode: 200,
};

export const recoveryOtpOptions = {
  option: "recoveryOTP",
  message: "Your account recovery OTP is",
  responseMessage: "Recovery OTP was successfully sent",
};
export const recoveryAccountStatusOptions = {
  message: "Your account recovered successfully",
  statusCode: 200,
};
