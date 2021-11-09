import { TextFieldProps } from "@mui/material";
import { ReactNode } from "react";

export type Option = {
  label: ReactNode | string;
  value: any;
};

export type FormProps = Omit<TextFieldProps, "name" | "onChange"> & {
  name: string;
  onChange?(value: any): void;
  noUseForm?: boolean;
  options?: Array<Option>;
};
