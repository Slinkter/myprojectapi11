/**
 * @file Componente para renderizar una lista de tarjetas de gatos.
 * @description Muestra un título y una rejilla de gatos.
 * Muestra un esqueleto de rejilla  mientras carga los datos.
 * No renderiza nada si la lista de gatos está vacía y no está cargando.
 */

import PropTypes from "prop-types";
import SkeletonGrid from "./skeletons/SkeletonGrid";
import CatCard from "./CatCard";

/**
 * Muestra una sección con un título y una lista de gatos en formato de rejilla.
 *
 * @component
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.title - El título de la sección.
 * @param {Array<object>} props.cats - El array de gatos a mostrar.
 * @param {function} props.onAction - La función a pasar a cada `CatCard`.
 * @param {string} props.actionType - El tipo de acción a pasar a cada `CatCard`.
 * @param {function} props.isActionDisabled - Función para determinar si la acción en una `CatCard` está deshabilitada.
 * @param {boolean} props.loading - Si es `true`, muestra el esqueleto de carga.
 * @returns {JSX.Element|null} El componente de la lista de gatos o `null`.
 */
const CatList = (props) => {
    // Optimización: No renderizar la sección si no hay gatos y no se están cargando.
    // Esto es útil para la lista de favoritos, que puede estar vacía al principio.

    const { title, cats, onAction, actionType, isActionDisabled, loading } =
        props;

    if (!loading && cats.length === 0) {
        return null;
    }

    return (
        <section className="w-full mb-12">
            <h3 className="text-xl text-gray-800 dark:text-gray-200 font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                {title}
            </h3>

            {/* Muestra el esqueleto si está cargando y aún no hay gatos para mostrar. */}
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
    /** El título que se mostrará encima de la lista. */
    title: PropTypes.string.isRequired,
    /** El array de objetos de gato a renderizar. */
    cats: PropTypes.array.isRequired,
    /** La función de callback para la acción de la tarjeta. */
    onAction: PropTypes.func.isRequired,
    /** El tipo de acción (ej. 'save', 'delete'). */
    actionType: PropTypes.oneOf(["save", "delete"]).isRequired,
    /** Función que devuelve `true` si la acción para un gato específico debe estar deshabilitada. */
    isActionDisabled: PropTypes.func.isRequired,
    /** Indica si los datos se están cargando actualmente. */
    loading: PropTypes.bool.isRequired,
};

export default CatList;
