import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Divider, makeStyles } from "@material-ui/core";
import { FormField } from "@components/form-field/form-field";

type Props<T extends string = "search"> = {
  fieldName?: T;
  handler(value: Record<T, string | undefined>): void;
  placeholder?: string;
};

const useClasses = makeStyles(() => ({
  divider: {
    height: 20,
    width: 2,
  },
  input: {
    padding: 0,
  },
  button: {
    borderRadius: 0,
  },
}));

export const SearchForm = ({
  fieldName = "search",
  handler,
  placeholder = "Pencarian",
}: Props) => {
  const form = useForm({
    defaultValues: {
      [fieldName]: "",
    },
  });
  const onSubmit = form.handleSubmit((data) => {
    handler({
      [fieldName]: data[fieldName] ? `%${data[fieldName]}%` : undefined,
    });
  });
  const onReset = () => {
    handler({ [fieldName]: undefined });
    form.setValue(fieldName, "");
  };
  const classes = useClasses();
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Box paddingLeft={2} alignItems="center" bgcolor="white" display="flex">
          <FormField
            name="search"
            size="small"
            placeholder={placeholder}
            InputProps={{
              disableUnderline: true,
              className: classes.input,
            }}
            inputProps={{ className: classes.input }}
          />
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
