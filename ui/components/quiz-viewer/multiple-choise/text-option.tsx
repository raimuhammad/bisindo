import { useMultipleChoice } from "./provider";
import { Typography } from "@mui/material";

const map = ["A", "B", "C", "D"];

export const TextOption = ({ index, content }: any) => {
  const { selected, changeAnswer } = useMultipleChoice();
  return (
    <div
      role="button"
      onClick={() => changeAnswer(index)}
      className="item"
      data-selected={selected === index}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: "bolder" }}>
        Opsi {map[index]}
      </Typography>
      <Typography variant="subtitle1">{content}</Typography>
    </div>
  );
};
