/**
 * @file Componente para renderizar una lista de tarjetas de gatos.
 * @description Muestra un título y una rejilla de gatos. Muestra un esqueleto de rejilla mientras carga.
 */

import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import CatCard from "./CatCard";
import SkeletonGrid from "./skeletons/SkeletonGrid";

const CatList = ({
    title,
    cats,
    onAction,
    actionType,
    isActionDisabled,
    loading,
}) => {
    // No renderizar la sección si no hay gatos y no está cargando (ej. favoritos al inicio)
    if (!loading && cats.length === 0) {
        return null;
    }

    return (
        <section className="w-full mb-12">
            <Typography
                variant="h3"
                color="blue-gray"
                className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2 dark:text-gray-200"
            >
                {title}
            </Typography>

            {loading && cats.length === 0 ? (
                <SkeletonGrid />
            ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {cats.map((cat, index) => (
                        <CatCard
                            key={cat.id}
                            cat={cat}
                            index={index}
                            onAction={onAction}
                            actionType={actionType}
                            disabled={isActionDisabled(cat)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

CatList.propTypes = {
    title: PropTypes.string.isRequired,
    cats: PropTypes.array.isRequired,
    onAction: PropTypes.func.isRequired,
    actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
    isActionDisabled: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default CatList;

