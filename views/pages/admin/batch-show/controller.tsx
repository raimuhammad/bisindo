import * as React from "react";
import { Box, Tab, Tabs } from "@material-ui/core";
import { useStore } from "./provider";

export const Controller = () => {
  const { activeTab, changeTab, controllerRef } = useStore();
  return (
    <Box
      display="flex"
      flexDirection="column"
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      ref={controllerRef}
      component="div"
      marginLeft="auto"
    >
      <Tabs value={activeTab} onChange={(e: any, c: any) => changeTab(c)}>
        <Tab label="Video" value="VIDEO" />
        <Tab label="Tambah video" value="VIDEO-ADD" />
        <Tab label="Siswa" value="STUDENT" />
        <Tab label="Diskusi" value="DISCUSSION" />
      </Tabs>
    </Box>
  );
};
