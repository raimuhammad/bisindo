import { Fragment, useEffect } from "react";
import { useLayout } from "@layout/layout-provider";
import { Button, Container, Box } from "@mui/material";
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

const Index = observer(() => {
  const { updateNavs } = useLayout();
  useEffect(() => {
    updateNavs([]);
  }, []);
  const ctx = useVideoPageProvider();
  const navigate = useNavigate();

  return ctx.showLoading ? (
    <ScreenLoading />
  ) : (
    <Container>
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
        <Description />
        <Box sx={{mb:3}}>
          <VideoList width='33%' />
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
