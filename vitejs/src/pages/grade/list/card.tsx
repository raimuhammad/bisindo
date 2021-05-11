import * as React from "react";
import { GradeModelType } from "root/models/stores";
import { Button, Paper, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useNavigate } from "hooks/use-navigate";

type Props = {
  grade: GradeModelType;
};

export const Card = ({ grade }: Props) => {
  const { navigateHandler } = useNavigate();

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h5">{grade.name}</Typography>
      </Box>
      <Box p={1}>
        <Button
          onClick={navigateHandler(`/grade/${grade.id}`)}
          variant="outlined"
          fullWidth
        >
          Detail
        </Button>
      </Box>
    </Paper>
  );
};
