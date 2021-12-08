import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const AnimatedPage = ({ children }: any) => {
  const { pathname } = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: {
            type: "tween",
          },
        }}
        key={pathname}
        style={{ minHeight: "100vh" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
