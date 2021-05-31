import * as React from "react";
import { ProviderWrapper } from "@utils/provider-wrapper";
import { StudyProvider } from "@providers/study-provider";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@material-ui/core";
import { useVideoPage } from "@providers/study-provider/provider";
import { useEffect } from "react";
import { useStudent } from "@providers/student-app-provider";
import { Player } from "@components/player";
import { VideoModelType } from "@root/models";
import { DrawerController } from "./drawer-controller";
import { Controller } from "./controller";
import { VideoInfo } from "./video-info";

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

const Page = () => {
  const { video } = useVideoPage();
  const { updateTitle } = useStudent();
  useEffect(() => {
    updateTitle(video.title as string);
  }, []);
  const theme = useTheme();
  return (
    <>
      <DrawerController />
      <Box paddingY={4} bgcolor={theme.palette.primary.dark}>
        <Container>
          <Box marginBottom={2}>
            <Typography
              style={{ color: "white", fontWeight: "bolder" }}
              variant="h4"
            >
              {video.title}
            </Typography>
            <Divider />
          </Box>
          <Grid container>
            <Grid item sm={12} md={8}>
              <VideoPlayer model={video} />
            </Grid>
            <Grid item md={4} sm={12}>
              <Controller />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box marginTop={2}>
        <Container>
          <VideoInfo />
        </Container>
      </Box>
    </>
  );
};

export const Component = ProviderWrapper(StudyProvider, Page);
