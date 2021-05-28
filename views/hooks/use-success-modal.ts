import { useSnackbar } from "notistack";
import { useCallback, useEffect } from "react";
import { useToggle } from "@hooks/use-toggle";

type Options = {
  depedencies: boolean;
  message: string;
  callback(): void;
  disableAutoShow?: boolean;
};

export function useSuccessModal({
  callback,
  depedencies,
  message,
  disableAutoShow,
}: Options) {
  const { enqueueSnackbar } = useSnackbar();
  const [show, { inline }] = useToggle();
  const handleClose = useCallback(() => {
    try {
      inline(true);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }, []);
  useEffect(() => {
    if (depedencies && !disableAutoShow) {
      handleClose();
    }
  }, [depedencies]);
  const showModal = () => {
    inline(false);
    callback();
    enqueueSnackbar(message, {
      variant: "success",
    });
  };

  useEffect(() => {
    if (show && !disableAutoShow) {
      showModal();
    }
  }, [show]);
  return showModal;
}
