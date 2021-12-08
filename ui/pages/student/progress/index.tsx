import { Fragment } from "react";
import { useStudentNavs } from "@layout/student";
import { useStudent } from "@providers/student-contexts";
import { Box, Container, Divider, Theme, Typography } from "@mui/material";
import { VideoList } from "./video-list";

const Index = () => {
  useStudentNavs([]);
  const {
    gradeInfo: { studentGrade },
  } = useStudent();
  console.log(studentGrade);
  return (
    <Container sx={{ py: 2, display: "flex", flexWrap: "wrap" }}>
      <Box sx={{ width: ["100%", "30%"], p :2 }}>
        <Typography variant="h6" sx={{ fontWeight: "lighter" }}>
          Kelas / batch
        </Typography>
        <Divider />
        <Typography
          sx={{ color: (t: Theme) => t.palette.grey["700"] }}
          variant="h4"
        >
          {studentGrade.grade.name}
        </Typography>
      </Box>
      <Box sx={{ width: ["100%", '70%'] }}>
        <VideoList />
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
