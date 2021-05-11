import * as React from "react";
import { observer } from "mobx-react";
import { PageLayout } from "components/page-layout";
import { Wrap, useGradePage } from "./provider";
import { Box, Button } from "@material-ui/core";
import { GradeCard } from "./grade-card";
import { GradeForm } from "./grade-form";

const El = observer(() => {
  const { data, handleAction } = useGradePage();
  return (
    <PageLayout
      customButton={
        <Button onClick={() => handleAction(null, "create")}>
          Tambah jenjang baru
        </Button>
      }
      pageTitle="Jenjang"
    >
      <GradeForm />
      <Box display="flex" marginBottom={5} marginTop={1} flexWrap="wrap">
        {data.map((item) => (
          <Box marginRight={2} marginBottom={2} width="30%" key={item.id}>
            <GradeCard model={item} />
          </Box>
        ))}
      </Box>
    </PageLayout>
  );
});

export const Page = Wrap(El);
