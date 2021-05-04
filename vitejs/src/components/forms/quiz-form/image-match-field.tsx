import * as React from "react";
import { AnimatedFaded } from "components/animated-faded";
import { FormField } from "components/form-fields/form-field";
import { useFormContext } from "react-hook-form";
import { Box } from "@material-ui/core";
import { useRegexKeydown } from "hooks/use-regex-keydown";

export const ImageMatchField = () => {
  const form = useFormContext();
  const keyHandler = useRegexKeydown({
    regex: new RegExp(/^[A-Za-z\s]+$/),
    whenRegexInvalid() {
      form.setError("meta_data.letters", {
        type: "typing-error",
        message: "Hanya dapat menggunakan huruf",
      });
    },
    whenRecoverError() {
      form.clearErrors("meta_data.letters");
    },
    limit: 5,
  });
  return (
    <AnimatedFaded>
      <Box paddingY={2}>
        <FormField
          fullWidth
          label="5 huruf yang di gunakan untuk soal"
          variant="outlined"
          name="meta_data.letters"
          {...keyHandler}
        />
      </Box>
    </AnimatedFaded>
  );
};
