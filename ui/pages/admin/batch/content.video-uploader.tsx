import { VideoUploader } from "@components/video-uploader";
import { FormProvider } from "react-hook-form";
import { Button, Container } from "@mui/material";
import {
  MutationFormProvider,
  useMutationForm,
} from "@providers/model-provider/mutation";
import type { VideoModelType } from "@root/models";
import { useBatchPage } from "./provider";
import { usePopup } from "@hooks/use-popup";
import { useContent } from "./content.context";

const Form = () => {
  const { form, handler, response } = useMutationForm<VideoModelType>();
  const [_, { changeTab }, {fetch}] = useContent();

  usePopup({
    message: "Video berhasil di tambahkan",
    variant: "success",
    show: Boolean(response),
    callback: ()=>{
      changeTab("videos")();
      fetch();
    },
  });

  return (
    <>
      <FormProvider {...form}>
        <VideoUploader />
        <Container>
          <Button variant='contained' fullWidth onClick={handler}>
            Simpan
          </Button>
        </Container>
      </FormProvider>
    </>
  );
};

export const ContentVideoUploader = () => {
  const { selected } = useBatchPage();
  const parser = (v: any) => {
    const description = JSON.stringify(v);
    return {
      ...v,
      description,
    };
  };

  return (
    <MutationFormProvider
      merge={{
        gradeId: selected ? selected.id : "",
      }}
      parser={parser}
      mutateKey="addVideo"
    >
      <Form />
    </MutationFormProvider>
  );
};
