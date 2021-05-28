import * as React from "react";
import { GradeModelType } from "@root/models";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { usePaginatorContext } from "@hooks/use-paginator";
import { useToggle } from "@hooks/use-toggle";
import { Edit } from "@material-ui/icons";
import { useStore } from "./provider";
import { useNavigate } from "@hooks/use-navigate";

const ContentItem = ({ model }: { model: GradeModelType }) => {
  const theme = useTheme();
  const [mouseEnter, { force }] = useToggle();
  const { setSelected } = useStore();
  const { navigateHandler } = useNavigate();
  return (
    <Paper
      onMouseEnter={force(true)}
      onMouseLeave={force(false)}
      elevation={3}
      style={{ position: "relative" }}
    >
      <Box
        display={mouseEnter ? "block" : "none"}
        position="absolute"
        top=".5rem"
        right=".5rem"
      >
        <IconButton size="small" onClick={() => setSelected(model)}>
          <Edit />
        </IconButton>
      </Box>
      <Box padding={2}>
        <Typography variant="h5">{model.name}</Typography>
      </Box>
      <Box bgcolor={theme.palette.primary.light} color="white" display="flex">
        <Button
          onClick={navigateHandler("/batch/:id", { id: model.id })}
          color="inherit"
          fullWidth
        >
          Detail
        </Button>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="body2">{model.student_count} siswa</Typography>
        </Box>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {model.video_count} video
        </Box>
      </Box>
    </Paper>
  );
};

export const Content = () => {
  const { data } = usePaginatorContext() as BatchPaginator;
  return (
    <Grid container>
      {data.map((item) => (
        <Grid item lg={4} md={6} sm={12} key={item.id}>
          <Box marginBottom={2} margin={2}>
            <ContentItem model={item} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
