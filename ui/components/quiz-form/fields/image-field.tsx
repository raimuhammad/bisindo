import {
  FileUploadProvider,
  useFileUpload,
} from "@components/form-field/file-upload-field";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import * as React from "react";

const ImagePreview = () => {
  const { previewUrl, reset, clickHandler } = useFileUpload();
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src={previewUrl}
        sx={{
          maxHeight: 144,
          maxWidth: 256,
        }}
      />
      <Tooltip title="Ganti foto">
        <IconButton
          color="secondary"
          onClick={() => {
            reset();
            clickHandler();
          }}
          size="small"
          style={{ top: 0, right: 0, position: "absolute" }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const Control = ({ label }: { label: string }) => {
  const { clickHandler, previewUrl } = useFileUpload();
  return (
    <>
      <Button
        fullWidth
        size="small"
        variant="contained"
        color="primary"
        onClick={clickHandler}
      >
        {label}
      </Button>

      <Box textAlign="center" paddingY={2}>
        {previewUrl ? <ImagePreview /> : null}
      </Box>
    </>
  );
};

export const ImageField = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  return (
    <FileUploadProvider accept="image/*" name={name}>
      <Control label={label} />
    </FileUploadProvider>
  );
};
