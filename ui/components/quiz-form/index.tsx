import {
  QuizFormContext,
  useQuizFormProvider,
  Props,
  useQuizForm,
  useQuizType,
} from "./provider";
import { TimeSlider } from "./fields/time-slider";
import { Box, Button, ButtonGroup } from "@mui/material";
import { TypeSelector } from "./fields/type-selector";
import { AnimatePresence, motion } from "framer-motion";
import { ImageMatch } from "./fields/image-match";
import { LetterSequence } from "./fields/letter-sequence";
import { MultipleChoise } from "./fields/multiple-choise";
import { QuizType, useQuery } from "@root/models";
import { ComponentType, useEffect } from "react";
import { ControllerButton } from "./controller-button";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { RootStoreBaseMutations } from "@root-model";
import { useMutation } from "@hooks/use-mutation";
import { observer } from "mobx-react";

const field: Record<QuizType, ComponentType> = {
  LETTER_SEQUENCE: LetterSequence,
  IMAGE_MATCH: ImageMatch,
  MULTIPLE_CHOICE: MultipleChoise,
};

const switcherAnimation = {
  animate: {
    y: 0,
    opacity: 1,
  },
  initial: {
    y: "-200%",
    opacity: 0,
  },
  exit: {
    y: "200%",
    opacity: 0,
  },
};

const Switcher = () => {
  const type = useQuizType();
  const Component = field[type as unknown as keyof typeof field];
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div key={type} {...switcherAnimation}>
        <Component />
      </motion.div>
    </AnimatePresence>
  );
};
const mutateMap: Record<QuizType, RootStoreBaseMutations> = {
  LETTER_SEQUENCE: RootStoreBaseMutations.mutateLetterSequenceQuiz,
  IMAGE_MATCH: RootStoreBaseMutations.mutateImageMatchQuiz,
  MULTIPLE_CHOICE: RootStoreBaseMutations.mutateMultipleChoiseQuiz,
};

export const QuizForm = observer((props: Props) => {
  const ctx = useQuizFormProvider(props);
  const form = useForm();
  const type = useWatch({
    control: form.control,
    defaultValue: QuizType.IMAGE_MATCH,
    name: "type",
  });
  const parser = (data: any) => {
    if ("multipleChoice" in data) {
      const { multipleChoice, ...rest } = data;
      return {
        ...data,
        ...multipleChoice,
        options: data.multipleChoice.options.map(
          ({ content }: any, index: number) => {
            const key = content instanceof File ? "image" : "text";
            return {
              index,
              [key]: content,
            };
          }
        ),
      };
    }
    return data;
  };
  const [{ loading, response }, handler] = useMutation({
    api: mutateMap[form.getValues("type") as keyof typeof mutateMap],
    parser,
    merge: {
      videoId: props.video.id,
    },
  });
  const onSubmit = form.handleSubmit(handler);
  useEffect(() => {
    if (response) {
      props.onSuccess();
    }
  }, [response]);

  return (
    <FormProvider {...form}>
      <QuizFormContext.Provider value={ctx}>
        <ControllerButton onSubmit={onSubmit} loading={loading} />
        <Box
          sx={{
            display: "flex",
            "& > div": { width: "50%" },
            overflow: "hidden",
            minHeight: "70vh",
          }}
        >
          <div>
            <TypeSelector />
            <Switcher />
          </div>
          <div>
            <TimeSlider />
          </div>
        </Box>
      </QuizFormContext.Provider>
    </FormProvider>
  );
});
