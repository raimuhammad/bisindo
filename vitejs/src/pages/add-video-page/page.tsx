/**
 * todo : Show message if success or fail
 */
import * as React from "react";
import { PageLayout } from "components/page-layout";
import { VideoModelType } from "root/models/stores";
import { formWrapper, WrapperProps } from "components/form-wrapper";
import { VideoField } from "./video-field";
import { InfoField } from "./info-field";
import { Box, Button, Grid } from "@material-ui/core";
import { observer } from "mobx-react";
import { factory } from "shared/form-factory";
import options from "./form-options";
import { useNavigate } from "hooks/use-navigate";
import { useSuccessModal } from "hooks/use-success-modal";
import { pageProperties } from "./page-properties";

const Component = observer(
  ({ instance }: WrapperProps<VideoModelType, any>) => {
    const { navigateHandler } = useNavigate();
    const { handler, result } = instance;
    useSuccessModal({
      callback: navigateHandler(pageProperties.navigatePath),
      message: pageProperties.successMessage,
      depedencies: Boolean(result),
    });
    return (
      <PageLayout pageTitle={pageProperties.title} backPath="/video">
        <Grid container>
          <Grid item sm={12} md={4}>
            <Box padding={1}>
              <VideoField />
            </Box>
          </Grid>
          <Grid item sm={12} md={8}>
            <Box padding={1}>
              <InfoField />
            </Box>
            <Box padding={1}>
              <Button onClick={handler}>Upload video</Button>
            </Box>
          </Grid>
        </Grid>
      </PageLayout>
    );
  }
);
const instance = factory<VideoModelType>(options);
export const Page = formWrapper<VideoModelType>(Component, instance);
