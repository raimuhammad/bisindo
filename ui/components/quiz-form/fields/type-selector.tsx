import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";
import { QuizType } from "@root/models";
import { useQuizForm } from "../provider";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

const items = [
  {
    label: "Pilihan ganda",
    value: QuizType.MULTIPLE_CHOICE,
  },
  {
    label: "Pencocokan gambar",
    value: QuizType.IMAGE_MATCH,
  },
  {
    label: "Pengurutan huruf",
    value: QuizType.LETTER_SEQUENCE,
  },
];

export const TypeSelector = () => {
  const { formValues, callbacks, changeType } = useQuizForm();
  const value = useWatch({
    name: "type",
    defaultValue: QuizType.IMAGE_MATCH,
  });
  const {
    field: { onChange },
  } = useController({
    name: "type",
    defaultValue: QuizType.IMAGE_MATCH,
  });
  const form = useFormContext();
  useEffect(() => {
    form.setValue("text", "");
  }, [value]);

  return (
    <Box sx={{ py: 2 }}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Jenis quis</FormLabel>
        <RadioGroup
          value={value}
          onChange={onChange}
          row
          name="row-radio-buttons-group"
        >
          {items.map((item) => (
            <FormControlLabel
              value={item.value}
              key={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
