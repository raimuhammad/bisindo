import * as React from "react";
import { createContext, useContext, useState } from "react";
import { observer } from "mobx-react";
import { preloadPageFactory } from "@components/preload-page";
import { GradeModelType } from "@root/models";
import { RootStoreBaseQueries } from "@root-model";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useLayout } from "@root/layout";

export type TABS =
  | "QUIS-CHECK"
  | "STUDENT"
  | "VIDEO"
  | "VIDEO-ADD"
  | "DISCUSSION";
interface BatchShowPage extends UseBatchPage {
  activeTab: TABS;
  changeTab(t: TABS): void;
  controllerRef: React.MutableRefObject<HTMLDivElement>;
  contentHeight: number;
}
const Ctx = createContext<null | BatchShowPage>(null);
export function useStore() {
  return useContext(Ctx) as BatchShowPage;
}
const Store = ({
  children,
  ...rest
}: React.PropsWithChildren<UseBatchPage>) => {
  const [activeTab, setActiveTab] = useState<TABS>("DISCUSSION");
  const {
    nodeRef,
    dimension: { height },
  } = useNodeDimension();
  const layout = useLayout();
  const ctx: BatchShowPage = {
    activeTab,
    changeTab: setActiveTab,
    controllerRef: nodeRef as React.MutableRefObject<HTMLDivElement>,
    contentHeight: layout.getContentHeight(height),
    ...rest,
  };
  return <Ctx.Provider value={ctx}>{children}</Ctx.Provider>;
};

const Wrapper = (Com: React.ComponentType<any>) => {
  const wrapper = observer((props: UseBatchPage) => {
    return (
      <Store {...props}>
        <Com {...props} />
      </Store>
    );
  });
  return wrapper;
};

export const Provider = (C: React.ComponentType) =>
  preloadPageFactory<GradeModelType>(
    {
      identifier: "id",
      queryKey: RootStoreBaseQueries.queryGradeById,
    },
    Wrapper(C)
  );
