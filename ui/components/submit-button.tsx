import type { ReactNode } from "react";
import type { ButtonProps } from "@mui/material";
import { Button, CircularProgress } from "@mui/material";

type Props = ButtonProps & {
  icon: ReactNode;
  loading: boolean;
};
export const SubmitButton = ({ loading, disabled, icon, ...rest }: Props) => {
  return (
    <Button
      {...rest}
      startIcon={loading ? <CircularProgress size={20} /> : icon}
      type="submit"
      disabled={disabled || loading}
    />
  );
};
