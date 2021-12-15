import * as React from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type Props = Omit<TextFieldProps, "onChange"> & {
  controller?: ReturnType<typeof useController> | null;
  onChange(e: any): void;
};

/**
 * @todo logic for select props
 */
class Field extends React.Component<Props> {
  getValue = () => {
    const { type = "text", select, controller } = this.props;
    switch (type) {
      case "number": {
        return 0;
      }
      case "money": {
        return 0;
      }
      default: {
        if (select) {
          return "__default__";
        }
        if (controller) {
          const { value } = controller.field;
          if (!(value instanceof File)) {
            return value ?? "";
          }
        }
        if (this.props.value) {
          return this.props.value;
        }
        return "";
      }
    }
  };

  handleChange = (e: any) => {
    const value = e.target.value;
    const { onChange } = this.props;
    onChange && onChange(value);
    if (this.props.controller) {
      this.props.controller.field.onChange(value);
    }
  };

  propBuilder(): TextFieldProps {
    const { controller, ...rest } = this.props;
    const base: any = {
      onChange: this.handleChange,
      value: this.getValue(),
    };
    if (controller) {
      const {
        field: { ref, ...inputProps },
        fieldState,
      } = controller;
      if (fieldState.error) {
        const { message } = fieldState.error;
        base.helperText = message;
        base.error = true;
      }
      base.onChange = (e: any) => {
        inputProps?.onChange(e);
        this.handleChange(e);
      };
      return {
        ...rest,
        ...inputProps,
        ...base,
        inputRef: ref,
        inputProps: {
          ...(rest.inputProps ?? {}),
        },
      } as TextFieldProps;
    }
    return { ...rest, ...base } as TextFieldProps;
  }

  render() {
    return <TextField {...this.propBuilder()} />;
  }
}

// export type Option = { label: React.ReactNode; value: any };

export type FormFieldProps = Omit<TextFieldProps, "name" | "onChange"> & {
  name: string;
  noUseForm?: boolean;
  onChange?(e: any): void;
};

export const FormField = ({ noUseForm, ...rest }: FormFieldProps) => {
  const form = useFormContext();
  if (!form && !noUseForm && !rest.onChange) {
    throw new Error("Please provide onChange props if without use useForm");
  }
  if (noUseForm) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Field {...(rest as Props)} />;
  }
  const controller = useController({
    name: rest.name,
    control: form.control,
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Field controller={controller} {...(rest as Props)} />;
};
