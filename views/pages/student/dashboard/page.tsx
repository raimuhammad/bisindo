import * as React from "react";
import { Welcome } from "./welcome";
import { Controller } from "./controller";
import { Box, Container } from "@material-ui/core";
import { observer } from "mobx-react";
import { VideoContainer } from "./video-container";
import { DiscussionContainer } from "./discussion-container";
import { pageStore } from "./store";

const cMap: Record<string, React.ComponentType> = {
  video: VideoContainer,
  discussion: DiscussionContainer,
};

export const Page = observer(() => {
  const Node = cMap[pageStore.tab] ?? React.Fragment;

  return (
    <Box minHeight="100vh">
      <Welcome />
      <Controller />
      <Container>
        <Node />
      </Container>
    </Box>
  );
});
