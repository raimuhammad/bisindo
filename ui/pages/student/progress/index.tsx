import { Fragment } from "react";
import { useStudentNavs } from "@layout/student";
import { useStudent } from "@providers/student-contexts";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  LinearProgress,
  Theme,
  Typography,
} from "@mui/material";
import { VideoList } from "./video-list";
import {
  ArrowCircleUp,
  ArrowDropUp,
  ArrowUpward,
  MenuBook,
  Stars,
} from "@mui/icons-material";
import { observer } from "mobx-react";

const BatchInfo = () => {
  const {
    gradeInfo: { studentGrade },
  } = useStudent();
  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: "lighter" }}>
        Kelas / batch
      </Typography>
      <Typography
        sx={{
          fontWeight: "bolder",
          color: (t: Theme) => t.palette.grey["700"],
        }}
        variant="h5"
      >
        {studentGrade.grade.name}
      </Typography>
    </div>
  );
};

const ProgressInfo = observer(() => {
  const {
    videoList: { videos },
    progressInfo: { videoHistory },
  } = useStudent();
  const compeletedVideo = videos.filter((item) => {
    const history = videoHistory.find(
      (h) => h.video_id.toString() === item.id.toString()
    );
    return history ? history.time >= (item.duration as number) : false;
  });
  const val = compeletedVideo.length
    ? (compeletedVideo.length / videos.length) * 100
    : 0;
  return (
    <div style={{ position: "relative" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Progress anda</Typography>
        <Typography>
          {compeletedVideo.length} / {videos.length} video
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            mb: 1,
            display: "flex",
            justifyContent: "space-between",
            "& > *": { color: "primary.main" },
          }}
        >
          <MenuBook />
          <Stars />
        </Box>
        <LinearProgress variant="determinate" value={val} />
        <Box
          sx={{
            width: `${val + 3}%`,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <ArrowDropUp
              sx={{
                color: "primary.main",
                display: "block",
                p: 0,
                m: 0,
              }}
            />
            <Typography variant="caption">{val} %</Typography>
          </div>
        </Box>
      </Box>
    </div>
  );
});

const Index = () => {
  useStudentNavs([]);
  return (
    <Container sx={{ py: 2 }}>
      <Box
        sx={{
          width: ["100%"],
          display: "flex",
          "&>div": { width: "50%", p: 1 },
        }}
      >
        <BatchInfo />
        <ProgressInfo />
      </Box>
      <Divider sx={{mb:2}}/>
      <Box sx={{ width: ["100%"] }}>
        <VideoList width="25%" />
      </Box>
    </Container>
  );
};

export const Progress: RouteDefinition = {
  path: "/",
  component: Index,
  icon: Fragment,
  name: "progress",
  key: "progress",
};
