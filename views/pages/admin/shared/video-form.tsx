import * as React from "react";
import { FormField } from "@components/form-field/form-field";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useSuccessModal } from "@hooks/use-success-modal";
import { CloudUpload, Save } from "@material-ui/icons";
import { useFileUpload } from "@components/form-field/file-upload-field";
import { useStore } from "@admin-pages/batch-show/provider";
import { useToggle } from "@hooks/use-toggle";
import { useEffect } from "react";
import { Player } from "@components/player";
import { TextEditor } from "@components/form-field/text-editor-field";

const FieldContainer = ({ children }: any) => {
  return <Box paddingY={2}>{children}</Box>;
};

export const FileController = () => {
  const { clickHandler, previewUrl } = useFileUpload();
  const { contentHeight } = useStore();

  // const vContainerH = (30 / 100) * contentHeight;

  const [playing, { toggle, inline }] = useToggle();

  useEffect(() => {
    inline(false);
  }, [previewUrl]);

  const styles: any = {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    // height: vContainerH,
    // position: "relative",
  };
  if (!previewUrl) {
    styles.display = "flex";
  }

  return (
    <Box {...styles} bgcolor={previewUrl ? "black" : "transparent"}>
      <Button
        onClick={clickHandler}
        startIcon={<CloudUpload />}
        color="primary"
        variant="contained"
        size="large"
        style={{
          top: "1rem",
          left: "1rem",
          zIndex: 10,
          position: previewUrl ? "absolute" : "static",
        }}
      >
        {previewUrl ? "Ganti video" : "Upload video"}
      </Button>
      {!previewUrl ? null : (
        <Player url={previewUrl} onContainerClick={toggle} play={playing} />
      )}
    </Box>
  );
};

export type SubmitterProps = {
  handler(e: any): any;
  callback(): void;
  loading: boolean;
  result: boolean;
  disableNotif?: boolean;
  message?: string;
};

export const Submitter = ({
  loading,
  result,
  callback,
  handler,
  disableNotif = false,
  message = "Video berhasil di tambahkan",
}: SubmitterProps) => {
  useSuccessModal({
    callback,
    depedencies: Boolean(result && !disableNotif),
    message,
  });
  return (
    <>
      <Backdrop open={loading} style={{ zIndex: 11000, color: "white" }}>
        <div>
          <Box display="flex" alignItems="center" marginBottom={5}>
            <CircularProgress size={100} />
          </Box>
          <Typography color="inherit" align="center">
            Menyimpan video
          </Typography>
        </div>
      </Backdrop>
      <Box textAlign="right">
        <Button
          fullWidth
          startIcon={<Save />}
          variant="contained"
          size="large"
          color="primary"
          onClick={handler}
        >
          Simpan
        </Button>
      </Box>
    </>
  );
};

export const DescriptionField = () => (
  <TextEditor placeholder="Masukan deskripsi video" name="description" />
);

export const CommonFields = () => {
  return (
    <>
      <FieldContainer>
        <FormField variant="outlined" label="Judul" fullWidth name="title" />
      </FieldContainer>
      <FieldContainer>
        <FormField
          variant="outlined"
          label="Caption"
          fullWidth
          name="caption"
        />
      </FieldContainer>
    </>
  );
};
