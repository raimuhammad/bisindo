/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import { FormFieldProps } from "./form-field";
import { RootStoreBaseQueries } from "@root-model";
import voca from "voca";
import {
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

type QueryOptions = {
  query: RootStoreBaseQueries;
  toOptions(v: any): Option;
  builder?(i: any): typeof i;
};

type Option = {
  label: string;
  value: any;
};

export type Props = Omit<FormFieldProps, "onChange"> & {
  queryOptions?: QueryOptions;
  options?: Option[];
  value?: Option["value"];
  onChange?(value: Option["value"]): void;
  noUseForm?: boolean;
};

type State = {
  options: Option[];
  loading: boolean;
};

type FieldProps = Props & { controller?: UseControllerReturn };

class Field extends React.Component<FieldProps, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      options: [],
    };
  }

  onChange = (e: any, option: Option) => {
    const { onChange, controller } = this.props;
    if (controller) {
      const { field } = controller;
      return field.onChange(option ? option.value : "");
    }
    if (onChange) {
      return onChange(option ? option.value : "");
    }
  };

  getValue = () => {
    const { controller } = this.props;
    const id = controller ? controller.field.value : this.props.value;
    const find = this.state.options.find((item) => item.value === id);
    return (
      find ?? {
        label: "",
        value: "",
      }
    );
  };

  componentDidMount() {
    const { queryOptions, controller, onChange } = this.props;
    if (!controller && !onChange) {
      throw new Error("Please provide onChange if not using useform");
    }
    if (queryOptions) {
      const { query, builder, toOptions } = queryOptions;
      const resultKey = voca(query).replaceAll("query", "").camelCase().value();
      // @ts-ignore
      window.rootStore[query]({}, builder)
        .currentPromise()
        .then((data) => {
          if (data && data[resultKey as keyof typeof data]) {
            const options = (
              data[resultKey as keyof typeof data] as Array<any>
            ).map(toOptions);
            this.setState({ options, loading: false });
          }
        });
    }
  }

  getOptions = () => {
    return this.state.options;
  };

  getOptionValue = (option: any, v: any) => {
    if (!v) return false;
    return option.value === v.value;
  };
  getOptionLabel = (option: any) => {
    return option.label;
  };

  getErrorProps = () => {
    const { controller } = this.props;
    if (!controller) return {};
    return {
      error: Boolean(controller.fieldState.error?.message),
      helperText: controller.fieldState.error?.message,
    };
  };

  render() {
    const {
      onChange: _,
      controller: __,
      queryOptions: ___,
      ...rest
    } = this.props;
    return (
      <Autocomplete
        renderInput={(props) => (
          <TextField {...rest} {...props} {...(this.getErrorProps() as any)} />
        )}
        options={this.getOptions()}
        // @ts-ignore
        onChange={this.onChange}
        value={this.getValue()}
        getOptionLabel={this.getOptionLabel}
        isOptionEqualToValue={this.getOptionValue}
        getOptionDisabled={(opt) => opt.value === "__disabled__"}
      />
    );
  }
}

export const AutoCompleteField = ({ noUseForm, name, ...rest }: Props) => {
  const form = useFormContext();
  if (!form || noUseForm) {
    // @ts-ignore
    return <Field {...rest} name={name} />;
  }
  const controller = useController({ name });
  // @ts-ignore
  return <Field name={name} controller={controller} {...rest} />;
};
