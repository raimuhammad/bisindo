import { useSnackbar } from "notistack";
import { useEffect } from "react";

type messageCallBack = () => string;

type Options = {
  message: messageCallBack | string;
  show: boolean;
  variant?: "error" | "success";
  callback?(v?: any): void;
};

export function usePopup({ message, show, variant, callback }: Options) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (show) {
      const getMessage = () => {
        if (typeof message === "function") {
          return message();
        }
        return message as string;
      };
      closeSnackbar();
      enqueueSnackbar(getMessage(), {
        variant,
      });
      if (callback) {
        callback();
      }
    }
  }, [show, variant]);
}
