import * as React from "react";
import {
  ControllerProps,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { MenuItem, TextField, TextFieldProps } from "@material-ui/core";
import { Controller } from "react-hook-form";

export type Option = {
  label: React.ReactNode | string;
  value: any;
};

type Props = {
  options: Option[];
  controller?: UseControllerReturn;
  name: string;
} & Omit<TextFieldProps, "select" | "name">;

type State = {
  selected: any;
};

const defaultOption: Option = {
  value: "__disabled__",
  label: "Pilih salah satu opsi",
};

export class SelectField extends React.Component<Props, State> {
  options: Option[];

  constructor(props: Props) {
    super(props);
    this.options = [defaultOption, ...this.props.options];
    let value = "__default__";
    if (props.controller) {
      value = props.controller.field.value ?? value;
    }
    const find = this.findInOption(value);
    this.state = {
      selected: find?.value ?? defaultOption.value,
    };
  }

  getValue = () => {
    const defaultVal = "__default__";
    const { controller } = this.props;
    let value = defaultVal;
    if (controller) {
      value = controller.field.value ?? value;
    }
    const find = this.findInOption(value);
    return find ? find.value : defaultVal;
  };

  handleFormChange = (value: any) => {
    const { controller } = this.props;
    if (controller) {
      const { onChange } = controller.field;
      onChange(value);
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const find = this.findInOption(val);
    this.setState(
      {
        selected: find ? find.value : "__default__",
      },
      () => this.handleFormChange(val)
    );
  };

  findInOption = (value: any) =>
    this.options.find((item) => {
      return item.value === value;
    });

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
  const Render = ({ name, ...rest }: Omit<Props, "options">) => {
    const form = useFormContext();
    const controllerProps: ControllerProps | Props = form
      ? {
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
        }
      : ({ name, ...rest, options } as Props);

    if (form) {
      return <Controller {...(controllerProps as ControllerProps)} />;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <SelectField {...(controllerProps as Props)} />;
  };
  return Render;
};
