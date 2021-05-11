import { Paper, Box, Typography, Button, ButtonGroup } from "@material-ui/core";
import * as React from "react";
import { GradeModelType } from "root/models/stores";
import { useGradePage, Action } from "./provider";
import { useNavigate } from "hooks/use-navigate";

type Props = {
  model: GradeModelType;
};

const buttonMap: Array<{ label: string; action: Action }> = [
  { label: "Detail", action: "students" },
];

export const GradeCard = ({ model }: Props) => {
  const { handleAction } = useGradePage();
  const handler = (action: Action) => {
    return () => handleAction(model, action);
  };
  const { navigateHandler } = useNavigate();

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h4">{model.name}</Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography>Jumlah siswa</Typography>
          <Typography>{model.student_count} siswa</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Jumlah konten video</Typography>
          <Typography>{model.video_count} video</Typography>
        </Box>
      </Box>
      <Box padding={1}>
        <Button
          fullWidth
          variant="outlined"
          onClick={navigateHandler(`/grade/${model.id}`)}
        >
          Detail
        </Button>
      </Box>
    </Paper>
  );
};
