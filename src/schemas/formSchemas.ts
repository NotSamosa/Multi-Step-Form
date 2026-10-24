import { z } from "zod";

// Step 1: Personal Information Schema
export const step1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full Name is required")
    .min(2, "Full Name must be at least 2 characters")
    .max(80, "Full Name must not exceed 80 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address (e.g. name@domain.com)"),
  phoneNumber: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        // Allow +, spaces, dashes, parentheses and 7-15 digits
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(val);
      },
      {
        message: "Please enter a valid phone number or leave it blank",
      }
    ),
});

export type Step1SchemaType = z.infer<typeof step1Schema>;

// Step 2: Address Details Schema
export const step2Schema = z.object({
  streetAddress: z
    .string()
    .trim()
    .min(1, "Street Address is required")
    .min(5, "Please enter a complete street address (minimum 5 characters)"),
  city: z
    .string()
    .trim()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
  zipCode: z
    .string()
    .trim()
    .min(1, "Zip Code is required")
    .regex(/^\d{3,10}$/, "Zip Code must be numeric (between 3 and 10 digits)"),
  country: z
    .string()
    .trim()
    .min(1, "Please select a country"),
});

export type Step2SchemaType = z.infer<typeof step2Schema>;

// Step 3: Account Credentials Schema
export const step3Schema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must not exceed 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type Step3SchemaType = z.infer<typeof step3Schema>;

// Predefined Country list for the Step 2 Country dropdown
export const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "India",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "Singapore",
  "Netherlands",
  "United Arab Emirates",
  "Brazil",
] as const;
