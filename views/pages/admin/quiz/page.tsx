import * as React from "react";
import { Wrapper } from "@service-provider/quiz/paginator-provider";
import { Grid, Paper } from "@material-ui/core";
import { useLayout } from "@root/layout";
import { QuizPreview } from "./viewer";
import { SideBar } from "./side-bar";
import { Provider } from "./provider";

const Node = () => {
  const { getContentHeight } = useLayout();
  return (
    <Provider>
      <Grid container>
        <Grid
          style={{ height: getContentHeight(0) }}
          component={Paper}
          item
          sm={12}
          md={3}
        >
          <SideBar />
        </Grid>
        <Grid
          style={{ height: getContentHeight(0), overflow: "auto" }}
          item
          sm={12}
          md={9}
        >
          <QuizPreview />
        </Grid>
      </Grid>
    </Provider>
  );
};

export const Page = Wrapper(Node);
