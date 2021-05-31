import * as React from "react";
import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { useState } from "react";
import { QuizList } from "./quiz-list";
import { useStudent } from "@providers/student-app-provider";
import { ListContent } from "../study/list-content";
import { VideoModelType } from "@root/models";
import { useNavigate } from "@hooks/use-navigate";

const LabelNode = (model: VideoModelType) => {
  return (
    <Box component="span">
      <Typography component="span">{model.title}</Typography>
    </Box>
  );
};

const VideoList = () => {
  const { videos } = useStudent();
  const { navigateHandler } = useNavigate();
  return (
    <ListContent
      onItemClick={(model) =>
        navigateHandler("/study/:videoId", { videoId: model.id })()
      }
      data={videos}
      getLabel={LabelNode}
      title=""
    />
  );
};

export const Controller = () => {
  const [v, setV] = useState<string>("quiz");

  const ComponentMap: Record<string, React.ComponentType> = {
    video: VideoList,
    quiz: QuizList,
  };

  const Component = ComponentMap[v];

  return (
    <Box color="white">
      <Tabs value={v} onChange={(e, v) => setV(v)}>
        <Tab value="quiz" style={{ color: "inherit" }} label="Quiz" />
        <Tab value="video" style={{ color: "inherit" }} label="Video" />
      </Tabs>
      <Component />
    </Box>
  );
};
