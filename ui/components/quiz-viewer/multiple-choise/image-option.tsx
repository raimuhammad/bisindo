import { Option, useMultipleChoice } from "./provider";
import { Box, Typography } from "@mui/material";

const map = ["A", "B", "C", "D"];

export const ImageOption = ({ index, content }: any) => {
  const { selected, changeAnswer } = useMultipleChoice();
  console.log(content);
  return (
    <Box
      role="button"
      onClick={() => changeAnswer(index)}
      className="item"
      data-selected={selected === index}
    >
      <Box
        sx={{
          height: 100,
          width: "100%",
          backgroundImage: `url(${content})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
      <Typography align='center' variant="h2">{map[index]}</Typography>
      {/*<Box sx={{width: "100%"}} component="img" src={content} />*/}
    </Box>
  );
};
