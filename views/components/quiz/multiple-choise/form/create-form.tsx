import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { FileUploadProvider } from "@components/form-field/file-upload-field";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { AdditionalImage } from "./additional-image";
import { OptionsField } from "./options-field";
import { FormField } from "@components/form-field/form-field";

export const Fields = ({ children }: React.PropsWithChildren<any>) => {
  return (
    <>
      <Box padding={2}>
        <FormField
          label="Pertanyaan"
          name="question"
          fullWidth
          variant="outlined"
        />
        <FileUploadProvider accept="image/*" name="additionalFile">
          <AdditionalImage />
        </FileUploadProvider>
      </Box>
      <OptionsField />
      {children}
    </>
  );
};

export const CreateForm = () => {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <Grid container>
        <Grid item sm={6} md={6}>
          <Typography variant="h4">Pertanyaan</Typography>
          <FormField name="question" fullWidth variant="outlined" />
          <FileUploadProvider accept="image/*" name="additionalFile">
            <AdditionalImage />
          </FileUploadProvider>
        </Grid>
        <Grid item sm={6} md={6}>
          <OptionsField />
        </Grid>
      </Grid>
      <div>
        <Button onClick={() => console.log(form.getValues())}>Simpan</Button>
      </div>
    </FormProvider>
  );
};
