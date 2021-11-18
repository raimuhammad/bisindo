import { useList } from "@providers/model-provider/lists";
import { VideoModelType } from "@root/models";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

const VideoCard = ({ model }: { model: VideoModelType }) => {
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
        <Grid item sm={12} md={2} sx={{display: "flex", alignItems:"center", p:2}}>
          <Button fullWidth>Manage video</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const VideoList = () => {
  const { data } = useList<VideoModelType>();

  return (
    <Box sx={{ py: 5 }}>
      {data.map((item) => (
        <VideoCard model={item} key={item.id} />
      ))}
    </Box>
  );
};
