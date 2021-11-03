import * as React from "react";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { StudyProvider } from "@providers/study-provider";
import { Box, Container, Divider, Grid, Theme, Typography, useTheme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useVideoPage } from "@providers/study-provider/provider";
import { useEffect } from "react";
import { useStudent } from "@providers/student-app-provider";
import { Player } from "@components/player";
import { VideoModelType } from "@root/models";
import { DrawerController } from "./drawer-controller";
import { VideoInfo } from "./video-info";
import { VideoSwitcher } from "./video-switcher";
import { QuizList } from "@student-pages/study-show/quiz-list";

const VideoPlayer = ({ model: video }: { model: VideoModelType }) => {
  const { quizes, setPreparedQuiz, pause, play, playing } = useVideoPage();
  const onTimeChange = (currentTime: number) => {
    const toPrepare = quizes.find((item) => {
      return (item.show_at as number) - 5 === currentTime;
    });
    if (toPrepare) {
      setPreparedQuiz(toPrepare);
    }
  };

  return (
    <Box>
      <Player
        onPlaying={onTimeChange}
        url={video.content as string}
        onContainerClick={playing ? pause : play}
        play={playing}
      />
    </Box>
  );
};

const useClasses = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100vh",
    background: theme.palette.primary.dark,
  },
  container: {
    paddingBlock: theme.spacing(4),
  },
  videoTitle: {
    fontWeight: "bolder",
    color: "white",
  },
  videoGrid: {
    overflowX: "auto",
    display: "flex",
    background: "white",
  },
}));

const Page = () => {
  const { video } = useVideoPage();
  const { updateTitle } = useStudent();
  useEffect(() => {
    updateTitle(video.title as string);
  }, []);
  const theme = useTheme();
  const classes = useClasses();
  return (
    <div className={classes.root}>
      <DrawerController />
      <div className={classes.container}>
        <Container>
          <Box marginBottom={2}>
            <Typography className={classes.videoTitle} variant="h4">
              {video.title}
            </Typography>
            <Divider />
          </Box>
          <Grid container>
            <Grid item sm={12}>
              <VideoPlayer model={video} />
            </Grid>
            <Grid style={{ background: "white" }} container item sm={12}>
              <Grid item sm={4}>
                <QuizList />
              </Grid>
              <Grid item sm={8} className={classes.videoGrid}>
                <VideoSwitcher />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Box bgcolor={theme.palette.primary.dark} paddingY={2}>
        <Container>
          <VideoInfo />
        </Container>
      </Box>
    </div>
  );
};

export const Component = ProviderWrapper(StudyProvider, Page);
