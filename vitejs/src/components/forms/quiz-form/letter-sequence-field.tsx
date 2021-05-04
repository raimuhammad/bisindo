import * as React from "react";
import { AnimatedFaded } from "components/animated-faded";
import { Box } from "@material-ui/core";
import { FormField } from "components/form-fields/form-field";
import { useRegexKeydown } from "hooks/use-regex-keydown";
import { useFormContext } from "react-hook-form";

export const LetterSequenceField = () => {
  const form = useFormContext();
  const keyHandler = useRegexKeydown({
    regex: new RegExp(/^[A-Za-z\s]+$/),
    whenRegexInvalid() {
      form.setError("meta_data.word", {
        type: "typing-error",
        message: "Hanya dapat menggunakan huruf",
      });
    },
    whenRecoverError() {
      form.clearErrors("meta_data.word");
    },
  });

  return (
    <AnimatedFaded>
      <Box paddingY={2}>
        <FormField
          {...keyHandler}
          fullWidth
          variant="outlined"
          name="meta_data.word"
          label="Masukan kata untuk soal quiz"
        />
      </Box>
    </AnimatedFaded>
  );
};
