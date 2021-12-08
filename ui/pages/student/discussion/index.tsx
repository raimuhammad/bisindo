import { Fragment } from "react";
import { useStudentNavs } from "@layout/student";
import { DiscussionContainer } from "@components/discussion/discussion-container";
import { useStudent } from "@providers/student-contexts";
import { Container } from "@mui/material";

const Index = () => {
  useStudentNavs([]);
  const { gradeInfo } = useStudent();
  return (
    <Container>
      <DiscussionContainer gradeId={gradeInfo.studentGrade.grade.id} />;
    </Container>
  );
};

export const Discussion: RouteDefinition = {
  component: Index,
  icon: Fragment,
  path: "/discussion",
  name: "discussion",
  key: "discussion",
};
