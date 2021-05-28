import * as React from "react";
import { VideoForm } from "../../shared/video-form";
import { services } from "@services/content-service";
import { observer } from "mobx-react";
import { useStore } from "../provider";
import { UseFormReturn } from "react-hook-form";
import { useToggle } from "@hooks/use-toggle";

const useEdit = services.update;

const setFormValue = (
  form: UseFormReturn,
  schema: Record<string, any>,
  model: Record<string, any> | null
) => {
  if (!model) return null;
  const obj: Record<string, any> = {};
  Object.keys(schema).map((k) => {
    if (model[k]) {
      form.setValue(k, model[k]);
    }
  });
  return obj;
};

export const Edit = observer(() => {
  const { selected } = useStore();
  const { provider: Provider, form } = useEdit({});
  const [setup, { inline }] = useToggle();

  React.useEffect(() => {
    if (selected) {
      setFormValue(form, services.schema(false), selected);
      form.setValue("grade_id", selected?.grade.id);
      inline(true);
    }
  }, [selected]);
  return !setup ? null : (
    <Provider>
      <VideoForm />
    </Provider>
  );
});
