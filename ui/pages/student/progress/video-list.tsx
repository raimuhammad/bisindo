import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { VideoModelType } from "@root/models";
import { useStudent } from "@providers/student-contexts";
import { motion } from "framer-motion";
import { useToggle } from "@hooks/use-toggle";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { useStudentVideoStatus } from "@providers/student-contexts/use-student-video-status";
import { Lock } from "@mui/icons-material";

type VideoProps = {
  model: VideoModelType;
  onClick(v: VideoModelType): void;
};

const lockedStyle = {
  opacity: 0,
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  background: "rgba(0,0,0,0.60)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 6,
};

const Video = observer(({ model, onClick }: VideoProps) => {
  const theme = useTheme();
  const [hovered, { force }] = useToggle();
  const {
    progressInfo: { getPlaying },
    videoList: { getPlayingPercentage },
  } = useStudent();
  const playTime = getPlayingPercentage(model.id, getPlaying(model.id));
  const { getIsLocked } = useStudentVideoStatus(model);
  const isLocked = getIsLocked();

  const {
    progressInfo: { quizHistory },
  } = useStudent();
  const workingQuizes = quizHistory.filter(
    (item) => item.videoId.toString() === model.id.toString()
  );
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        onClick={() => !isLocked && onClick(model)}
        onMouseEnter={force(true)}
        onMouseLeave={force(false)}
        component={motion.div}
        animate={{
          boxShadow: !hovered ? theme.shadows[1] : theme.shadows[10],
        }}
        sx={{
          borderRadius: 1,
          cursor: "pointer",
          position: "relative",
        }}
      >
        {isLocked ? (
          <motion.div
            whileHover={{
              opacity: 1,
              zIndex: 100
            }}
            style={lockedStyle as any}
          >
            <Box sx={{ textAlign: "center", color: "white" }}>
              <Lock />
              <Typography>Video ini terkunci</Typography>
            </Box>
          </motion.div>
        ) : null}
        <Box
          sx={{
            zIndex: 99,
            width: "100%",
            borderRadius: 1,
          }}
          component="img"
          src={model.thumbnail}
          alt=""
        />
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{
              color: (t: Theme) => t.palette.grey["800"],
              fontWeight: "bolder",
            }}
            variant="subtitle1"
          >
            {model.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ textAlign: "left" }} variant="caption">
              Progress anda
            </Typography>
            <Typography sx={{ textAlign: "left" }} variant="caption">
              {playTime ? `${playTime}%` : ""}
            </Typography>
          </Box>
          <LinearProgress value={playTime} variant="determinate" />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ textAlign: "left" }} variant="caption">
              Quis
            </Typography>
            <Typography sx={{ textAlign: "left" }} variant="caption">
              {workingQuizes.length} / {model.quiz_count}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

type Props = {
  width?: string;
  onItemClick?(v: VideoModelType): void;
  exluded?: string[];
};

export const VideoList = ({
  width = "50%",
  onItemClick,
  exluded = [],
}: Props) => {
  const {
    videoList: { videos },
  } = useStudent();
  const navigate = useNavigate();
  const onClick = onItemClick
    ? onItemClick
    : (model: VideoModelType) => {
        navigate(`/video/${model.id}`);
      };

  const getVideos = () => {
    return videos.filter((item) => {
      const isExluded = exluded?.includes(item.id);
      return !isExluded;
    });
  };

  return (
    <Box>
      <Typography
        sx={{ color: (t: Theme) => t.palette.grey["700"] }}
        variant="h4"
      >
        Video pembelajaran
      </Typography>
      <Box
        sx={{
          display: ["block", "flex"],
          flexWrap: "wrap",
          "& > div": {
            width: ["100%", width],
            p: 1,
          },
        }}
      >
        {getVideos().map((item) => (
          <Video onClick={onClick} model={item} key={item.id} />
        ))}
      </Box>
    </Box>
  );
};
