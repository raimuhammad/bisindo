import * as React from "react";
import { useFileUpload } from "@components/form-field/file-upload-field";
import { Box, Button } from "@material-ui/core";
import { ImagePreview } from "./image-preview";

export const AdditionalImage = () => {
  const { clickHandler, previewUrl } = useFileUpload();
  return (
    <Box marginTop={2}>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={clickHandler}
      >
        Upload gambar pendukung
      </Button>
      <Box textAlign="center" paddingY={2}>
        {previewUrl ? <ImagePreview /> : null}
      </Box>
    </Box>
  );
};
