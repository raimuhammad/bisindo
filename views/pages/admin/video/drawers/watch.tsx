import * as React from "react";
import { useStore } from "../provider";
import { Player } from "@components/player";
import { useToggle } from "@hooks/use-toggle";
import { Box, Paper, Typography } from "@material-ui/core";
import { DraftJsViewer } from "@components/draft-js-viewer";

const ContentContainer = ({ children }: any) => {
  return (
    <Box margin={2}>
      <Paper>
        <Box padding={1}>{children}</Box>
      </Paper>
    </Box>
  );
};

export const Watch = () => {
  const { selected } = useStore();
  const [playing, { toggle }] = useToggle();
  if (!selected) {
    return <></>;
  }
  return (
    <>
      <Box bgcolor="black" padding={2}>
        <Player
          url={selected.content as string}
          onContainerClick={toggle}
          play={playing}
        />
      </Box>
      <ContentContainer>
        <Typography variant="h6">{selected.title}</Typography>
        <Typography variant="subtitle1">{selected.caption}</Typography>
      </ContentContainer>
      <ContentContainer>
        <Typography variant="h6">Deskripsi</Typography>
        <DraftJsViewer data={selected.description as string} />
      </ContentContainer>
    </>
  );
};
