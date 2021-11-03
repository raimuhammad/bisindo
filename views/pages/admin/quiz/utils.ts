import { Theme } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { useState } from "react";

export const useClasses = makeStyles((theme: Theme) => ({
  img: {
    maxHeight: 144,
    maxWidth: 256,
    boxShadow: theme.shadows[2],
    transition: "all ease .3s",
    ...theme.shape,
  },
  container: {
    cursor: "pointer",
    "&:hover": {
      "& > img": {
        boxShadow: theme.shadows[4],
      },
    },
    "& > h4": {
      transition: "all ease .3s",
    },
  },
}));

export function useMultipleChouse() {
  const [answer, setAnswer] = useState<number>(-1);
  return {
    answer,
    setAnswer,
  };
}
