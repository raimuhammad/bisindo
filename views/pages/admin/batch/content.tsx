import * as React from "react";
import type { GradeModelType } from "@models/GradeModel";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { usePaginatorContext } from "@hooks/use-paginator";
import { useStore } from "./provider";
import { useNavigate } from "@hooks/use-navigate";

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    "& > .item": {
      width: { sm: "100%", lg: "49%" },
      paddingY: 2,
    },
  },
  contentItems: {
    root: {
      position: "relative",
      display: "flex",
      borderRadius: 4,
      padding: 3,
      "& button": {
        textTransform: "capitalize",
      },
    },
    infoContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    controlContainer: {
      width: "30%",
      bgcolor: "secondary.light",
      borderRadius: 4,
      padding: 2,
      "& button": {
        marginY: 2,
        borderRadius: 2,
      },
    },
    container: {
      padding: 2,
      width: "70%",
    },
  },
};

const ContentItem = ({ model }: { model: GradeModelType }) => {
  const { setSelected } = useStore();
  const { navigateHandler } = useNavigate();
  const css = styles.contentItems;
  return (
    <Paper sx={css.root as any}>
      <Box sx={css.container} padding={2} width="70%">
        <Typography sx={{ marginBottom: 1 }} variant="h2">
          {model.name}
        </Typography>
        <Divider />
        <Box sx={css.infoContainer}>
          <Typography variant="body2">{model.student_count} siswa</Typography>
          <Typography variant="body2">{model.video_count} video</Typography>
        </Box>
      </Box>
      <Paper elevation={4} sx={css.controlContainer}>
        <Box>
          <Button
            onClick={navigateHandler("/batch/:id", { id: model.id })}
            fullWidth
            variant="contained"
          >
            Detail
          </Button>
          <Button
            onClick={() => setSelected(model)}
            fullWidth
            variant="contained"
          >
            Ganti nama
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
};

export const Content = () => {
  const { data } = usePaginatorContext() as BatchPaginator;
  const css = styles.container;
  return (
    <Box sx={css as any}>
      {data.map((item) => {
        return (
          <Box className="item" key={item.id}>
            <ContentItem model={item} />
          </Box>
        );
      })}
    </Box>
  );
};
