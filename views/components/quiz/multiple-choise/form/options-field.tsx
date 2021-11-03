import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  useFileUpload,
  FileUploadProvider,
} from "@components/form-field/file-upload-field";
import { ImagePreview } from "./image-preview";
import { FormField } from "@components/form-field/form-field";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useToggle } from "@hooks/use-toggle";
import { selectFieldFactory } from "@components/form-field/select-field";

type OptionType = "image" | "text";

const TypeSwitcher = ({
  onChange,
  value,
}: {
  value: OptionType;
  onChange(v: OptionType): void;
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Jenis opsi jawaban</FormLabel>
      <RadioGroup
        onChange={(e: any, v: string) => onChange(v as OptionType)}
        value={value}
        row
        name="quiz"
      >
        <FormControlLabel
          value="text"
          control={<Radio color="secondary" />}
          label="Teks"
        />
        <FormControlLabel
          value="image"
          control={<Radio color="secondary" />}
          label="Gambar"
        />
      </RadioGroup>
    </FormControl>
  );
};

const IndexMap = ["A", "B", "C", "D"];

const FileType = ({ index }: { index: number }) => {
  const { previewUrl, clickHandler } = useFileUpload();
  return (
    <div>
      <Typography>Opsi {IndexMap[index]}</Typography>
      <Button onClick={clickHandler}>Pilih gambar</Button>
      {previewUrl ? <ImagePreview /> : null}
    </div>
  );
};

const Field = ({ indexNum, type }: { indexNum: number; type: OptionType }) => {
  const name = `options[${indexNum}]`;
  const Container = type === "image" ? FileUploadProvider : React.Fragment;
  const getName = (v: "content" | "type" | "index") => {
    return `${name}.${v}`;
  };
  const ContainerProps: any =
    type === "text"
      ? {}
      : {
          accept: "image/*",
          name: getName("content"),
        };
  const form = useFormContext();

  React.useEffect(() => {
    form.setValue(getName("type"), type);
    form.setValue(getName("index"), indexNum);
  }, [type]);

  return (
    <Box padding={2}>
      <Container {...ContainerProps}>
        {type === "text" ? (
          <FormField
            fullWidth
            variant="outlined"
            label={`Opsi ${IndexMap[indexNum]}`}
            name={getName("content")}
          />
        ) : (
          <FileType index={indexNum} />
        )}
      </Container>
    </Box>
  );
};

const WrightAnswerField = selectFieldFactory(
  IndexMap.map((item, index) => ({
    label: item,
    value: index,
  }))
);

export const OptionsField = () => {
  const [value, setValue] = useState<OptionType>("image");
  const form = useFormContext();

  useEffect(() => {
    IndexMap.forEach((item, index) => {
      form.setValue(`options[${index}].content`, "");
    });
  }, [value]);

  return (
    <>
      <Box padding={2}>
        <TypeSwitcher value={value} onChange={setValue} />
      </Box>
      <Box padding={2}>
        <WrightAnswerField
          variant="outlined"
          name="answer"
          label="Opsi jawaban yang benar"
        />
      </Box>
      {IndexMap.map((item, index) => (
        <Field indexNum={index} type={value} key={item} />
      ))}
    </>
  );
};
