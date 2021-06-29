import { VideoModelType } from "@root/models";
import { useStore } from "@pages/admin/batch-show/provider";
import { useToggle } from "@hooks/use-toggle";
import * as React from "react";
import { Player } from "@components/player";
import { Box, Button, ButtonGroup, Paper, Typography } from "@material-ui/core";
import { DraftJsViewer } from "@components/draft-js-viewer";
import { useAction } from "./utils";
import { useNavigate } from "@hooks/use-navigate";
import { useContentPaginator } from "@service-provider/content";

const Surface = ({ children }: any) => {
  return (
    <Box marginBottom={2}>
      <Paper>
        <Box padding={1}>{children}</Box>
      </Paper>
    </Box>
  );
};

const ActionController = () => {
  const { handleDelete, handleEdit } = useAction();
  const { navigateHandler } = useNavigate();
  const { selected } = useContentPaginator();
  return (
    <ButtonGroup>
      <Button
        onClick={navigateHandler("/quiz/:videoId/check", {
          videoId: selected ? selected.id : "",
        })}
      >
        Periksa quis
      </Button>
      <Button
        onClick={navigateHandler("/quiz/:videoId", {
          videoId: selected ? selected.id : "",
        })}
      >
        Quis
      </Button>
      <Button onClick={handleEdit}>Edit informasi video</Button>
      <Button onClick={handleDelete}>Hapus video</Button>
    </ButtonGroup>
  );
};

export const VideoContainer = ({ model }: { model: VideoModelType }) => {
  const { contentHeight } = useStore();
  const [playing, { toggle, inline }] = useToggle();

  React.useEffect(() => {
    inline(false);
  }, [model]);

  return (
    <div style={{ minHeight: contentHeight + 10 }}>
      <div style={{ backgroundColor: "black" }}>
        <Player
          url={model.content as string}
          onContainerClick={toggle}
          play={playing}
        />
      </div>
      <Box padding={2}>
        <Surface>
          <Box display="flex" alignItems="center">
            <Box flex={1}>
              <Typography color="textSecondary">Menagemen video</Typography>
            </Box>
            <ActionController />
          </Box>
        </Surface>
        <Surface>
          <Typography variant="h4">{model.title}</Typography>
          <Typography variant="subtitle2">{model.caption}</Typography>
        </Surface>
        <Surface>
          <DraftJsViewer data={model.description as string} />
        </Surface>
      </Box>
    </div>
  );
};
