import { Box, Button, Divider } from "@mui/material";
import { useVideo } from "./provider";

export const QuizBar = () => {
  const {
    video,
    quiz: { handleOpen },
  } = useVideo();
  const quizes = video.quizes;
  return (
    <Box sx={{ pb: 2 }}>
      <Divider/>
      {quizes.map((item, index) => (
        <Button
          onClick={handleOpen(item)}
          sx={{ textTransform: "none" }}
          key={item.id}
        >
          Quis {index + 1}
        </Button>
      ))}
      <Divider/>

    </Box>
  );
};
