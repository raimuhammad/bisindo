import * as React from "react";
import { GradeModelType } from "@root/models";
import { useApp } from "@providers/app-provider";
import { Provider } from "./provider";
import { Box, Grid, Paper } from "@material-ui/core";
import { CreateForm } from "./create-form";
import { ThreadSwitcher } from "./thread-switcher";
import { DiscussionView } from "./discussion-view";
import { observer } from "mobx-react";

type Props = {
  grade: GradeModelType;
  height: number;
};

export const Wrapper = observer(({ height, grade }: Props) => {
  const app = useApp();
  const user = app.user;
  if (!user) {
    return null;
  }
  return (
    <Provider grade={grade} user={user}>
      <Box style={{ height }}>
        <Box padding={1}>
          <Paper>
            <Box padding={2}>
              <CreateForm openLabel="Buat thread diskusi" closeLabel="Tutup" />
            </Box>
          </Paper>
        </Box>
        <Grid container>
          <Grid item sm={3}>
            <ThreadSwitcher />
          </Grid>
          <Grid item sm={9}>
            <DiscussionView />
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
});
