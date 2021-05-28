import * as React from "react";
import { ButtonProps } from "@material-ui/core/Button";
import { Button, CircularProgress } from "@material-ui/core";

type Props = Omit<ButtonProps, "startIcon"> & {
  loading: boolean;
  icon: React.ReactNode;
};

export const LoadingButton = ({ loading, icon, ...rest }: Props) => {
  return (
    <Button
      {...rest}
      disabled={rest.disabled || loading}
      startIcon={loading ? <CircularProgress size={15} /> : icon}
    />
  );
};
