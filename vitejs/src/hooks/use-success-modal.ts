import { useSnackbar } from "notistack";
import { useEffect } from "react";

type Options = {
  depedencies: boolean;
  message: string;
  callback(): void;
};

export function useSuccessModal({ callback, depedencies, message }: Options) {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (depedencies) {
      callback();
      enqueueSnackbar(message, {
        variant: "success",
      });
    }
  }, [depedencies]);
}
