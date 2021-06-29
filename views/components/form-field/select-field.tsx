import * as React from "react";
import {
  ControllerProps,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { MenuItem, TextField, TextFieldProps } from "@material-ui/core";
import { Controller } from "react-hook-form";
import { FormFieldProps } from "./form-field";

export type Option = {
  label: React.ReactNode | string;
  value: any;
};

export type Props = {
  options: Option[];
  controller?: UseControllerReturn;
  name: string;
} & Omit<FormFieldProps, "select" | "name">;

const defaultOption: Option = {
  value: "__disabled__",
  label: "Pilih salah satu opsi",
};

export class SelectField extends React.Component<Props, any> {
  options: Option[];

  constructor(props: Props) {
    super(props);
    this.options = [defaultOption, ...this.props.options];
  }

  handleFormChange = (value: any) => {
    if (this.props.controller) {
      const { controller } = this.props;
      if (controller) {
        const { onChange } = controller.field;
        onChange(value);
      }
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    this.handleFormChange(val);
  };

  findInOption = (value: any) =>
    this.options.find((item) => item.value === value);

  getErrorProps = () => {
    if (!this.props.controller) {
      return {};
    }
    const { fieldState } = this.props.controller;
    return {
      error: Boolean(fieldState.error),
      helperText: fieldState.error?.message ?? "",
    };
  };

  getValue = () => {
    const findItems = (value: any) => {
      if (!value) return "__disabled__";
      const check = this.findInOption(value);
      if (!check) return "__disabled__";
      return check.value;
    };

    if (this.props.controller) {
      const {
        field: { value },
      } = this.props.controller;
      return findItems(value);
    }
    const { value } = this.props;
    return findItems(value);
  };

  getFieldProps = (): TextFieldProps => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { options: _, controller, ...rest } = this.props;
    return {
      ...rest,
      ...this.getErrorProps(),
      SelectProps: {
        ...(rest.SelectProps ?? {}),
        inputRef: controller?.field.ref,
      },
      onChange: this.handleChange,
      value: this.getValue(),
    };
  };

  render() {
    const fieldProps = this.getFieldProps();
    return (
      <div>
        <TextField {...fieldProps} select fullWidth>
          {this.options.map((item) => (
            <MenuItem
              disabled={item.value === defaultOption.value}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

export const selectFieldFactory = (options: Option[]) => {
  const Render = ({ name, noUseForm, ...rest }: Omit<Props, "options">) => {
    const form = useFormContext();
    const controllerProps: ControllerProps | Props =
      noUseForm || !form
        ? {
            name,
            ...rest,
            options,
          }
        : {
            render(p: any) {
              const _props: Props = {
                ...rest,
                name,
                controller: p,
                options,
              } as Props;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return <SelectField {..._props} />;
            },
            name,
          };

    if (!form || noUseForm) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <SelectField {...(controllerProps as Props)} />;
    }
    return <Controller {...(controllerProps as ControllerProps)} />;
  };
  return Render;
};
