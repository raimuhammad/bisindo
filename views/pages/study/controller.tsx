import * as React from "react";
import { Tabs, Tab, makeStyles } from "@material-ui/core";
import { useStudyPage } from "./provider";

const useClasses = makeStyles(() => ({
  root: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: "white",
  },
}));

export const Controller = () => {
  const { active, handleChangeTab, tabs: items } = useStudyPage();
  const classes = useClasses();
  return (
    <div className={classes.root}>
      <Tabs indicatorColor="primary" value={active} onChange={handleChangeTab}>
        {items.map((item) => (
          <Tab value={item.key} {...item} />
        ))}
      </Tabs>
    </div>
  );
};
