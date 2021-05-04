import { Instance, types } from "mobx-state-tree";
import { createContext } from "react";

const action = (self: any) => {
  const setHeaderHeight = (node: any) => {
    if (node) {
      self.headerHeight = node.getBoundingClientRect().height;
    }
  };
  const setPageHeight = (node: number) => {
    self.pageHeight = node;
  };
  return {
    setHeaderHeight,
    setPageHeight,
  };
};

const view = (model: any) => {
  return {
    get renderChild() {
      return Boolean(model.appbarHeight);
    },
    get contentHeight() {
      return model.pageHeight - model.headerHeight;
    },
  };
};

const store = types
  .model({
    pageHeight: types.number,
    headerHeight: types.number,
  })
  .actions(action)
  .views(view);

export const pageLayoutStore = store.create({
  pageHeight: 0,
  headerHeight: 0,
});

export type ILayoutPage = Instance<typeof store["Type"]>;

export const Context = createContext<null | Instance<typeof store["Type"]>>(
  null
);
