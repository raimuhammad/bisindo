import * as React from "react";
import { observer } from "mobx-react";
import { useVideoPageList } from "./page-properties";
import { Drawer, makeStyles } from "@material-ui/core";
import { DraftJsViewer } from "components/draft-js-viewer";

const useClasses = makeStyles(() => ({
  root: {},
  paper: {
    width: "50vw",
  },
}));

export const DescriptionViewer = observer(() => {
  const instance = useVideoPageList();
  const classes = useClasses();
  return (
    <Drawer
      PaperProps={{ className: classes.paper }}
      onClose={() => instance.detach()}
      open={Boolean(instance.selected)}
      anchor="right"
    >
      <DraftJsViewer
        data={
          instance.selected?.description ??
          JSON.stringify({
            blocks: [],
          })
        }
      />
    </Drawer>
  );
});
