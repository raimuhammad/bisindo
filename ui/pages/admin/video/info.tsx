import { useVideoPage } from "./provider";
import { VideoPlayer } from "@components/video-player";
import {
  Box,
  Typography,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Theme,
  Button,
} from "@mui/material";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { withVideoPage } from "./provider";

export const Info = withVideoPage(() => {
  const { video } = useVideoPage();
  const push = useNavigate();
  const onBatchClick = ({ id, name }: any) => {
    return () => push(`/classroom/${name}/${id}/videos`);
  };
  const quizPath = `/admin/video/${video?.id}/quiz`;

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <VideoPlayer url={video?.content as string} />
      </Box>
      <Box sx={{ display: "flex", mb: 5 }}>
        <Box sx={{ width: "70%" }}>
          <Box sx={{ p: 2, pl:0, }}>
            <Box
              sx={{
                p: 1,
                border: "solid 1px",
                borderColor: (t: Theme) => t.palette.grey.A400,
                borderRadius: 1,
              }}
            >
              <Typography variant="h5">{video?.title}</Typography>
              <Typography variant="subtitle1">{video?.caption}</Typography>
            </Box>
            <Typography sx={{my:1}} variant="subtitle1">Deskripsi video</Typography>
            <Box
              sx={{
                p: 1,
                border: "solid 1px",
                borderColor: (t: Theme) => t.palette.grey.A400,
                borderRadius: 1,
              }}
            >
              <DraftJsViewer data={video?.description as any} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "30%" }}>
          <Paper sx={{ p: 1, minHeight: 500 }}>
            <Typography sx={{ fontWeight: "bolder" }} variant="caption">
              Jumlah quiz
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="button"
                sx={{
                  cursor: "pointer",
                  display: "block",
                  textTransform: "none",
                }}
              >
                {video?.quiz_count ? `${video.quiz_count} kuis` : "-"}
              </Typography>
              <Button
                to={quizPath}
                sx={{ textTransform: "none" }}
                component={Link}
              >
                {video?.quiz_count ? "Tampilkan quis" : "Buat quis"}
              </Button>
            </Box>
            <Typography sx={{ fontWeight: "bolder" }} variant="caption">
              Batch / Kelas
            </Typography>
            <Divider />
            <List dense>
              {video?.grades.map((item) => (
                <ListItem
                  dense
                  onClick={onBatchClick(item)}
                  sx={{ bgcolor: (t: Theme) => t.palette.grey["200"] }}
                  button
                  key={item.id}
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </div>
  );
});
