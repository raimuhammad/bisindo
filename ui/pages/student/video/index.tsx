import { Fragment, useEffect, useState } from "react";
import { useLayout } from "@layout/layout-provider";
import { Button, Container, Box, Tabs, Tab, Divider } from "@mui/material";
import {
  useVideoPageProvider,
  Context,
  useUpdateVideoProgress,
} from "./provider";
import { VideoContainer } from "./video-container";
import { ScreenLoading } from "@components/screen-loading";
import { observer } from "mobx-react";
import { QuizContainer } from "./quiz-container";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { VideoList } from "../progress/video-list";
import { useToggle } from "@hooks/use-toggle";
import { useStudent } from "@providers/student-contexts";
import { Overview } from "@student-pages/video/overview";
import { QuizInfo } from "@student-pages/video/quiz-info";
import { AnimatePresence, motion } from "framer-motion";

const components = [Overview, QuizInfo];

const Index = observer(() => {
  const { updateNavs } = useLayout();
  useEffect(() => {
    updateNavs([]);
  }, []);
  const ctx = useVideoPageProvider();
  const [tab, setTab] = useState<number>(0);
  const [loading, { inline }] = useToggle();
  const navigate = useNavigate();
  const handleVideoChange = useUpdateVideoProgress(
    ctx.videoUtilities.playerRef.current as HTMLVmPlayerElement
  );
  const onVideoChange = (video: any) => {
    const playerRef = ctx.videoUtilities.playerRef
      .current as HTMLVmPlayerElement;
    if (playerRef) {
      inline(true);
      handleVideoChange(video, playerRef.currentTime)
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
  const Component = components[tab];

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
        <QuizContainer />
        <Box sx={{ display: ["block", "flex"] }}>
          <Box sx={{ width: ["100%", "70%"] }}>
            <VideoContainer />
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab value={0} label="Overview" />
              <Tab value={1} label="Quis" />
              <Tab
                value={2}
                label="Video lainya"
                sx={{ display: ["block", "none"] }}
              />
            </Tabs>
            <Divider />
            <AnimatePresence exitBeforeEnter>
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                key={tab}
              >
                <Component />
              </motion.div>
            </AnimatePresence>
          </Box>
          <Box sx={{ width: [0, "30%"] }}>
            <Box sx={{ px: 1 }}>
              <VideoList selected={ctx.video} />
            </Box>
          </Box>
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
