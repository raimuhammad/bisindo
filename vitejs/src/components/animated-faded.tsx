import * as React from "react";
import { motion } from "framer-motion";

const variants = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const AnimatedFaded = ({ children }: any) => {
  return (
    <motion.div variants={variants} initial="exit" animate="enter" exit="exit">
      {children}
    </motion.div>
  );
};
