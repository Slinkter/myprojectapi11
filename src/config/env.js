/**
 * @file Configuración del Entorno de la Aplicación.
 * @description Centraliza y valida las variables de entorno para evitar
 * llamadas dispersas a `import.meta.env` en todo el código base.
 */

import { z } from "zod";

/**
 * Definición del esquema de variables de entorno.
 * @constant {z.ZodType<Object>}
 */
const EnvSchema = z.object({
    VITE_BASE_URL: z.url("VITE_BASE_URL debe ser una URL válida"),
    VITE_API_KEY: z.string().min(1, "VITE_API_KEY es requerida"),
});

/**
 * Valida variables de entorno críticas.
 * En desarrollo, las variables faltantes o inválidas provocan un fallo temprano para una mejor DX.
 */
const validateEnv = () => {
    const result = EnvSchema.safeParse({
        VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
        VITE_API_KEY: import.meta.env.VITE_API_KEY,
    });

    if (!result.success) {
        const errors = result.error.errors.map((e) => e.message).join(", ");
        const message = `[App Config] Variables de entorno inválidas: ${errors}`;
        console.error(message);
        // Fallar en desarrollo si el entorno está mal formado.
        if (import.meta.env.DEV) {
            throw new Error(message);
        }
    }
};

// Ejecutar validación inmediatamente
validateEnv();

/**
 * Objeto de configuración global para la aplicación.
 * @property {object} api - Configuraciones específicas de la API.
 * @property {string} api.baseUrl - La URL base para la API.
 * @property {string} api.apiKey - La clave de autenticación para la API.
 */
export const config = {
    api: {
        baseUrl: import.meta.env.VITE_BASE_URL,
        apiKey: import.meta.env.VITE_API_KEY,
    },
};
