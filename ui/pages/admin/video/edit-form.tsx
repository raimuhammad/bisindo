import {
  MutationFormProvider,
  useMutationForm,
} from "@providers/model-provider/mutation";
import { useVideoPage, withVideoPage } from "./provider";
import { Paper, Box, FormLabel } from "@mui/material";
import { FormField } from "@components/form-field/form-field";
import { FormProvider } from "react-hook-form";
import { TextEditor } from "@components/form-field/text-editor-field";
import { useEffect } from "react";
import { useToggle } from "@hooks/use-toggle";
import { SubmitButton } from "@components/submit-button";
import { Save } from "@mui/icons-material";
import { observer } from "mobx-react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Wrap = observer(() => {
  const { form, loading, handler, response } = useMutationForm();
  const { video } = useVideoPage();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    if (response) {
      enqueueSnackbar("Video berhasil di update", {
        variant: "success",
      });
      navigate(`/admin/video/${(video as any).id}/info`);
    }
  }, [response]);
  const [setup, { inline }] = useToggle();
  useEffect(() => {
    closeSnackbar();
    form.setValue("title", video?.title as any);
    form.setValue("caption", video?.caption as any);
    form.setValue("description", video?.description);
    inline(true);
  }, []);
  return !setup ? (
    <></>
  ) : (
    <FormProvider {...form}>
      <Paper component="form" onSubmit={handler} sx={{ p: 2, my: 3 }}>
        <Box
          sx={{
            display: "flex",
            "& > div": {
              width: "50%",
              p: 1,
            },
          }}
        >
          <div>
            <FormField fullWidth name="title" label="Judul video" />
          </div>
          <div>
            <FormField fullWidth name="caption" label="Caption video" />
          </div>
        </Box>
        <Box sx={{ my: 2, p: 1 }}>
          <FormLabel>Deskripsi video</FormLabel>
          <TextEditor name="description" />
        </Box>
        <SubmitButton
          variant="outlined"
          fullWidth
          icon={<Save />}
          loading={loading}
        >
          Simpan
        </SubmitButton>
      </Paper>
    </FormProvider>
  );
});

const parser = (data: any) => {
  data.description = JSON.stringify(data.description);
  return {
    ...data,
  };
};
export const EditForm = withVideoPage(() => {
  const { video } = useVideoPage();
  return (
    <MutationFormProvider
      parser={parser}
      mutateKey="editVideo"
      merge={{ id: video?.id }}
    >
      <Wrap />
    </MutationFormProvider>
  );
});
