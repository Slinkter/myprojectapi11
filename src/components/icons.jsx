/**
 * @file Iconos SVG como componentes de React.
 * @description Este archivo exporta componentes de React funcionales que renderizan iconos SVG.
 * Esto permite una fácil reutilización y personalización de los iconos en toda la aplicación.
 */

/**
 * Componente de icono de corazón.
 * Utilizado para la acción de "guardar en favoritos".
 *
 * @returns {JSX.Element} El SVG del icono de corazón.
 */
export const HeartIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.383-.597 15.247 15.247 0 01-1.383-.597c-.114-.06-.227-.119-.34-.18a15.247 15.247 0 01-4.753-3.542C4.73 11.249 4.5 9.259 4.5 7.5a3 3 0 013-3c.996 0 1.927.393 2.645 1.04.718-.647 1.649-1.04 2.645-1.04a3 3 0 013 3c0 1.759-.23 3.75-1.689 6.16a15.247 15.247 0 01-4.753 3.542c-.113.06-.226.119-.34.18-.462.258-.928.5-1.383.597l-.022.012-.007.003z" />
    </svg>
);

/**
 * Componente de icono de papelera.
 * Utilizado para la acción de "eliminar de favoritos".
 *
 * @returns {JSX.Element} El SVG del icono de papelera.
 */
export const TrashIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
    >
        <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.006a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.368c1.603 0 2.816 1.336 2.816 2.9zM12 3.25a.75.75 0 01.75.75v.008l.008.008.008.008.008.008.008.008.008.008.007.008h3.22c.345 0 .626.28.626.625v.008l-.001.004-.002.004-.002.004-.003.005-.003.005-.004.005-.004.006-.005.006-.005.006h-10.4c-.345 0-.626-.28-.626-.625v-.008l.001-.004.002-.004.002-.004.003-.005.003-.005.004-.005.004-.006.005-.006.005-.006h3.22a.75.75 0 01.75-.75V3.25z"
            clipRule="evenodd"
        />
    </svg>
);
