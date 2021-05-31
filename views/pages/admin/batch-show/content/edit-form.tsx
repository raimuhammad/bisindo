import * as React from "react";
import { FormDialog } from "./form-dialog";
import { FormProvider } from "@service-provider/content/form-provider";
import { useContentPaginator, useVideoForm } from "@service-provider/content";
import { observer } from "mobx-react";
import {
  Submitter,
  DescriptionField,
  CommonFields,
} from "@admin-pages/shared/video-form";
import { useFormCallback } from "./utils";

const Form = observer(() => {
  const { result, loading, handler } = useVideoForm();
  const callback = useFormCallback({
    loading,
    disableRefresh: true,
  });
  return (
    <div>
      <CommonFields />
      <DescriptionField />
      <Submitter
        message="Video berhasil di ubah"
        loading={loading}
        result={Boolean(result)}
        handler={handler}
        callback={callback}
      />
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
