import { boss } from "../../services/cleanupService.js";

const sendAccountStatus = ({ message, statusCode }) => {
  return async (req, res, next) => {
    try {
      const { email } = res.locals.safeData;
      const senderEmail = process.env.SENDER_EMAIL;
      const queueName = process.env.EMAIL_QUEUE;
      const options = {
        from: senderEmail,
        to: email,
        subject: `for ${email}`,
        text: message,
      };
      await boss.send(queueName, options);
      return statusCode === 204
        ? res.status(statusCode).send()
        : res.status(statusCode).json({ message });
    } catch (error) {
      next(error);
    }
  };
};
export default sendAccountStatus;
