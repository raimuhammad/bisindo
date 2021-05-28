import * as React from "react";
import { WrapPaginator } from "@components/form-field/wrap-paginator";
import { services } from "@services/content-service";
import { VideoModelType } from "@root/models";
import { createContext, useContext, useState } from "react";
import { usePaginatorContext } from "@hooks/use-paginator";
import { useNavigate } from "@hooks/use-navigate";
import { observer } from "mobx-react";

export type Action = "WATCH" | "EDIT" | "QUIZ" | "DESCRIPTION";

interface State {
  action: Action | null;
  selected: VideoModelType | null;
  itemHandler(model: VideoModelType, a: Action): () => void;
  close(): void;
}

type UseStore = VideoPaginator & State;

const Ctx = createContext<null | UseStore>(null);

export function useStore(): UseStore {
  return useContext(Ctx) as UseStore;
}

const Store = observer(({ children }: any) => {
  const paginatorCtx = usePaginatorContext() as VideoPaginator;

  const [{ selected, action }, setter] = useState<
    Omit<State, "itemHandler" | "close">
  >({
    action: null,
    selected: null,
  });

  const { navigateHandler } = useNavigate();

  const handler = (model: VideoModelType, action: Action) => {
    if (action === "QUIZ") {
      return navigateHandler("/quiz/:videoId", { videoId: model.id });
    }
    return () => {
      setter({ selected: model, action });
    };
  };
  const close = () => setter({ action: null, selected: null });

  const ctx: UseStore = {
    itemHandler: handler,
    selected,
    action,
    close,
    ...paginatorCtx,
  };
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
});

export const Wrapper = (Com: React.ComponentType<any>) => {
  const wrapper = (props: any) => {
    return (
      <Store>
        <Com {...props} />
      </Store>
    );
  };
  return wrapper;
};

export const Provider = (C: React.ComponentType<any>) =>
  WrapPaginator({
    Component: Wrapper(C),
    ...services.paginateOption,
  });
