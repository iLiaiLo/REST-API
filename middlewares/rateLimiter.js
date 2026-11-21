import { rateLimit } from "express-rate-limit";

const limitRequests = (limit, windowMs) => {
  const options = {
    message: {
      message:
        "Amount of requests has been exceeded in a certain time interval.",
    },
    standardHeaders: "draft-8",
    legacyHeaders: false,
    windowMs,
  };

  return rateLimit({ limit, ...options });
};

export default limitRequests;
