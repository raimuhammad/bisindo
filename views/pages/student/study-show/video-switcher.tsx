/* eslint-disable */
import * as React from "react";
import { useState } from "react";
import { useStudent } from "@providers/student-app-provider";
import {Box, Button, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import { FormField } from "@components/form-field/form-field";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { ArrowBack } from "@material-ui/icons";

type Props = {
  height: number;
};

export const VideoSwitcher = ({ height }: Props) => {
  const [search, setSearch] = useState<string>("");

  const { videos } = useStudent();

  const items = search
    ? videos.filter((item) => {
        return (item.title as string)
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    : videos;

  const { nodeRef, dimension } = useNodeDimension();
  const listHeight = height - dimension.height;
  return (
    <Box display='flex' bgcolor="white" height={height} overflow="hidden">
      {
        items.map(item=>(
          <Box key={item.id} width='256px'>
            <Typography>
              {item.title}
            </Typography>
          </Box>
        ))
      }
    </Box>
  );
};
