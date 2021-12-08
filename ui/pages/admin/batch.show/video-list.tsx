import { useList } from "@providers/model-provider/lists";
import { VideoModelType } from "@root/models";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigation } from "@hooks/use-navigation";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { WithBatchShow } from "./with-batch-show";
import { useNavigate } from "react-router-dom";
import { useBatchShow } from "@admin-pages/batch.show/context";

const VideoCard = ({ model }: { model: VideoModelType }) => {
  const push = useNavigate();
  const { model: batch } = useBatchShow();
  const navigate = () =>
    push(`/admin/video/${model.id}/info`, {
      state: {
        backurl: {
          url :`/classroom/${batch.name}/${batch.id}/videos`,
          label : `Manage ke kelas ${batch.name}`
        },
      },
    });
  return (
    <Paper sx={{ mb: 2 }}>
      <Grid container>
        <Grid item sm={12} md={2}>
          <Box
            component="img"
            src={model.thumbnail}
            sx={{ width: "100%", height: "100%" }}
          />
        </Grid>
        <Grid item sm={12} md={8}>
          <Box sx={{ p: 1 }}>
            <Typography variant="h4">{model.title}</Typography>
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={2}
          sx={{ display: "flex", alignItems: "center", p: 2 }}
        >
          <Button onClick={navigate} fullWidth>
            Manage video
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const VideoList = WithBatchShow(
  observer(() => {
    const { data, fetch } = useList<VideoModelType>();

    useEffect(() => {
      fetch();
    }, []);

    return (
      <Box sx={{ py: 5 }}>
        {data.map((item) => (
          <VideoCard model={item} key={item.id} />
        ))}
      </Box>
    );
  })
);
