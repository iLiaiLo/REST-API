import transporter from "../utils/transporter.js";
import { boss } from "../services/cleanupService.js";
const queueName = process.env.EMAIL_QUEUE;
const initializeMailQueue = async () => {
  try {
    await boss.createQueue(queueName, {
      deleteAfterSeconds: 604800,
    });

    console.log("Mail queue has been created");

    await boss.work(queueName, async ([job]) => {
      try {
        const emailOptions = job.data;

        const info = await transporter.sendMail(emailOptions);

        console.log("Email sent successfully:", info.messageId);
      } catch (error) {
        console.log({ error: error.message });
      }
    });
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
};

export default initializeMailQueue;
