import { Fragment, useEffect } from "react";
import { useLayout } from "@layout/layout-provider";
import { Button, Container, Box, Typography } from "@mui/material";
import { useVideoPageProvider, Context } from "./provider";
import { VideoContainer } from "./video-container";
import { ScreenLoading } from "@components/screen-loading";
import { observer } from "mobx-react";
import { QuizBar } from "./quiz-bar";
import { QuizContainer } from "./quiz-container";
import { Header } from "./header";
import { Description } from "./description";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { VideoList } from "../progress/video-list";
import { RootStoreType, useQuery } from "@root/models";
import { useToggle } from "@hooks/use-toggle";
import { QuizListInfo } from "@components/quiz-list-info";
import { useStudent } from "@providers/student-contexts";

const Index = observer(() => {
  const { updateNavs } = useLayout();
  useEffect(() => {
    updateNavs([]);
  }, []);
  const ctx = useVideoPageProvider();
  const { store } = useQuery();
  const [loading, { inline }] = useToggle();
  const navigate = useNavigate();
  const onVideoChange = (video: any) => {
    const playerRef = ctx.videoUtilities.playerRef
      .current as HTMLVmPlayerElement;
    if (playerRef && ctx.video) {
      const args = {
        videoId: ctx.video.id,
        play: playerRef.currentTime,
      };
      inline(true);
      (store as RootStoreType)
        .mutateUpdateVideoProgress(args)
        .currentPromise()
        .then(() => {
          inline(false);
          navigate(`/video/${video.id}`);
        })
        .catch(() => {
          inline(false);
          navigate(`/video/${video.id}`);
        });
    }
  };
  const {
    progressInfo: { quizHistory },
  } = useStudent();

  return ctx.showLoading ? (
    <ScreenLoading />
  ) : (
    <Container>
      {loading ? <ScreenLoading /> : null}
      <Context.Provider value={ctx}>
        <Button
          onClick={() => navigate("/")}
          size="small"
          variant="outlined"
          sx={{ my: 1 }}
          startIcon={<ArrowBack />}
        >
          Kembali ke dashboard
        </Button>
        <Header />
        <QuizBar />
        <QuizContainer />
        <VideoContainer />
        <Box sx={{ display: ["block", "flex"] }}>
          <Box sx={{ width: ["100%", "30%"] }}>
            <Box sx={{ pt: 2, mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bolder" }}>
                Progress quis
              </Typography>
              <QuizListInfo
                history={quizHistory}
                quizes={ctx.video.quizes ?? []}
              />
            </Box>
          </Box>
          <Box sx={{ width: ["100%", "70%"] }}>
            <Description />
          </Box>
        </Box>
        <Box sx={{ mb: 3 }}>
          <VideoList
            exluded={[ctx.video.id]}
            onItemClick={onVideoChange}
            width="33%"
          />
        </Box>
      </Context.Provider>
    </Container>
  );
});
export const StudentVideo: RouteDefinition = {
  component: Index,
  path: "/video/:id",
  name: "video-student",
  icon: Fragment,
  key: "video-student",
};
