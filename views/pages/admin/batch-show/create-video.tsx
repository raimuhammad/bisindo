import * as React from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { useStore } from "./provider";
import { CloudUpload, Save } from "@material-ui/icons";
import {
  FileUploadProvider,
  useFileUpload,
} from "@components/form-field/file-upload-field";
import { Player } from "@components/player";
import { useToggle } from "@hooks/use-toggle";
import { useEffect } from "react";
import { FormField } from "@components/form-field/form-field";
import { TextEditor } from "@components/form-field/text-editor-field";
import { useVideoForm } from "@service-provider/content";
import { useSuccessModal } from "@hooks/use-success-modal";

const FileController = () => {
  const { clickHandler, previewUrl } = useFileUpload();
  const { contentHeight } = useStore();

  const vContainerH = (70 / 100) * contentHeight;

  const [playing, { toggle, inline }] = useToggle();

  useEffect(() => {
    inline(false);
  }, [previewUrl]);

  const styles: any = {
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: vContainerH,
    position: "relative",
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
        <Player
          height={vContainerH}
          url={previewUrl}
          onContainerClick={toggle}
          play={playing}
        />
      )}
    </Box>
  );
};

const FieldContainer = ({ children }: any) => {
  return <Box paddingY={2}>{children}</Box>;
};

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

export const Submitter = ({
  disabledNotif = false,
}: {
  disabledNotif?: boolean;
}) => {
  const { loading, handler, result } = useVideoForm();
  const { changeTab } = useStore();

  useSuccessModal({
    callback() {
      changeTab("VIDEO");
    },
    depedencies: Boolean(result && !disabledNotif),
    message: "Video berhasil di tambahkan",
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

export const CreateVideo = () => {
  const { contentHeight } = useStore();
  return (
    <Box style={{ height: contentHeight }} overflow="auto">
      <FileUploadProvider name="content" accept="video/*">
        <FileController />
      </FileUploadProvider>
      <Box padding={2}>
        <Typography variant="h4">Informasi konten</Typography>
        <Grid container>
          <Grid item sm={12} md={4}>
            <Paper>
              <Box padding={2}>
                <CommonFields />
                <Submitter />
              </Box>
            </Paper>
          </Grid>
          <Grid sm={12} md={8} item>
            <Box paddingX={2}>
              <Paper>
                <Box padding={2}>
                  <DescriptionField />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
