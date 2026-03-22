/**
 * @file Application event logger.
 * @description Simplified logging with timestamps for key application events.
 */

const getTimestamp = () => new Date().toISOString().split("T")[1].slice(0, 12);

export const logStart = (label) => console.log(`⏱️ ${getTimestamp()} ➡️ ${label}`);

export const logEnd = (label, data) => console.log(`⏱️ ${getTimestamp()} ✅ ${label}`, data || "");

export const logState = (label, state) =>
    console.log(`⏱️ ${getTimestamp()} 📊 ${label}:`, state);

export const logAction = (action) =>
    console.log(`⏱️ ${getTimestamp()} ⚡ ${action}`);

export const logApi = (label) =>
    console.log(`🌍 ${getTimestamp()} ${label}`);
