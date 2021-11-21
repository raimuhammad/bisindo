import type { RootStoreBaseMutations } from "@root-model";
import { useQuery } from "@root/models";
import { parseMutationQuerykey } from "@providers/model-provider/utils";
import { useState, createContext, useContext } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { Cancel, Delete } from "@mui/icons-material";
import { SubmitButton } from "@components/submit-button";
import { usePopup } from "@hooks/use-popup";

type Options = {
  api: RootStoreBaseMutations;
  callback(): void;
  getContentText(): string;
  getSuccesMessage?(): string;
};

export type UseDelete = ReturnType<typeof useDeleteApiProvider>;
export const DeleteContext = createContext<null | UseDelete>(null);
export const useDelete = (): UseDelete =>
  useContext(DeleteContext) as UseDelete;

const DeleteDialog = () => {
  const { open, handleCloseDialog, getContentText, loading, onConfirm } =
    useDelete();
  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogContent>{getContentText()}</DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          onClick={handleCloseDialog}
          startIcon={<Cancel />}
        >
          Batal
        </Button>
        <SubmitButton color='error' onClick={onConfirm} icon={<Delete />} loading={loading}>
          Hapus
        </SubmitButton>
      </DialogActions>
    </Dialog>
  );
};

export const useDeleteApiProvider = ({
  api,
  callback,
  getSuccesMessage,
  getContentText,
}: Options) => {
  const [selectedApi, setSelectedApi] = useState<RootStoreBaseMutations>(api);
  const resultKey = parseMutationQuerykey(selectedApi);
  const { loading, data, setQuery } = useQuery<any>();
  const [modelId, setModelId] = useState<string | null>(null);
  const [hidePopUp, setHidePopUp] = useState<boolean>(true);
  usePopup({
    message: getSuccesMessage ? getSuccesMessage() : "Data berhasil di hapus",
    callback() {
      setModelId(null);
      callback();
      setHidePopUp(true);
    },
    variant: "success",
    show: Boolean(data && data[resultKey]) && ! hidePopUp,
    autoShow: false
  });
  const handleCloseDialog = () => {
    if (!loading) {
      setModelId(null);
    }
  };
  const handleOpenDialog = (model: any, customApi?: RootStoreBaseMutations) => {
    return () => {
      if (customApi) {
        setSelectedApi(customApi);
      } else {
        setSelectedApi(api);
      }
      setModelId(model.id);
    };
  };
  const onConfirm = () => {
    setHidePopUp(false);
    return setQuery((root: any) => {
      return root[selectedApi]({ id: modelId });
    });
  };
  return {
    open: Boolean(modelId),
    loading,
    handleCloseDialog,
    handleOpenDialog,
    getContentText,
    Dialog: DeleteDialog,
    onConfirm,
  };
};
