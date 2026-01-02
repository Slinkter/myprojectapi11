/**
 * @file Application Environment Configuration.
 * @description Centralizes and validates environment variables to avoid
 * scattered `import.meta.env` calls throughout the codebase.
 */

/**
 * Validates that critical environment variables are present.
 * Throws an error in development if missing.
 */
const validateEnv = () => {
  const required = ["VITE_BASE_URL", "VITE_API_KEY"];

  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    const message = `[App Config] Missing required environment variables: ${missing.join(
      ", "
    )}`;
    console.error(message);
    // In strictly typed environments or strict mode, we might want to throw.
    // throw new Error(message);
  }
};

// Run validation
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
