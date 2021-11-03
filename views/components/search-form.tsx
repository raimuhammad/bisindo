import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { FormField } from "@components/form-field/form-field";

type Props<T extends string = "search"> = {
  fieldName?: T;
  handler(value: Record<T, string | undefined>): void;
  placeholder?: string;
  children?(classname: string): React.ReactNode;
};

const useClasses = makeStyles(() => ({
  divider: {
    height: 20,
    width: 2,
  },
  input: {
    // padding: 0,
  },
  button: {
    borderRadius: 0,
  },
}));

export const SearchForm = ({
  fieldName = "search",
  handler,
  placeholder = "Pencarian",
  children,
}: Props) => {
  const form = useForm({
    defaultValues: {
      [fieldName]: "",
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    const args: any = {
      [fieldName]: data[fieldName] ? `%${data[fieldName]}%` : undefined,
    };
    Object.keys(data).map((k) => {
      if (k === fieldName) {
        args[fieldName] = data[fieldName] ? `%${data[fieldName]}%` : undefined;
      } else {
        args[k] = data[k as keyof typeof data]
          ? data[k as keyof typeof data]
          : undefined;
      }
    });
    handler(args);
  });
  const onReset = () => {
    const values = form.getValues();
    const arg: any = {};
    Object.keys(values).forEach((k) => {
      arg[k] = undefined;
    });
    handler(arg);
    form.reset({});
  };
  const classes = useClasses();
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Box alignItems="center" bgcolor="white" display="flex">
          <FormField
            name="search"
            size="small"
            variant="standard"
            sx={{
              padding: 1,
              borderRadius: 2,
            }}
            placeholder={placeholder}
          />
          {children ? (
            <>
              <Divider orientation="vertical" className={classes.divider} />
              {children(classes.input)}
              <Divider orientation="vertical" className={classes.divider} />
            </>
          ) : null}
          <Button type="submit" className={classes.button} size="small">
            Cari
          </Button>
          <Divider orientation="vertical" className={classes.divider} />
          <Button onClick={onReset} className={classes.button} size="small">
            Reset
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};
