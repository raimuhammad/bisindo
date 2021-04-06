import * as React from "react";
import { motion } from "framer-motion";

const transition = {
  duration: 3,
  ease: [0.43, 0.13, 0.23, 0.96],
  staggerChildren: 0.3,
};
const variants = {
  enter: () => {
    return {
      y: "100%",
      opacity: 0,
      transition,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: () => {
    return {
      zIndex: 0,
      y: "-100%",
      opacity: 0,
      transition,
    };
  },
};
export const AnimatedContainer = ({
  children,
}: React.PropsWithChildren<any>) => {
  return (
    <motion.div
      variants={variants}
      initial="enter"
      exit="exit"
      animate="center"
    >
      {children}
    </motion.div>
  );
};
