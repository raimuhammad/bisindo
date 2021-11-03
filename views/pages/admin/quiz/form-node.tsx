/* eslint-disable */
import * as React from "react";
import { QuizType, useQuery, VideoModelType } from "@root/models";
import { useStore } from "./provider";
import { useQuizForm } from "@service-provider/quiz/form-provider";
import { Fields } from "@components/quiz/multiple-choise/form/create-form";
import { LoadingButton } from "@components/loading-button";
import { Save } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { TimeSlider } from "@components/quiz/multiple-choise/form/time-slider";
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { FormField } from "@components/form-field/form-field";
import voca from "voca";
import { useWatch } from "react-hook-form";

const ShowAtField = observer(() => {
  const params = useParams<any>();
  const { data, loading: loadingFetch } = useQuery<{ video: VideoModelType }>(
    (store: RootModel) => store.queryVideo({ id: params.videoId })
  );
  return (
    <>
      {data && data.video ? (
        <Box padding={2}>
          <TimeSlider model={data.video} />
        </Box>
      ) : null}
    </>
  );
});

const MultipleChoice = () => {
  const { handler, loading } = useQuizForm();
  return (
    <div>
      <Fields>
        <ShowAtField />
      </Fields>
      <Box padding={2}>
        <LoadingButton
          loading={loading}
          icon={<Save />}
          fullWidth
          onClick={handler}
          variant="contained"
        />
      </Box>
    </div>
  );
};

const Common = () => {
  const text = useWatch({
    defaultValue: "",
    name: "text",
  });
  const { form, loading, handler } = useQuizForm();
  const onKeyDown = (event: any) => {
    const isnum = voca(event.key).isNumeric();
    if (isnum) {
      event.preventDefault();
      return;
    }
    if (form.formState.errors["text"]) {
      form.clearErrors("text");
    }
    if (text.includes(event.key)) {
      event.preventDefault();
      form.setError("text", {
        message: "Huruf telah di gunakan",
        type: "redundance alpha",
      });
    }
  };

  return (
    <Box padding={2}>
      <FormField
        onKeyDown={onKeyDown}
        fullWidth
        variant="outlined"
        name="text"
        label="Masukan huruf yang di gunakan"
      />
      <ShowAtField />
      <Box paddingY={2}>
        <LoadingButton
          fullWidth
          onClick={handler}
          variant="contained"
          color="primary"
          loading={loading}
          icon={<Save />}
        >
          Simpan
        </LoadingButton>
      </Box>
    </Box>
  );
};

const LetterSequence = () => {
  const { loading, handler } = useQuizForm();

  return (
    <Box padding={2}>
      <FormField
        fullWidth
        variant="outlined"
        name="text"
        label="Masukan kata yang di gunakan"
      />
      <ShowAtField />
      <Box paddingY={2}>
        <LoadingButton
          fullWidth
          onClick={handler}
          variant="contained"
          color="primary"
          loading={loading}
          icon={<Save />}
        >
          Simpan
        </LoadingButton>
      </Box>
    </Box>
  );
};

const nodeMap: Record<QuizType, React.ComponentType> = {
  MULTIPLE_CHOICE: MultipleChoice,
  IMAGE_MATCH: Common,
  LETTER_SEQUENCE: LetterSequence,
};

export const FormNode = () => {
  const { formType } = useStore();
  const Com = nodeMap[formType];
  return <Com />;
};
