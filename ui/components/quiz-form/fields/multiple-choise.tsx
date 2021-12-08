import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useQuizForm, IndexMap, useQuizType } from "../provider";
import { FormField } from "@components/form-field/form-field";
import { AnimatePresence, motion } from "framer-motion";
import {
  useController,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useEffect } from "react";
import { SelectField } from "@components/form-field/select-field";
import { ImageField } from "./image-field";

import * as React from "react";
import { Delete } from "@mui/icons-material";

const items = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Gambar",
    value: "image",
  },
];

const TypeSelector = () => {
  const value = useWatch({
    name: "multipleChoice.type",
    defaultValue: "text",
  });
  const { field } = useController({
    name: "multipleChoice.type",
    defaultValue: "text",
  });

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Jenis pilihan ganda</FormLabel>
      <RadioGroup {...field} row>
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
  );
};

const variants = {
  init: {
    y: "-350%",
    opacity: 0,
  },
  exit: {
    y: "350%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const OptionField = ({ index, delay, value, type, ...rest }: any) => {
  const name = `multipleChoice.options.[${index}].content`;
  const label = `Opsi ${IndexMap[index]}`;
  return (
    <motion.div
      style={{ overflowX: "hidden" }}
      transition={{
        y: {
          delay,
          type: "tween",
        },
        opacity: {
          delay,
        },
      }}
      variants={variants}
      animate="animate"
      initial="init"
      exit="exit"
    >
      <Box sx={{ my: 2, pr: 2 }}>
        {type === "image" ? (
          <>
            <Typography>
              {label}
            </Typography>
            <ImageField name={name} label='Pilih gambar' />
          </>
        ) : (
          <FormField
            size="small"
            label={label}
            fullWidth
            name={`multipleChoice.options.[${index}].content`}
          />
        )}
      </Box>
    </motion.div>
  );
};

const AnswerField = () => {
  const { field } = useController({
    name: "multipleChoice.answer",
    defaultValue: 0,
  });
  return (
    <SelectField
      noUseForm
      {...field}
      label="Opsi jawaban yang benar"
      size="small"
      sx={{ my: 2, pr: 2 }}
      options={IndexMap.map((item, index) => ({
        value: index + 1,
        label: `Opsi ${item}`,
      }))}
    />
  );
};

export const MultipleChoise = () => {
  const type = useWatch({
    name: "multipleChoice.type",
    defaultValue: "text",
  });
  const additionalImage = useController({
    name: "multipleChoice.additionalFile",
    defaultValue: "",
  });
  const form = useFormContext();
  useEffect(() => {
    IndexMap.forEach((_, index) => {
      const name = `multipleChoice.options.[${index}].content`;
      form.setValue(name, "");
    });
  }, [type]);

  return (
    <div style={{ overflow: "hidden" }}>
      <Box sx={{ pr: 2, mb: 2 }}>
        <FormField
          sx={{ my: 2 }}
          label="Masukan pertanyaan quis"
          name="multipleChoice.question"
          size="small"
          fullWidth
        />
        <ImageField
          name={`multipleChoice.additionalFile`}
          label="Upload foto soal tambahan"
        />
      </Box>
      <div>
        <TypeSelector />
      </div>
      <div>
        <Box>
          <AnimatePresence exitBeforeEnter>
            {IndexMap.map((item, index) => (
              <OptionField
                {...item}
                type={type}
                index={index}
                width={type === "image" ? "100%" : "50%"}
                key={`${item}-${type}`}
                delay={(index + 1) * 0.1}
                label={IndexMap[index]}
              />
            ))}
          </AnimatePresence>
        </Box>
        <AnswerField />
      </div>
    </div>
  );
};
