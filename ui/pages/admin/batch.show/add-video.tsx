import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import {
  MutationFormProvider,
  useMutationForm,
} from "@providers/model-provider/mutation";
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
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
import { Save, Upload } from "@mui/icons-material";
import { RootStoreType, useQuery, VideoModelType } from "@root/models";
import { AnimatePresence, motion } from "framer-motion";
import { Option, SelectField } from "@components/form-field/select-field";
import { useMutation } from "@hooks/use-mutation";
import { RootStoreBaseMutations } from "@root-model";
import { useNavigate } from "react-router-dom";
import { WithBatchShow } from "@admin-pages/batch.show/with-batch-show";

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
          <Box sx={{ p: [0, 2] }}>
            <TextEditor placeholder="Deskripsi video" name="description" />
          </Box>
          <Box sx={{ p: [0, 2], mt: 3 }}>
            <SubmitButton
              variant="outlined"
              fullWidth
              icon={<Upload />}
              loading={loading}
            >
              Upload video
            </SubmitButton>
          </Box>
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
const NewVideoForm = () => {
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

const ExitingVideoFormWrapper = observer(
  ({ videos }: { videos: VideoModelType[] }) => {
    const options: Option[] = videos.map((item) => ({
      label: item.title,
      value: item.id,
    }));
    const { modelId, model } = useBatchShow();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [{ loading, response }, handler] = useMutation({
      api: RootStoreBaseMutations.mutateAddVideoInGrade,
      merge: {
        gradeId: modelId,
      },
    });

    useEffect(() => {
      if (response) {
        enqueueSnackbar("Video berhasil di tambahkan", {
          variant: "success",
        });
        navigate(`/batch/${model.name}/${model.id}/videos`);
      }
    }, [response]);

    const form = useForm();
    const field = useController({
      control: form.control,
      name: "videoId",
      defaultValue: options[0].value,
    });
    const video = videos.find((item) => item.id === field.field.value);
    const formHandler = form.handleSubmit(handler);
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: ["block", "flex"],
          "& > div": { p: 1 },
        }}
      >
        <Box sx={{ width: ["100%", "70%"], overflow: "hidden" }}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={video?.id ?? "video-id"}
              transition={{
                x: {
                  type: "tween",
                },
              }}
              initial={{ x: "-200%" }}
              animate={{ x: 0 }}
              exit={{ x: "200%" }}
            >
              {video && <VideoPlayer url={video.content as string} />}
            </motion.div>
          </AnimatePresence>
        </Box>
        <Box
          component="form"
          onSubmit={formHandler}
          sx={{ width: ["100%", "30%"] }}
        >
          <SelectField
            noUseForm
            disabled={loading}
            size="small"
            {...field.field}
            options={options}
            name="videoId"
          />
          <SubmitButton
            sx={{ mt: 2, textTransform: "none" }}
            fullWidth
            icon={<Save />}
            loading={false}
          >
            Simpan
          </SubmitButton>
        </Box>
      </Box>
    );
  }
);

const ExitingVideoForm = observer(() => {
  const { modelId } = useBatchShow();

  const { data, loading } = useQuery<{ videoNotInGrade: VideoModelType[] }>(
    (root: RootStoreType) => {
      return root.queryVideoNotInGrade({
        id: modelId,
      });
    }
  );
  const resolveData = () => {
    return data ? data.videoNotInGrade ?? [] : [];
  };
  const videos = resolveData();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={loading ? "loading" : "oke"}
      >
        {loading ? (
          <Box sx={{ py: 5, display: "flex", justifyContent: "center" }}>
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress size={50} />
              <Typography sx={{ display: "block" }} variant="caption">
                Loading
              </Typography>
            </Box>
          </Box>
        ) : (
          <Paper sx={{ p: 2 }}>
            {!videos.length ? (
              <Typography align="center" variant="subtitle1">
                Tidak ada video yang dapat di pilih
              </Typography>
            ) : (
              <ExitingVideoFormWrapper videos={videos} />
            )}
          </Paper>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

export const AddVideo = WithBatchShow(() => {
  const { modelId } = useBatchShow();
  return (
    <>
      <Typography color="primary" sx={{ mt: 2 }} variant="h5">
        Pilih dari video yang telah terupload
      </Typography>
      <Divider sx={{ my: 2 }} />
      <ExitingVideoForm />
      <Typography color="primary" sx={{ mt: 2 }} variant="h5">
        Upload video baru
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Paper sx={{ p: 1, mb: 5 }}>
        <NewVideoForm />
      </Paper>
    </>
  );
});
