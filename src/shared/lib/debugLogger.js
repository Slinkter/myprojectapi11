/**
 * @file Utilidad de Registro de Depuración Optimizada.
 * @description Proporciona una forma estandarizada y visualmente distinta de rastrear eventos
 * de la aplicación, cambios de estado y el ciclo de vida de la API en la consola del navegador.
 * Cada registro incluye una marca de tiempo de alta resolución (HH:MM:SS.mmm).
 */

/**
 * Devuelve una cadena de marca de tiempo formateada (HH:MM:SS.mmm).
 * Configurada para Lima, Perú (GMT-05).
 * 
 * @private
 * @returns {string} La subcadena de la hora actual.
 * 
 * @description
 * Utiliza 'en-GB' (inglés británico) para un formato de reloj de 24 horas consistente
 * (00:00:00 a 23:59:59), que es el estándar preferido para registros de ingeniería,
 * manteniendo los datos de hora física de la zona horaria 'America/Lima'.
 * 
 * @example 
 * // Formato de salida: 09:30:15.123 (GMT-05)
 * 
 * // Versión original en UTC (Archivada):
 * // const time = () => new Date().toISOString().split("T")[1].slice(0, 12);
 */
const time = () => {
    const options = {
        timeZone: "America/Lima",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-GB", options);
    const ms = String(now.getMilliseconds()).padStart(3, "0");

    return `${timeStr}.${ms}`;
};




/**
 * Registra el inicio de una secuencia lógica (renderizado, montaje, inicio de lógica).
 * @param {string} label - El nombre del proceso que se inicia.
 * @example logStart("CatGallery montado"); 
 * // Salida: ⏱️ 09:12:45.123 ➡️ CatGallery montado
 */
export const logStart = (label) => console.log(`⏱️ ${time()} ➡️ ${label}`);

/**
 * Registra la finalización exitosa de una secuencia con datos opcionales.
 * @param {string} label - El nombre del proceso completado.
 * @param {any} [data] - Carga útil opcional u objeto de resultado a inspeccionar.
 * @example logEnd("Carga de RandomCats", { total: 10 }); 
 * // Salida: ⏱️ 09:12:46.540 ✅ Carga de RandomCats { total: 10 }
 */
export const logEnd = (label, data) =>
    console.log(`⏱️ ${time()} ✅ ${label}`, data || "");

/**
 * Registra el valor actual de un estado o variable.
 * @param {string} label - Descripción del estado.
 * @param {any} state - El objeto de estado o valor a visualizar en árbol.
 * @example logState("UserPreferences", { theme: 'dark' });
 * // Salida: ⏱️ 09:12:46.800 📊 UserPreferences: { theme: 'dark' }
 */
export const logState = (label, state) =>
    console.log(`⏱️ ${time()} 📊 ${label}:`, state);

/**
 * Registra una acción de Redux o un evento atómico específico.
 * @param {string} action - El identificador o descripción de la acción.
 * @example logAction("cats/save/pending");
 * // Salida: ⏱️ 09:12:47.100 ⚡ cats/save/pending
 */
export const logAction = (action) => console.log(`⏱️ ${time()} ⚡ ${action}`);

/**
 * Registra una solicitud de red saliente o un paso de orquestación de API.
 * @param {string} label - Descripción de la llamada a la API.
 * @example logApi("catService.fetchImages");
 * // Salida: 🌍 09:12:47.250 catService.fetchImages
 */
export const logApi = (label) => console.log(`🌍 ${time()} ${label}`);
