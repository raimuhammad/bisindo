import { Dialog, Box, FormLabel } from "@mui/material";
import { useDiscussion } from "./provider";
import { useMutationForm } from "@providers/model-provider/mutation";
import { observer } from "mobx-react";
import { TextEditor } from "@components/form-field/text-editor-field";
import { SubmitButton } from "@components/submit-button";
import { ChatBubble } from "@mui/icons-material";
import { FormProvider } from "react-hook-form";
import { usePopup } from "@hooks/use-popup";
import {useCallback, useEffect, useState} from "react";
import messages from "./form-message.json";
import { usePaginator } from "@providers/model-provider/paginators";

export const DiscussionForm = observer(() => {
  const { formMode, setFormMode, initialContent, setSelected, selectedId } = useDiscussion();
  const { loading, form, response, handler, reset } = useMutationForm();
  const { initialFetch } = usePaginator();

  useEffect(() => {
    if (initialContent && formMode) {
      form.setValue("content", initialContent);
    }
  }, [initialContent, formMode]);

  const handleClose = () => {
    if (!loading) {
      reset();
      setFormMode(null);
    }
  };
  const getMessage = useCallback((): string => {
    if (formMode) {
      return messages[formMode];
    }
    return "";
  }, [formMode]);
  const showPopUp = usePopup({
    message: getMessage(),
    show: Boolean(response),
    callback: () => {
      setSelected(null);
      setFormMode(null);
      handleClose();
      initialFetch();
    },
    variant: "success",
  });
  return (
    <Dialog fullWidth open={Boolean(formMode)} onClose={handleClose}>
      <FormProvider {...form}>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handler}>
            <FormLabel>Konten diskusi : </FormLabel>
            <TextEditor name="content" />
            <SubmitButton icon={<ChatBubble />} loading={loading}>
              Simpan
            </SubmitButton>
          </form>
        </Box>
      </FormProvider>
    </Dialog>
  );
});