/* eslint-disable */
import * as React from "react";
import { Box, Divider, Paper, Theme, Typography } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

type Props<T = any> = {
  data: Array<T>;
  getLabel(model: T, index: number): React.ReactNode;
  title: string;
  ChilNode?: React.ComponentType<{ model: T }>;
  onItemClick?(model: T): void;
  itemClassname?(model: T, base: string): string;
};
const useClasses = makeStyles((theme: Theme) => ({
  root: {
    position: "relative",
    textAlign: "left",
    justifyContent: "start",
    backgroundColor: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey.A100,
    },
  },
  progress: {
    width: "100%",
    bottom: 0,
  },
}));
export const ListContent = ({
  data,
  title,
  ChilNode,
  getLabel,
  onItemClick,
  itemClassname,
}: Props) => {
  const classes = useClasses();
  return (
    <>
      <Box padding={1}>
        <Typography variant="h6">{title}</Typography>
        <Divider />
      </Box>
      {data.map((item, index) => (
        <Box padding={1} marginBottom={1} key={item.id}>
          <Paper
            onClick={() => {
              if (onItemClick) {
                return onItemClick(item);
              }
            }}
            // @ts-ignore
            className={
              itemClassname
                ? `${itemClassname(item, classes.root)}`
                : classes.root
            }
          >
            <Box padding={1}>
              <Typography>{getLabel(item, index)}</Typography>
            </Box>
            {ChilNode ? <ChilNode model={item} /> : null}
          </Paper>
        </Box>
      ))}
    </>
  );
};
