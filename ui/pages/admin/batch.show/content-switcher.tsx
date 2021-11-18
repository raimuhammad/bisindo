import type { ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBatchShow } from "./context";
import { Container } from "@mui/material";
import { VideoList } from "./video-list";
import { AddVideo } from "./add-video";
import { QuizCheck } from "./quiz-check";
import { Discussion } from "./discussion";
import { StudentList } from "./student-list";
import { Fragment } from "react";

const ComponentMap: Record<string, ComponentType<any>> = {
  VIDEOS: VideoList,
  "ADD-VIDEO": AddVideo,
  STUDENTS: StudentList,
  "QUIZ-CHECK": QuizCheck,
  DISCUSSION: Discussion,
};

const getAnimateValue = (
  type: string,
  key: "initial" | "animate" | "exit",
  direction: "left" | "right"
) => {
  if (type === "opacity") {
    if (key === "animate") {
      return 1;
    }
    return 0;
  }
  switch (key) {
    case "exit": {
      return direction === "left" ? "100%" : "-100%";
    }
    case "initial": {
      return direction === "left" ? "-100%" : "100%";
    }
    default: {
      return 0;
    }
  }
};

const variant = {
  initial({ animate, animateDirection }: any) {
    return {
      [animate]: getAnimateValue(animate, "initial", animateDirection),
    };
  },
  animate({ animate, animateDirection }: any) {
    return {
      [animate]: getAnimateValue(animate, "animate", animateDirection),
    };
  },
  exit({ animate, animateDirection }: any) {
    return {
      [animate]: getAnimateValue(animate, "exit", animateDirection),
    };
  },
};
const transition = {
  x: {
    type: "tween",
  },
  opacity: {
    type: "spring",
  },
};

export const ContentSwitcher = () => {
  const [{ page: key, animateDirection, animate }] =
    useBatchShow().pageControll;
  const custom = {
    animate,
    animateDirection,
  };
  const View = ComponentMap[key] ? ComponentMap[key] : Fragment;
  return (
    <Container sx={{ overflowX: "hidden" }}>
      <AnimatePresence custom={custom} initial={false} exitBeforeEnter>
        <motion.div
          custom={custom}
          initial="initial"
          exit="exit"
          animate="animate"
          key={key}
          variants={variant}
          transition={transition}
        >
          <View />
        </motion.div>
      </AnimatePresence>
    </Container>
  );
};
