import { observer } from "mobx-react";
import { Provider, useStore } from "./provider";
import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "@hooks/use-navigate";
import { Controller } from "./controller";
import { TABS } from "./provider";
import { Content } from "./content";
import { Student } from "./student";
import { CreateVideo } from "./create-video";
import { FormProvider } from "@service-provider/content";
import { Page as QuizCheck } from "./quiz-check";
import { Discussion } from "./discussion";
import { useSoftUi } from "@root/soft-ui/libs/soft-ui";
import { useEffect } from "react";
import type { ComponentType } from "react";

const FormWrapper = FormProvider(CreateVideo);

const Form = () => {
  const { model } = useStore();
  return <FormWrapper grade={model} />;
};
const CMAP: Record<TABS, ComponentType> = {
  VIDEO: Content,
  STUDENT: Student,
  "QUIS-CHECK": QuizCheck,
  "VIDEO-ADD": Form,
  DISCUSSION: Discussion,
};

const BatchShow = observer(() => {
  const { model, activeTab } = useStore();
  const { navigateHandler } = useNavigate();
  const CHILD = CMAP[activeTab];
  const [{ customPageCallback }] = useSoftUi();

  useEffect(() => {
    const cb = customPageCallback(model ? model.name : "");
    return cb;
  }, [customPageCallback, model]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
        <Button
          onClick={navigateHandler("/batch")}
          color="inherit"
          size="medium"
          startIcon={<ArrowBack />}
        >
          Kembali
        </Button>
        <Controller />
      </Box>
      <CHILD />
    </>
  );
});

export const page = Provider(BatchShow);
