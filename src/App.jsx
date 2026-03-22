/**
 * @file Root Application Component.
 * @description Main entry point that orchestrates the page structure.
 */

import { LazyMotion } from "framer-motion";

import DataInitializer from "@shared/components/DataInitializer";
import Navbar from "@app/components/Navbar";
import MainContent from "@app/components/MainContent";
import ToastContainer from "@app/components/ToastContainer";
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
