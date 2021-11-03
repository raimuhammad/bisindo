import * as React from "react";
import { AppBar, Box, Container, Tab, Tabs } from "@mui/material";
import { observer } from "mobx-react";
import { pageStore } from "./store";

export const Controller = observer(() => {
  return (
    <AppBar position="static" style={{ background: "white", color: "black" }}>
      <Container>
        <Tabs
          value={pageStore.tab}
          onChange={(e: any, v: any) => pageStore.changeTab(v)}
        >
          <Tab value="video" label="Video pembelajaran" />
          <Tab value="discussion" label="Ruang diskusi" />
        </Tabs>
      </Container>
    </AppBar>
  );
});
