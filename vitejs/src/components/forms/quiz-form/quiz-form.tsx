import * as React from "react";
import { FormBaseProps } from "shared/form-factory";
import { QuizModelType, QuizType, VideoModelType } from "root/models/stores";
import { observer } from "mobx-react";
import { RootStoreBaseMutations } from "root-model";
import { resolver } from "./form-option";
import { useFormFactoryGenerator } from "hooks/use-form-factory-generator";
import { useCallback } from "react";
import { formWrapper, WrapperProps } from "components/form-wrapper";
import { SelectTypeField } from "./form-option";
import { ImageMatchField } from "./image-match-field";
import { LetterSequenceField } from "./letter-sequence-field";
import { MultipleChoiceField } from "./multiple-choice-field";
import { AnimatePresence } from "framer-motion";
import { useWatch } from "react-hook-form";
import { Button } from "@material-ui/core";
import { TimeSlider } from "./time-slider";
import { useSuccessModal } from "hooks/use-success-modal";

type UtilProps = {
  onLoading?(v: boolean): void;
  model: VideoModelType;
  onSuccess(result: QuizModelType): void;
};

type Props = {
  callback: FormBaseProps["callback"];
  mutateKey?: RootStoreBaseMutations.mutateQuiz;
} & UtilProps;

const mapNode: Record<QuizType, React.ComponentType> = {
  [QuizType.IMAGE_MATCH]: ImageMatchField,
  [QuizType.LETTER_SEQUENCE]: LetterSequenceField,
  [QuizType.MULTIPLE_CHOICE]: MultipleChoiceField,
};

const Component = observer((props: WrapperProps<QuizModelType, UtilProps>) => {
  const { instance, onLoading, model } = props;
  const { loading, result } = instance;

  useSuccessModal({
    callback() {
      if (result) {
        props.onSuccess(result);
      }
    },
    depedencies: Boolean(result),
    message: "Quis berhasil di tambahkan",
  });

  React.useEffect(() => {
    if (result) {
      props.onSuccess(result);
    }
  }, [result]);

  React.useEffect(() => {
    if (onLoading) {
      onLoading(loading);
    }
  }, []);
  const type = useWatch({
    name: "type",
  });

  React.useEffect(() => {
    instance.form.setValue("meta_data.options", ["a", "b", "c", "d"]);
  }, []);

  const Selected = type ? mapNode[type as QuizType] : null;
  return (
    <form>
      <SelectTypeField label="Jenis quis" variant="outlined" name="type" />
      <TimeSlider model={model} />
      <AnimatePresence initial={false} exitBeforeEnter>
        {Selected ? <Selected /> : null}
      </AnimatePresence>
      <Button onClick={instance.handler}>Simpan</Button>
    </form>
  );
});

export const QuizForm = observer(
  ({
    callback,
    mutateKey = RootStoreBaseMutations.mutateQuiz,
    onLoading,
    model,
    onSuccess,
  }: React.PropsWithChildren<Props>) => {
    const instance = useFormFactoryGenerator<QuizModelType>({
      resolver,
      resultKey: mutateKey,
      callback,
      initialValues: {
        meta_data: {
          options: ["a", "b", "c", "d"],
        },
      },
    });
    const Node = useCallback(() => {
      const Form = formWrapper<QuizModelType, UtilProps>(Component, instance);
      return <Form onSuccess={onSuccess} model={model} onLoading={onLoading} />;
    }, []);
    return <Node />;
  }
);
