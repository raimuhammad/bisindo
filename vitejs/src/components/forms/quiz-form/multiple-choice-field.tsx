import * as React from "react";
import { AnimatedFaded } from "components/animated-faded";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormField } from "components/form-fields/form-field";
import { Box } from "@material-ui/core";
import { selectFieldFactory } from "components/form-fields/select-field";

const optionsLabels: Record<number, string> = {
  0: "opsi a",
  1: "opsi b",
  2: "opsi c",
  3: "opsi d",
};

const OptionField = ({ index }: { index: number }) => {
  const currentOptions = useWatch({
    name: "meta_data.options",
    defaultValue: [],
  }) as Array<string>;

  const onKeyDown = (e: any) => {
    const val = e.key;
    const check = currentOptions.includes(val);
    if (check || e.target.value.length > 1) {
      e.preventDefault();
    }
  };
  const form = useFormContext();

  return (
    <Box width="48%" marginY={1}>
      <Box>
        <FormField
          fullWidth
          onKeyDown={onKeyDown}
          variant="outlined"
          label={optionsLabels[index]}
          name={`meta_data.options[${index}]`}
        />
      </Box>
    </Box>
  );
};

export const MultipleChoiceField = () => {
  const currentOptions = useWatch({
    name: "meta_data.options",
    defaultValue: [],
  }) as Array<string>;

  const options = useFieldArray({
    name: "meta_data.options",
  });
  const SelectField = selectFieldFactory(
    currentOptions.filter(Boolean).map((item) => ({
      value: item,
      label: item,
    }))
  );
  return (
    <AnimatedFaded>
      <Box marginY={2}>
        <Box
          marginY={2}
          display="flex"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {options.fields.map((item, index) => (
            <OptionField index={index} key={item.id} />
          ))}
        </Box>
        <Box>
          <SelectField
            label="Gambar yang digunakan untuk Soal"
            fullWidth
            variant="outlined"
            name="meta_data.question_answer"
          />
        </Box>
      </Box>
    </AnimatedFaded>
  );
};
