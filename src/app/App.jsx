/**
 * @file Root Application Component.
 * @description Main entry point that orchestrates the page structure.
 */

import { LazyMotion } from "framer-motion";

import DataInitializer from "@app/providers/DataInitializer";
import Navbar from "@widgets/navbar/ui/Navbar";
import MainContent from "@widgets/main-content/ui/MainContent";
import ToastContainer from "@widgets/toast/ui/ToastContainer";
import { useAppearance } from "@shared/hooks/useAppearance";
import { usePageTitle } from "@shared/hooks/usePageTitle";
import { motionFeatures } from "@config/motionConfig";

/**
 * Root Application Component.
 * @component
 * @returns {JSX.Element} The main layout.
 */
const App = () => {
  usePageTitle("Project API 11 - Cat Gallery");
  useAppearance();

  return (
    <LazyMotion features={motionFeatures}>
      <div className="min-h-dvh">
        <DataInitializer />
        <Navbar />
        <MainContent />
        <ToastContainer />
      </div>
    </LazyMotion>
  );
};

export default App;
