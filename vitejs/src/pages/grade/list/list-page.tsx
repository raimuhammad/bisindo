import * as React from "react";
import { Box } from "@material-ui/core";
import { PageLayout } from "components/page-layout";
import {
  ListContext,
  useGradeListPageProvider,
  useListPage,
} from "../shared/providers";
import { observer } from "mobx-react";
import { Card } from "./card";
import { Create } from "./create";

const El = observer(() => {
  const { data, fetch } = useListPage();

  React.useEffect(() => {
    fetch();
  }, []);

  return (
    <PageLayout customButton={<Create onSuccess={fetch} />} pageTitle="Batch">
      <Box display="flex" flexWrap="wrap" marginY={2}>
        {!data
          ? null
          : data.map((item) => (
              <Box marginRight={2} marginBottom={2} key={item.id} width="30%">
                <Card grade={item} />
              </Box>
            ))}
      </Box>
    </PageLayout>
  );
});

export const ListPage = observer(() => {
  const states = useGradeListPageProvider();
  return (
    <ListContext.Provider value={states}>
      <El />
    </ListContext.Provider>
  );
});
