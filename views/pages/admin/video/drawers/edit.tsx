import * as React from "react";
import { services } from "@services/content-service";
import { observer } from "mobx-react";
import { useStore } from "../provider";
import { UseFormReturn } from "react-hook-form";
import { useToggle } from "@hooks/use-toggle";
import {
  CommonFields,
  DescriptionField,
  Submitter,
  SubmitterProps,
} from "@admin-pages/shared/video-form";
import { Box, Grid, Paper } from "@material-ui/core";
import { FormProvider, useVideoForm } from "@service-provider/content";
import { RootStoreBaseMutations } from "@root-model";

const useEdit = services.update;

const setFormValue = (
  form: UseFormReturn,
  schema: Record<string, any>,
  model: Record<string, any> | null
) => {
  if (!model) return null;
  const obj: Record<string, any> = {};
  Object.keys(schema).map((k) => {
    if (model[k]) {
      form.setValue(k, model[k]);
    }
  });
  return obj;
};

const Container = ({ children }: any) => {
  return (
    <Box padding={2}>
      <Paper>
        <Box padding={1}>{children}</Box>
      </Paper>
    </Box>
  );
};

const Form = observer(() => {
  const { selected, close } = useStore();
  const {
    provider: Provider,
    form,
    result,
    loading,
    handler,
    updateMutation,
  } = useVideoForm();
  const [setup, { inline }] = useToggle();

  React.useEffect(() => {
    if (selected) {
      setFormValue(form, services.schema(false), selected);
      updateMutation(RootStoreBaseMutations.mutateVideoUpdate);
      inline(true);
    }
  }, [selected]);

  const submitterProps: SubmitterProps = {
    message: "Video berhasil diubah",
    result: Boolean(result),
    loading,
    handler,
    callback: close,
  };

  return !setup ? null : (
    <Provider>
      <Box padding={2}>
        <Grid container>
          <Grid item sm={6}>
            <Container>
              <Box padding={2}>
                <CommonFields />
              </Box>
            </Container>
          </Grid>
          <Grid item sm={6}>
            <Container>
              <Box padding={2}>
                <DescriptionField />
              </Box>
              <Box padding={2}>
                <Submitter {...submitterProps} />
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
});
const FormWrapper = FormProvider(Form);
export const Edit = () => {
  const { selected } = useStore();
  return <>{selected ? <FormWrapper video={selected} /> : null}</>;
};
