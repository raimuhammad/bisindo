import { useFileUpload } from "@components/form-field/file-upload-field";
import { IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import * as React from "react";

export const ImagePreview = () => {
  const { previewUrl, reset, clickHandler } = useFileUpload();
  return (
    <div
      style={{
        maxHeight: 144,
        maxWidth: 256,
        position: "relative",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={previewUrl}
        style={{
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
    </div>
  );
};
