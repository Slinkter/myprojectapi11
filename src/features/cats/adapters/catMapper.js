/**
 * @file Mapeadores y adaptadores de Gatos.
 * @description Transforma estructuras de datos crudas de fuentes externas en entidades de dominio de la aplicación.
 * Utiliza Zod para la validación en tiempo de ejecución.
 */

import { z } from "zod";

/**
 * Esquema Zod para la respuesta cruda de la API desde /images/search.
 * @constant {z.ZodType<Object>}
 */
const RawSearchCatSchema = z.object({
    id: z.string(),
    url: z.url(),
    width: z.number().optional(),
    height: z.number().optional(),
});

/**
 * Esquema Zod para la respuesta cruda de la API desde /favourites.
 * @constant {z.ZodType<Object>}
 */
const RawFavouriteCatSchema = z.object({
    id: z.number(),
    user_id: z.string(),
    image_id: z.string(),
    sub_id: z.string().nullable(),
    created_at: z.string(),
    image: z.object({
        id: z.string(),
        url: z.string().url(),
    }),
});

/**
 * Esquema para nuestra CatEntity normalizada.
 * @constant {z.ZodType<Object>}
 */
const CatEntitySchema = z.object({
    id: z.string(),
    url: z.url(),
    favouriteId: z.number().nullable(),
});

/**
 * Entidad de Dominio Base de Gato utilizada en toda la UI de la aplicación.
 * @typedef {Object} CatEntity
 * @property {string} id - El identificador único de la imagen del Gato.
 * @property {string} url - La URL de la imagen del gato.
 * @property {number|null} favouriteId - El ID del registro de favorito, si existe (de lo contrario, null).
 */

/**
 * Normaliza los datos crudos de gatos en un objeto de dominio consistente.
 * @param {Object} rawCat - Datos crudos del gato desde la API.
 * @returns {CatEntity} Entidad de gato normalizada.
 */
export const mapToCatEntity = (rawCat) => {
    const { image, id, url } = rawCat;

    const normalized = image
        ? { id: image.id, url: image.url, favouriteId: id }
        : { id, url, favouriteId: null };

    // Validar con Zod
    return CatEntitySchema.parse(normalized);
};

/**
 * Valida datos crudos de gatos desde el endpoint /favourites.
 * @param {Object} data - Datos crudos de favoritos.
 * @returns {{success: boolean, data?: RawFavouriteCatSchema, error?: z.ZodError}}
 */
export const validateRawFavourite = (data) => {
    return RawFavouriteCatSchema.safeParse(data);
};

/**
 * Valida datos crudos de gatos desde el endpoint /images/search.
 * @param {Object} data - Datos crudos de búsqueda.
 * @returns {{success: boolean, data?: RawSearchCatSchema, error?: z.ZodError}}
 */
export const validateRawSearch = (data) => {
    return RawSearchCatSchema.safeParse(data);
};

/**
 * Mapea una lista de gatos crudos a entidades de dominio con validación.
 * @param {Array} rawCats - Array de datos crudos de la API externa.
 * @returns {CatEntity[]} Lista de entidades de dominio limpias.
 */
export const mapToCatEntities = (rawCats) => {
    if (!Array.isArray(rawCats)) return [];
    return rawCats.map(mapToCatEntity);
};

/**
 * Valida datos normalizados contra el esquema CatEntity.
 * @param {Object} data - Datos a validar.
 * @returns {{success: boolean, data?: CatEntity, error?: z.ZodError}}
 */
export const validateCatEntity = (data) => {
    return CatEntitySchema.safeParse(data);
};
