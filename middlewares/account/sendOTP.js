import { boss } from "../../services/cleanupService.js";
const sendOTP = ({ option, message, responseMessage }) => {
  return async (req, res, next) => {
    try {
      const senderEmail = process.env.SENDER_EMAIL;
      const queueName = process.env.EMAIL_QUEUE;
      const OTP = res.locals[option];

      const { email } = res.locals.safeData;
      const options = {
        from: senderEmail,
        to: email,
        subject: "for new user",
        text: `${message} ${OTP}`,
      };

      await boss.send(queueName, options);

      return res.status(200).json({
        message: responseMessage,
      });
    } catch (error) {
      next(error);
    }
  };
};

export default sendOTP;
