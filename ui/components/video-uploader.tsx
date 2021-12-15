import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  FormLabel,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useMount } from "react-use";
import { VideoPlayer } from "./video-player";
import { useFormContext } from "react-hook-form";
import { useSnackbar } from "notistack";
import { TextEditor } from "@components/form-field/text-editor-field";
import { FormField } from "@components/form-field/form-field";

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
        <Typography>Silahkan pilih video terlebih dahulu</Typography>
        <Button onClick={onClick}>Pilih video</Button>
      </div>
    </Box>
  );
};

export const VideoUploader = () => {
  const form = useFormContext();
  if (!form) {
    throw new Error(`Please wrap VideoUploader component in FormProvider`);
  }

  return (
    <Container>
      <VideoField />
      <FormField name="title" label="Judul video" sx={{ pb: 2 }} fullWidth />
      <FormField
        name="caption"
        label="caption video"
        sx={{ pb: 2 }}
        fullWidth
      />
      <Paper sx={{ p: 1, mb: 2 }}>
        <FormLabel sx={{ p: 1, paddingBottom: 2 }}>
          Masukan deskripsi video
        </FormLabel>
        <TextEditor placeholder="Deskripsi video" name="description" />
      </Paper>
    </Container>
  );
};
