/**
 * @file Componente para mostrar una tarjeta de gato individual.
 * @description Muestra la imagen de un gato con una animación de entrada y un botón de acción
 * superpuesto que aparece al pasar el cursor. El componente está memoizado para optimizar el rendimiento.
 */

import React from "react";
import PropTypes from "prop-types";

import { BsFillHeartFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
/**
 * Renderiza una tarjeta individual para un gato.
 *
 * @component
 * @param {object} props - Las propiedades del componente.
 * @param {object} props.cat - El objeto del gato a mostrar.
 * @param {function} props.onAction - La función a ejecutar cuando se hace clic en el botón de acción.
 * @param {string} props.actionType - El tipo de acción ("save" o "delete") para determinar el icono.
 * @param {boolean} props.disabled - Si el botón de acción debe estar deshabilitado.
 * @param {number} props.index - El índice de la tarjeta, usado para un retraso en la animación de entrada.
 * @returns {JSX.Element} Una tarjeta de gato.
 */
const CatCard = ({ cat, onAction, actionType, disabled, index }) => {
    // Clases dinámicas para el botón de acción, controlando la visibilidad y el estado del cursor.
    const buttonClasses = `absolute flex justify-center items-center bg-black/40 backdrop-blur-sm inset-0
                         text-white opacity-0 group-hover:opacity-100 transition-all duration-300 
                         ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;

    // Determina el color del icono basado en el tipo de acción y si está deshabilitado.
    const iconColor = disabled
        ? "text-gray-400"
        : actionType === "save"
        ? "text-red-500"
        : "text-red-400";

    /**
     * Manejador para el evento de clic en el botón de acción.
     * Previene el comportamiento por defecto y la propagación del evento.
     * Llama a la función `onAction` solo si el botón no está deshabilitado.
     * @param {React.MouseEvent} e - El evento de clic.
     */
    const handleAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            onAction(cat);
        }
    };

    return (
        <div
            className="relative group aspect-square rounded-xl overflow-hidden shadow-md opacity-0 animate-fade-in-scale border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
            // Aplica un retraso a la animación basado en el índice para un efecto escalonado.
            style={{ animationDelay: `${index * 75}ms` }}
        >
            <img
                src={cat.url}
                alt={`A cute cat (id: ${cat.id})`}
                className="w-full h-full object-cover"
            />
            {/* Capa superpuesta con el botón de acción. */}
            <div className={buttonClasses} onClick={handleAction}>
                <div
                    className={`${iconColor} bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-200`}
                >
                    {actionType === "save" ? (
                        <BsFillHeartFill className="w-6 h-6" />
                    ) : (
                        <BsTrashFill className="w-6 h-6" />
                    )}
                </div>
            </div>
        </div>
    );
};

CatCard.propTypes = {
    /** El objeto del gato que contiene id y url. */
    cat: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    /** Función que se llama al hacer clic en la acción. */
    onAction: PropTypes.func.isRequired,
    /** Define el icono y el comportamiento del botón. */
    actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
    /** Si es `true`, el botón de acción está inactivo. */
    disabled: PropTypes.bool.isRequired,
    /** El índice de la tarjeta, usado para el retraso de la animación. */
    index: PropTypes.number.isRequired,
};

// Se memoiza el componente para evitar re-renderizados innecesarios si las props no cambian.
const MemoizedCatCard = React.memo(CatCard);

export default MemoizedCatCard;
