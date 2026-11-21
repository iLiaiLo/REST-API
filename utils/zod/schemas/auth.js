import * as z from "zod";

export const loginSchema = {
  email: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long"),
};

export const recoveryAccountSchema = {
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email format",
    ),
  otp: z.string().regex(/^\d{6}$/, "otp must be a 6-digit number"),
};

export const resetPasswordInputSchema = {
  email: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email format",
    ),
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "otp should be 6 digits long"),
  password: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long"),
};

export const signupSchema = {
  username: z
    .string()
    .trim()
    .min(3, "firstname should be at least 3 characters long"),
  email: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .trim()
    .min(6, "password must be at least 6 characters long"),
};

export const userEmailSchema = {
  email: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "invalid email format",
    ),
};

export const otpSchema = {
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "otp should be 6 digits long"),
};
