import * as React from "react";
import { useStudent } from "@providers/student-app-provider";
import { Box, Grid } from "@mui/material";
import { VideoList } from "./video-list";
import { QuizList } from "./quiz-list";
import { useStudentLayout } from "@root/layout";

const Node = () => {
  const { updateTitle } = useStudent();

  React.useEffect(() => {
    updateTitle("Belajar");
  }, []);
  const { pageHeight } = useStudentLayout();
  return (
    <Box height={pageHeight} overflow="auto">
      <Grid container>
        <Grid item sm={12} md={3}>
          <VideoList />
        </Grid>
        <Grid item sm={12} md={3}>
          <QuizList />
        </Grid>
      </Grid>
    </Box>
  );
};

export const Page = Node;
