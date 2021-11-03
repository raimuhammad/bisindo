/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useStudent } from "@providers/student-app-provider";
import * as React from "react";
import { ListContent } from "./list-content";
import { VideoModelType } from "@root/models";
import { Box, LinearProgress } from "@mui/material";
import { useNavigate } from "@hooks/use-navigate";

const Percentage = ({ model }: { model: VideoModelType }) => {
  const { getVideoPercentage } = useStudent();
  return (
    <Box position="absolute" bottom={0} width="100%">
      <LinearProgress
        value={getVideoPercentage(model) * 100}
        variant="determinate"
      />
    </Box>
  );
};

export const VideoList = () => {
  const { videos } = useStudent();
  const { navigateHandler } = useNavigate();
  const handleClick = (model: VideoModelType) => {
    navigateHandler("/study/:videoId", { videoId: model.id })();
  };

  return (
    <ListContent
      onItemClick={handleClick}
      data={videos}
      getLabel={(video: VideoModelType) => video.title as string}
      title="Video pelajaran"
      ChilNode={Percentage}
    />
  );
};
