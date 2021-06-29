/* eslint-disable */
import * as React from "react";
import { useState } from "react";
import { useStudent } from "@providers/student-app-provider";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@material-ui/core";
import { FormField } from "@components/form-field/form-field";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "@hooks/use-navigate";

export const VideoSwitcher = () => {
  const [search, setSearch] = useState<string>("");

  const { videos } = useStudent();

  const items = search
    ? videos.filter((item) => {
        return (item.title as string)
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    : videos;
  const { navigateHandler } = useNavigate();

  return (
    <Box flexWrap="wrap" width="100%" overflow="hidden" display="flex">
      {items.map((item) => (
        <Box
          onClick={navigateHandler("/study/:videoId", { videoId: item.id })}
          width="25%"
          style={{ cursor: "pointer" }}
          role="button"
          key={item.id}
        >
          <Box position="relative" padding={1}>
            <img
              src={item.thumbnail}
              style={{ width: "100%", borderRadius: 4 }}
              alt=""
            />
            <Typography>{item.title}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
