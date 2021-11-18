import type { RouteComponentProps } from "react-router-dom";
import { ScreenLoading } from "@components/screen-loading";
import { observer } from "mobx-react";
import { AnimatePresence, motion } from "framer-motion";
import { PageBanner } from "@components/page-banner";
import { Context, useBatchShowProvider, useBatchShow } from "./context";
import { LinearProgress } from "@mui/material";
import { PageControl } from "./page-control";
import { ContentSwitcher } from "./content-switcher";
import { List } from "@providers/model-provider/lists";

const Content = () => {
  const { model, progress } = useBatchShow();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1.7,
        },
      }}
    >
      <PageBanner title={model.name as string} subtitle="">
        <PageControl />
        {progress ? (
          <LinearProgress
            variant="indeterminate"
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          />
        ) : null}
      </PageBanner>
      <ContentSwitcher />
    </motion.div>
  );
};

export const BatchShow = observer(
  (location: RouteComponentProps<{ id: string; slug: string }>) => {
    const context = useBatchShowProvider(location);
    return (
      <Context.Provider value={context}>
        <List
          dataKey="videoByGrade"
          props={{ gradeId: location.match.params.id }}
        >
          <AnimatePresence exitBeforeEnter initial={false}>
            {context.showpage ? <Content /> : <ScreenLoading />}
          </AnimatePresence>
        </List>
      </Context.Provider>
    );
  }
);
