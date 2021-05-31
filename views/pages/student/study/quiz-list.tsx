import * as React from "react";
import { useStudent } from "@providers/student-app-provider";
import { useStudentLayout } from "@root/layout";
import { ListContent } from "./list-content";
import { QuizModelType } from "@root/models";

export const QuizList = () => {
  const { quizes } = useStudent();
  const { pageHeight } = useStudentLayout();
  return (
    <ListContent
      data={quizes}
      getLabel={(quiz: QuizModelType, index) => {
        return `Quis ${index + 1}`;
      }}
      title="Quiz"
    />
  );
};
