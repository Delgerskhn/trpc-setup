import { z } from "zod";

const emailValidation = z
  .string({
    required_error: "Email is required",
  })
  .email("Email must be a valid email address");

const passwordValidation = z
  .string({
    required_error: "Password is required",
  })
  .min(6)
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(/[!@#$%^&*]/, "Password must contain at least one special character");
export const createUserSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
  phoneNumber: z.number().optional(),
  firstName: z.string({
    required_error: "First name is required",
  }),
  lastName: z.string({
    required_error: "Last name is required",
  }),
  picture: z.string().default(""),
});

export const params = z.object({
  UserId: z.string(),
});

export const updateUserSchema = z.object({
  params,
  body: z
    .object({
      email: emailValidation,
      password: passwordValidation,
      phoneNumber: z.number().optional(),
      firstName: z.string().default(""),
      lastName: z.string().default(""),
      picture: z.string().default(""),
    })
    .partial(),
});

export const filterQuery = z.object({
  limit: z.number().default(1),
  page: z.number().default(10),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;
