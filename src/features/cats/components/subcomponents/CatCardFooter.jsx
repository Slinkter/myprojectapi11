/**
 * @file Componente CatCardFooter.
 * @description Renderiza un botón de acción flotante minimalista para una tarjeta de gato.
 */

import React from "react";
import PropTypes from "prop-types";
import { BsFillHeartFill, BsHeart, BsTrash } from "react-icons/bs";
import { cn } from "@shared/lib/cn";
import IconButton from "@shared/ui/IconButton";

/**
 * Componente CatCardFooter.
 * @param {object} props - Propiedades del componente.
 * @param {'save' | 'delete'} props.actionType - Tipo de acción.
 * @param {import('react').MouseEventHandler<HTMLButtonElement>} props.onAction - Manejador de acción disparado al hacer clic.
 * @param {boolean} props.disabled - Estado deshabilitado.
 * @returns {JSX.Element} El elemento del pie de página.
 */
const CatCardFooter = ({ actionType, onAction, disabled }) => {
  const isSave = actionType === "save";
  const label = isSave ? "Añadir a favoritos" : "Eliminar de favoritos";

  return (
    <IconButton
      onClick={onAction}
      disabled={disabled}
      ariaLabel={label}
      className={cn(
        "border-none active:scale-95",
        isSave 
          ? (disabled ? "bg-black/50 cursor-not-allowed" : "bg-black/70 hover:bg-black text-white")
          : "bg-black/70 hover:bg-black text-white"
      )}
    >

      {isSave ? (
        disabled ? (
          <BsFillHeartFill className="text-red-500" />
        ) : (
          <BsHeart />
        )
      ) : (
        <BsTrash className="hover:text-red-500 transition-colors" />
      )}
    </IconButton>
  );
};

CatCardFooter.propTypes = {
  actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
  onAction: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default React.memo(CatCardFooter);
