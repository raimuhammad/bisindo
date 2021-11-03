import * as React from "react";
import { Wrapper } from "@components/discussion-wrapper/wrapper";
import { useStudent } from "@providers/student-app-provider";
import {Box} from "@mui/material";

export const DiscussionContainer = () => {
  const { grade } = useStudent();
  return (
    <Box marginTop={2}>
      <Wrapper grade={grade} height={(80 * 100) / window.innerHeight} />
    </Box>
  );
};
