import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import {
  MutationFormProvider,
  useMutationForm,
} from "@providers/model-provider/mutation";
import { FormProvider, useFormContext } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { VideoPlayer } from "@components/video-player";
import { useMount } from "react-use";
import text from "./page-setting.json";
import { FormField } from "@components/form-field/form-field";
import { TextEditor } from "@components/form-field/text-editor-field";
import { useBatchShow } from "./context";
import { usePopup } from "@hooks/use-popup";
import { observer } from "mobx-react";
import { SubmitButton } from "@components/submit-button";
import { Upload } from "@mui/icons-material";

const intl = text.videos;

const useFilePreview = (): [
  {
    inputRef: ReturnType<typeof useRef>;
    onClick(): void;
  },
  string
] => {
  const form = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [base64, setBase64] = useState<string>("");
  const onFileChange = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      form.setValue("content", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  useMount(() => {
    if (inputRef.current) {
      inputRef.current?.addEventListener("change", onFileChange);
    }
  });
  return [{ inputRef, onClick }, base64];
};

const videoContainerSx = (flexed: boolean) => ({
  minHeight: 256,
  alignItems: "center",
  justifyContent: "center",
  display: flexed ? "flex" : "block",
  "& > .video-wrapper": {
    width: "100%",
    background: "black",
  },
});
const VideoField = () => {
  const [{ onClick, inputRef }, url] = useFilePreview();
  const form = useFormContext();
  const errors = form.formState.errors;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (errors.content) {
      closeSnackbar();
      enqueueSnackbar(errors.content.message, { variant: "error" });
    }
  }, [errors]);

  return (
    <Box sx={videoContainerSx(!url)}>
      <input
        style={{ display: "none" }}
        type="file"
        accept="video/*"
        ref={inputRef as any}
      />
      {url ? (
        <div className="video-wrapper">
          <VideoPlayer url={url} />
        </div>
      ) : (
        <></>
      )}
      <div>
        {!url ? <Typography>{intl.noVideoText}</Typography> : null}
        <Button onClick={onClick}>
          {!url ? intl.changeVideoTextButton : intl.changeVideoTextButton1}
        </Button>
      </div>
    </Box>
  );
};

const Content = observer(() => {
  const { form, reset, response, loading, handler } = useMutationForm();
  const { pageControll, showProgress, hideProgress } = useBatchShow();
  const changePage = pageControll[1];
  useEffect(() => {
    const cb = loading ? showProgress : hideProgress;
    cb();
  }, [loading]);

  usePopup({
    message: intl.uploadVideoSuccess,
    show: Boolean(response),
    callback(v?: any) {
      changePage("VIDEOS");
    },
    variant: "success",
  });
  return (
    <FormProvider {...form}>
      <Grid container spacing={2} onSubmit={handler} component="form">
        <Grid item xs={12} md={8}>
          <VideoField />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ pt: 2 }}>
            <FormField
              sx={{ mb: 3 }}
              label="Judul video"
              name="title"
              fullWidth
            />
            <FormField
              sx={{ mb: 3 }}
              label="Caption video"
              name="caption"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: [0, 2] }}>
            <TextEditor placeholder="Deskripsi video" name="description" />
          </Paper>
          <Paper sx={{ p: [0, 2], mt: 3 }}>
            <SubmitButton
              variant="outlined"
              fullWidth
              icon={<Upload />}
              loading={loading}
            >
              Upload video
            </SubmitButton>
          </Paper>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
const parser = (data: any) => {
  data.description = JSON.stringify(data.description);
  return {
    ...data,
  };
};
export const AddVideo = () => {
  const { modelId } = useBatchShow();
  return (
    <MutationFormProvider
      parser={parser}
      merge={{
        gradeId: modelId,
      }}
      mutateKey="addVideo"
    >
      <Box sx={{ mb: 5 }}>
        <Content />
      </Box>
    </MutationFormProvider>
  );
};
