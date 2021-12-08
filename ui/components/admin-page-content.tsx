import { ComponentType, Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type PageSwitcher = {
  page: string;
  animate: "opacity" | "x";
  animateDirection: "left" | "right";
};
export const usePageSwitcher = (items: string[]) => {
  const [state, setPage] = useState<PageSwitcher>({
    page: items[0],
    animate: "opacity",
    animateDirection: "left",
  });
  const changeContent = (content: string) => {
    const nextIndex = items.findIndex((item) => item === content);
    const currentIndex = items.findIndex((item) => item === state.page);
    const animateDirection = nextIndex > currentIndex ? "left" : "right";
    setPage({
      page: content,
      animateDirection,
      animate: "x",
    });
  };
  return [state, changeContent] as unknown as [
    PageSwitcher,
    (v: string) => void
  ];
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

type Props = {
  views: Record<string, ComponentType>;
  control: ReturnType<typeof usePageSwitcher>;
};
export const AdminPageContent = ({
  views,
  control: [{ page, animate, animateDirection }],
}: Props) => {
  const View = views[page] ? views[page] : Fragment;
  const custom = {
    animate,
    animateDirection,
  };
  return (
    <AnimatePresence custom={custom} initial={false} exitBeforeEnter>
      <motion.div
        custom={custom}
        initial="initial"
        exit="exit"
        animate="animate"
        key={page}
        variants={variant}
        transition={transition}
      >
        <View />
      </motion.div>
    </AnimatePresence>
  );
};
