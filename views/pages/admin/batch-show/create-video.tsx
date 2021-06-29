import * as React from "react";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import { useStore } from "./provider";
import { FileUploadProvider } from "@components/form-field/file-upload-field";
import {
  FileController,
  CommonFields,
  SubmitterProps,
  Submitter,
  DescriptionField,
} from "@admin-pages/shared/video-form";
import { useVideoForm } from "@service-provider/content";

export const CreateVideo = () => {
  const { contentHeight, changeTab } = useStore();
  const { loading, handler, result, provider: Provider } = useVideoForm();
  const submitProps: SubmitterProps = {
    callback: () => changeTab("VIDEO"),
    loading,
    handler,
    result: Boolean(result),
  };
  return (
    <Provider>
      <Box style={{ height: contentHeight }} overflow="auto">
        <Grid container>
          <Grid item sm={4}>
            <Box padding={1}>
              <FileUploadProvider name="content" accept="video/*">
                <FileController />
              </FileUploadProvider>
            </Box>
          </Grid>
          <Grid item sm={8}>
            <Box marginBottom={2}>
              <Paper>
                <Box padding={2}>
                  <Typography variant="h4">Informasi konten</Typography>
                  <CommonFields />
                  <DescriptionField />
                  <Submitter {...submitProps} />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
};
