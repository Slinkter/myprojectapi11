/**
 * @file Configuración de Framer Motion.
 * @description Funcionalidades de movimiento optimizadas para reducir el tamaño del paquete.
 */

import { domAnimation } from "framer-motion";

/**
 * Funcionalidades de animación cargadas de forma diferida para framer-motion.
 * Utilice esto con LazyMotion para reducir el tamaño del paquete en aproximadamente 30kb.
 */
export const motionFeatures = domAnimation;
