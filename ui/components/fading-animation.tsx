import { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const FadingAnimation = ({ children }: PropsWithChildren<any>) => {
  const { pathname } = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={pathname}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
