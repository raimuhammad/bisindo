import type { ComponentType } from "react";
import { useBatchShow } from "./context";
import { Container } from "@mui/material";
import { VideoList } from "./video-list";
import { AddVideo } from "./add-video";
import { QuizCheck } from "./quiz-check";
import { Discussion } from "./discussion";
import { StudentList } from "./student-list";
import { AdminPageContent } from "@components/admin-page-content";

const ComponentMap: Record<string, ComponentType<any>> = {
  VIDEOS: VideoList,
  "ADD-VIDEO": AddVideo,
  STUDENTS: StudentList,
  "QUIZ-CHECK": QuizCheck,
  DISCUSSION: Discussion,
};

export const ContentSwitcher = () => {
  const control = useBatchShow().pageControll;
  return (
    <Container sx={{ overflowX: "hidden" }}>
      <AdminPageContent views={ComponentMap} control={control} />
    </Container>
  );
};
