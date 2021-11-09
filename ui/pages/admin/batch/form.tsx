import type { GradeModelType } from "@root/models";
import { useEffect } from "react";
import { useMutationForm } from "@providers/model-provider/mutation";
import { FormProvider } from "react-hook-form";
import { FormField } from "@components/form-field/form-field";
import { Button, CircularProgress } from "@mui/material";
import { Save } from "@mui/icons-material";
import { observer } from "mobx-react";

type Props = {
  model?: GradeModelType;
  onSuccess(model: GradeModelType): void;
};

export const Form = observer(({ onSuccess, model }: Props) => {
  const { setFormValue, response, form, handler, loading } =
    useMutationForm<GradeModelType>();

  useEffect(() => {
    if (response) {
      onSuccess(response);
    }
  }, [response]);

  useEffect(() => {
    if (model) {
      setFormValue({ name: model.name });
    }
  }, [model]);

  return (
    <FormProvider {...form}>
      <form onSubmit={handler}>
        <FormField fullWidth name="name" label="Nama batch" />
        <Button
          sx={{
            marginY: 2,
          }}
          variant="contained"
          size="large"
          type="submit"
          endIcon={
            loading ? (
              <CircularProgress sx={{ color: "white" }} size={15} />
            ) : (
              <Save />
            )
          }
        >
          Simpan
        </Button>
      </form>
    </FormProvider>
  );
});
