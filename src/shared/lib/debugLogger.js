/**
 * @file Debug logger simplificado.
 * @description Solo timestamps + eventos clave.
 */

const time = () => new Date().toISOString().split("T")[1].slice(0, 12);

/**
 * Inicio de secuencia
 */
export const logStart = (label) => console.log(`⏱️ ${time()} ➡️ ${label}`);

/**
 * Fin de secuencia
 */
export const logEnd = (label, data) => console.log(`⏱️ ${time()} ✅ ${label}`, data || "");

/**
 * Estado actual
 */
export const logState = (label, state) => 
    console.log(`⏱️ ${time()} 📊 ${label}:`, state);

/**
 * Acción Redux
 */
export const logAction = (action) => 
    console.log(`⏱️ ${time()} ⚡ ${action}`);

/**
 * API
 */
export const logApi = (label) => 
    console.log(`🌍 ${time()} ${label}`);
