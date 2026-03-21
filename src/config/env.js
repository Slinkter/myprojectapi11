/**
 * @file Application Environment Configuration.
 * @description Centralizes and validates environment variables to avoid
 * scattered `import.meta.env` calls throughout the codebase.
 */

import { z } from "zod";

/**
 * Environment variable schema definition.
 * @constant {z.ZodType<Object>}
 */
const EnvSchema = z.object({
    VITE_BASE_URL: z.url("VITE_BASE_URL must be a valid URL"),
    VITE_API_KEY: z.string().min(1, "VITE_API_KEY is required"),
});

/**
 * Validates critical environment variables.
 * In development, missing or invalid variables result in an early crash for better DX.
 */
const validateEnv = () => {
    const result = EnvSchema.safeParse({
        VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
        VITE_API_KEY: import.meta.env.VITE_API_KEY,
    });

    if (!result.success) {
        const errors = result.error.errors.map((e) => e.message).join(", ");
        const message = `[App Config] Invalid environment variables: ${errors}`;
        console.error(message);
        // Crash in development if environment is malformed.
        if (import.meta.env.DEV) {
            throw new Error(message);
        }
    }
};

// Run validation immediately
validateEnv();

/**
 * Global configuration object for the application.
 * @property {object} api - API specific configurations.
 * @property {string} api.baseUrl - The base URL for the API.
 * @property {string} api.apiKey - The authentication key for the API.
 */
export const config = {
    api: {
        baseUrl: import.meta.env.VITE_BASE_URL,
        apiKey: import.meta.env.VITE_API_KEY,
    },
};
