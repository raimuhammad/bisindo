import * as React from "react";
import { FormProvider } from "react-hook-form";
import { TextEditor } from "@components/form-field/text-editor-field";
import { LoadingButton } from "@components/loading-button";
import { useDiscussion } from "./provider";
import { Save } from "@material-ui/icons";
import { Box, Button, Collapse } from "@material-ui/core";
import { observer } from "mobx-react";

type Props = {
  openLabel: string;
  closeLabel: string;
};

type FormProps = {
  loading: boolean;
  onSubmit(e: any): any;
};

export const Form = observer(({ onSubmit, loading }: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <TextEditor name="content" />
      <LoadingButton loading={loading} icon={<Save />} type="submit">
        Simpan
      </LoadingButton>
    </form>
  );
});

export const ReplyForm = observer(() => {
  const { reply } = useDiscussion();
  const [[openCollapse, toggle], utils] = reply;
  const { onSubmit, loading, form } = utils();
  return (
    <Box padding={2}>
      <Button onClick={toggle}>Tambahkan balasan untuk diskusi</Button>
      <Collapse unmountOnExit in={openCollapse}>
        <FormProvider {...form}>
          <Form onSubmit={onSubmit} loading={loading} />
        </FormProvider>
      </Collapse>
    </Box>
  );
});

export const CreateForm = observer(({ openLabel, closeLabel }: Props) => {
  const { create } = useDiscussion();
  const [[openCollapse, toggle], utils] = create;
  const { loading, form, data, onSubmit } = utils();
  return (
    <>
      <Button onClick={toggle}>{openCollapse ? closeLabel : openLabel}</Button>
      <Collapse unmountOnExit in={openCollapse}>
        <FormProvider {...form}>
          <Form onSubmit={onSubmit} loading={loading} />
        </FormProvider>
      </Collapse>
    </>
  );
});
