import * as React from "react";
import { GradeModelType } from "@root/models";
import { createContext, useContext, useState } from "react";
import { usePaginatorContext } from "@hooks/use-paginator";
import { observer } from "mobx-react";
import { WrapPaginator } from "@components/form-field/wrap-paginator";
import { services } from "@services/batch-service";

type Action = "UPDATE" | "CREATE";

type State = {
  selected: GradeModelType | null;
  action: null | Action;
};

interface BatchPage extends State {
  setSelected(model: GradeModelType): void;
  setAction(): void;
  close(): void;
}

const initial: State = {
  action: null,
  selected: null,
};

type Store = BatchPage & BatchPaginator;

const Ctx = createContext<null | Store>(null);

export function useStore(): Store {
  return useContext(Ctx) as Store;
}

const BatchPageStore = observer(({ children }: any) => {
  const [state, setter] = useState<State>(initial);
  const setSelected: BatchPage["setSelected"] = (selected) =>
    setter({
      selected,
      action: "UPDATE",
    });
  const setAction = () => setter({ selected: null, action: "CREATE" });
  const close = () => setter(initial);
  const paginator = usePaginatorContext() as BatchPaginator;
  const ctx: Store = {
    ...state,
    setSelected,
    setAction,
    close,
    ...paginator,
  };
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
});

export const Wrapper = (Com: React.ComponentType<any>) => {
  const wrapper = (props: any) => {
    return (
      <BatchPageStore>
        <Com {...props} />
      </BatchPageStore>
    );
  };
  return wrapper;
};

export const Provider = (C: React.ComponentType<any>) =>
  WrapPaginator({
    Component: Wrapper(C),
    ...services.paginateOptions,
  });
