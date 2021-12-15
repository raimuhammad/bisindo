import { Box, Typography, Divider } from "@mui/material";
import { Description } from "@student-pages/video/description";
import { useVideo } from "./provider";

const Info = ({ title, info }: any) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ mr: "auto" }}>{title}</Typography>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="h5" sx={{ fontWeight: "bolder" }}>
        {info}
      </Typography>
    </Box>
  );
};

export const Overview = () => {
  const { video } = useVideo();
  return (
    <div>
      <Box>
        <Box sx={{ py: 3, display: "flex" }}>
          <Box sx={{ width: "40%" }}>
            <Info title="Judul video" info={video.title} />
            <Info title="Jumlah quis" info={video.quiz_count} />
          </Box>
          <Box sx={{ width: "60%" }}>
            <Description />
          </Box>
        </Box>
      </Box>
    </div>
  );
};
