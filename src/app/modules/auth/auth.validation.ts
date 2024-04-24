import { z } from 'zod';

const signup = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string({required_error: "Email is required"}),
    username: z.string({required_error: "Username is required"}),
    password: z.string({required_error: "Password is required"}),
  })
});

export const AuthValidation = {
  signup,
}