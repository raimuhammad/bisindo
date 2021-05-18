import { VideoModelType } from "root/models/stores";
import * as React from "react";
import { useToggle } from "hooks/use-toggle";
import { Tableprops } from "components/tables/table-base";

export type Action = "edit" | "view" | "delete";

export type UseVideoDataTable = {
  selected: VideoModelType | null;
  action: null | Action;
  handleAction(model: VideoModelType, action: Action): void;
  handleClose(): void;
  setHasLoading(v: boolean): void;
  refresh(): void;
};
const initial: Omit<
  UseVideoDataTable,
  "setHasLoading" | "handleAction" | "handleClose" | "refresh"
> = {
  selected: null,
  action: null,
};

const useDataTableProvider = (refresh: () => void): UseVideoDataTable => {
  const [{ selected, action }, setValue] = React.useState<typeof initial>(
    initial
  );
  const [hasLoading, { inline }] = useToggle();
  const handleAction = (model: VideoModelType, action: Action) => {
    setValue({
      selected: model,
      action,
    });
  };
  const handleClose = () => {
    if (!hasLoading) {
      setValue(initial);
    }
  };
  const onRefresh = () => {
    refresh();
    setValue(initial);
  };

  return {
    selected,
    action,
    handleClose,
    handleAction,
    setHasLoading: inline,
    refresh: onRefresh,
  };
};

const Context = React.createContext<null | UseVideoDataTable>(null);

export function useVideoDataTable(): UseVideoDataTable {
  return React.useContext(Context) as UseVideoDataTable;
}

type Props = Tableprops<VideoModelType>;

export const VideoDataTableProvider = (
  props: React.PropsWithChildren<Props>
) => {
  const ctxVal = useDataTableProvider(() => props.onPagingChange(1));
  return <Context.Provider value={ctxVal}>{props.children}</Context.Provider>;
};
