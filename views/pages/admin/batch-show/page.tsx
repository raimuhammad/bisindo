import * as React from "react";
import { observer } from "mobx-react";
import { Provider, useStore } from "./provider";
import { AppBar, Box, IconButton, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { useNavigate } from "@hooks/use-navigate";
import { Controller } from "./controller";
import { TABS } from "./provider";
import { Content } from "./content";
import { Student } from "./student";
import { Discussion } from "./discussion";
import { CreateVideo } from "./create-video";
import { FormProvider } from "@service-provider/content";

const FormWrapper = FormProvider(CreateVideo);

const Form = () => {
  const { model } = useStore();
  return <FormWrapper grade={model} />;
};

const CMAP: Record<TABS, React.ComponentType> = {
  VIDEO: Content,
  STUDENT: Student,
  DISCUSSION: Discussion,
  "VIDEO-ADD": Form,
};

const BatchShow = observer(() => {
  const { model, activeTab } = useStore();
  const { navigateHandler } = useNavigate();
  const CHILD = CMAP[activeTab];
  return (
    <>
      <AppBar position="relative">
        <Box display="flex" alignItems="center" paddingX={2}>
          <IconButton
            onClick={navigateHandler("/batch")}
            color="inherit"
            size="medium"
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">{model.name}</Typography>
          <Controller />
        </Box>
      </AppBar>
      <CHILD />
    </>
  );
});

export const page = Provider(BatchShow);
