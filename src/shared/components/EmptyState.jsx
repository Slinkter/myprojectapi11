/**
 * @file Empty state component.
 * @description Displays a message when there's no content to show.
 */

import PropTypes from "prop-types";
import { m } from "framer-motion";

/**
 * Renders an empty state message with animation.
 * @component
 * @param {object} props - Component properties.
 * @param {string} props.message - Message to display.
 * @param {string} [props.icon] - Optional icon class or emoji.
 * @returns {JSX.Element} The empty state component.
 */
const EmptyState = ({ message, icon }) => {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-12 text-center border-2 border-dashed rounded-xl text-muted-foreground border-border/50 bg-muted/20"
    >
      {icon && <div className="text-4xl mb-3">{icon}</div>}
      <div>{message}</div>
    </m.div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.node.isRequired,
  icon: PropTypes.string,
};

export default EmptyState;
