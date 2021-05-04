import * as React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { observer } from "mobx-react";
import { pagestore } from "./store";
import { VideoField as Field } from "components/form-fields/video-field";
import { useToggle } from "hooks/use-toggle";
import { Player } from "root/components/player";

const useClasses = makeStyles((theme) => ({
  container: {
    paddingBlock: theme.spacing(2),
  },
}));

export const VideoField = observer(() => {
  const classes = useClasses();
  const [url, setUrl] = React.useState<string>("");
  const [playing, { toggle, inline }] = useToggle();
  const isPlay = playing && pagestore.tab === 0;
  const tab = pagestore.tab;
  React.useEffect(() => {
    if (tab !== 0 && playing) {
      inline(false);
    }
  }, [tab]);
  const MemoizeField = React.useMemo(() => {
    return (
      <Box className={classes.container}>
        <Field onUrlChange={setUrl} name="content" />
      </Box>
    );
  }, []);
  const MemoizePlayer = React.useMemo(() => {
    return (
      <Box bgcolor="black" marginBottom={4} paddingX={4}>
        {url ? (
          <Player url={url} play={isPlay} onContainerClick={toggle} />
        ) : null}
      </Box>
    );
  }, [url, isPlay]);
  return (
    <>
      {MemoizeField}
      {MemoizePlayer}
    </>
  );
});
