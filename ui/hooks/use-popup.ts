import { useSnackbar } from "notistack";
import { useEffect } from "react";

type messageCallBack = () => string;

type Options = {
  message: messageCallBack | string;
  show: boolean;
  variant?: "error" | "success";
  callback?(v?: any): void;
  autoShow?: boolean;
};

export function usePopup({
  message,
  show,
  variant,
  callback,
  autoShow,
}: Options) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showPopup = () => {
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
  };

  useEffect(()=>{
    closeSnackbar()
    return ()=>{
      closeSnackbar()
    }
  }, [])

  useEffect(() => {
    if (autoShow && show) {
      if (callback) {
        callback();
      }
    }
    if (!autoShow && show) {
      if (callback) {
        callback();
      }
      showPopup();
    }
  }, [show, variant]);
  return showPopup;
}
