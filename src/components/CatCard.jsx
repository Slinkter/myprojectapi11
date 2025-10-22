/**
 * @file Componente para mostrar una tarjeta de gato individual.
 * @description Muestra la imagen de un gato con una animación de entrada y un botón de acción al pasar el cursor.
 */

import React from "react";
import PropTypes from "prop-types";

// SVG Icons for actions
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.383-.597 15.247 15.247 0 01-1.383-.597c-.114-.06-.227-.119-.34-.18a15.247 15.247 0 01-4.753-3.542C4.73 11.249 4.5 9.259 4.5 7.5a3 3 0 013-3c.996 0 1.927.393 2.645 1.04.718-.647 1.649-1.04 2.645-1.04a3 3 0 013 3c0 1.759-.23 3.75-1.689 6.16a15.247 15.247 0 01-4.753 3.542c-.113.06-.226.119-.34.18-.462.258-.928.5-1.383.597l-.022.012-.007.003z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.368c1.603 0 2.816 1.336 2.816 2.9zM12 3.25a.75.75 0 01.75.75v.008l.008.008.008.008.008.008.008.008.008.008.007.008h3.22c.345 0 .626.28.626.625v.008l-.001.004-.002.004-.002.004-.003.005-.003.005-.004.005-.004.006-.005.006-.005.006h-10.4c-.345 0-.626-.28-.626-.625v-.008l.001-.004.002-.004.002-.004.003-.005.003-.005.004-.005.004-.006.005-.006.005-.006h3.22a.75.75 0 01.75-.75V3.25z" clipRule="evenodd" />
    </svg>
);

const CatCard = ({ cat, onAction, actionType, disabled, index }) => {
    const buttonClasses = `absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center 
                         text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                         ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;

    const iconColor = disabled
        ? "text-gray-400"
        : actionType === "save"
        ? "text-green-400"
        : "text-red-400";

    const handleAction = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            onAction(cat);
        }
    };

    return (
        <div
            className="relative group aspect-square rounded-lg overflow-hidden shadow-md opacity-0 animate-fade-in-scale"
            style={{ animationDelay: `${index * 75}ms` }}
        >
            <img
                src={cat.url}
                alt={`A cute cat (id: ${cat.id})`}
                className="w-full h-full object-cover"
            />
            <div className={buttonClasses} onClick={handleAction}>
                <div className={iconColor}>
                    {actionType === "save" ? <HeartIcon /> : <TrashIcon />}
                </div>
            </div>
        </div>
    );
};

CatCard.propTypes = {
    cat: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    }).isRequired,
    onAction: PropTypes.func.isRequired,
    actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
    disabled: PropTypes.bool.isRequired,
    /** El índice de la tarjeta, usado para el retraso de la animación */
    index: PropTypes.number.isRequired,
};

export default React.memo(CatCard);
