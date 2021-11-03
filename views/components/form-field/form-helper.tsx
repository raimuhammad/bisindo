import * as React from "react";
import { useFormState } from "react-hook-form";
import { FormHelperText } from "@mui/material";

type Props = {
  name: string;
};

export const FormHelper = ({ name }: Props) => {
  const { errors } = useFormState();
  if (!errors[name]) return <React.Fragment />;
  const { message } = errors[name];
  return <FormHelperText error>{message}</FormHelperText>;
};
