import * as React from "react";
import { FormDialog } from "./form-dialog";
import { FormProvider } from "@service-provider/content/form-provider";
import { useContentPaginator, useVideoForm } from "@service-provider/content";
import { observer } from "mobx-react";
import { Submitter, DescriptionField, CommonFields } from "../create-video";
import { useFormCallback } from "./utils";

const Form = observer(() => {
  const { result, loading } = useVideoForm();
  useFormCallback({
    result,
    loading,
    message: "Informasi video berhasil di update",
    disableRefresh: true,
  });
  return (
    <div>
      <CommonFields />
      <DescriptionField />
      <Submitter disabledNotif />
    </div>
  );
});

const FormWrapper = FormProvider(Form);

export const EditForm = () => {
  const { selected } = useContentPaginator();
  return !selected ? null : (
    <FormDialog keyName="EDIT">
      <FormWrapper isUpdate video={selected} />
    </FormDialog>
  );
};
