import PropTypes from "prop-types";
import { m } from "framer-motion";

/**
 * Renders a section header with title and optional subtitle.
 * @component
 * @param {object} props - Component properties.
 * @param {string} props.title - Section title.
 * @param {string} [props.subtitle] - Optional subtitle.
 * @returns {JSX.Element} The section header element.
 */
const SectionHeader = ({ title, subtitle }) => (
    <m.header
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="pb-2 mb-4 border-b border-border"
    >
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
    </m.header>
);

SectionHeader.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export default SectionHeader;
