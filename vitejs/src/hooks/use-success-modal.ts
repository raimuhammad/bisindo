import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useToggle } from "hooks/use-toggle";

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
  const [show, { inline, force }] = useToggle();
  useEffect(() => {
    if (depedencies) {
      inline(true);
    }
  }, [depedencies]);
  const showModal = () => {
    callback();
    enqueueSnackbar(message, {
      variant: "success",
      onClose: force(false),
    });
    inline(false);
  };

  useEffect(() => {
    if (show && !disableAutoShow) {
      showModal();
    }
  }, [show]);
  return showModal;
}
