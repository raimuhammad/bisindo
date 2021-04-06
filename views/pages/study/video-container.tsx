import * as React from "react";
import { AnimatedContainer } from "./animated-container";
import { makeStyles } from "@material-ui/core";
import { useStudyPage, Video } from "./provider";
import { motion, AnimatePresence } from "framer-motion";

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(3),
    cursor: "pointer",
    backgroundColor: "white",
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.primary.dark,
      color: "white",
    },
    transition: "all ease .3s",
  },
  image: {
    width: "40%",
  },
  snippetContainer: {
    width: "60%",
    padding: theme.spacing(2),
  },
}));
const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};
const variants = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },
  enter: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition,
  },
};

const VideoCard = (props: Required<Video>) => {
  const classes = useClasses();
  const { snippet } = props;
  const { handleChangeVideo, video } = useStudyPage();
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <div
        aria-selected={video.id?.videoId === props.id.videoId}
        onClick={() => handleChangeVideo(props)}
        role="button"
        className={classes.root}
      >
        <div className={classes.image}>
          <img
            src={snippet.thumbnails?.medium?.url}
            style={{ width: "100%", height: "100%" }}
            alt=""
          />
        </div>
        <div className={classes.snippetContainer}>
          <p
            dangerouslySetInnerHTML={{
              __html: video.snippet?.title as string,
            }}
            style={{ marginBottom: "1rem", fontWeight: "bold" }}
          />
          <p>{snippet.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const VideoContainer = () => {
  const { videos } = useStudyPage();
  return (
    <AnimatedContainer>
      <div>
        <AnimatePresence>
          {videos.map((item) => (
            <VideoCard
              key={item.id?.videoId as string}
              {...(item as Required<Video>)}
            />
          ))}
        </AnimatePresence>
      </div>
    </AnimatedContainer>
  );
};
