import { types } from "mobx-state-tree";

const actions = (self: any) => {
  const updateAppbar = (node: HTMLElement) => {
    const rect = node.getBoundingClientRect();
    self.appbarHeight = rect.height;
    self.contentTop = rect.bottom;
  };
  const updatePageHeight = (node: any) => {
    if (node) {
      const rect = node.getBoundingClientRect();
      self.pageHeight = rect.height;
    }
  };
  const toggleSidebar = () => {
    self.sideBarOpen = !self.sideBarOpen;
  };
  const toggleAppbarStatus = (v: boolean) => {
    self.appbarHidden = v;
  };
  return {
    updateAppbar,
    toggleSidebar,
    toggleAppbarStatus,
    updatePageHeight,
  };
};

const views = (self: any) => {
  return {
    get contentStyle() {
      return {
        height: window.innerHeight - self.appbarHeight,
      };
    },
  };
};

const modelType = types
  .model({
    appbarHeight: types.number,
    appbarHidden: types.boolean,
    contentTop: types.number,
    sideBarOpen: types.boolean,
    pageHeight: types.number,
  })
  .views(views)
  .actions(actions);

export const layoutStore = modelType.create({
  appbarHeight: 0,
  contentTop: 0,
  pageHeight: 0,
  sideBarOpen: true,
  appbarHidden: false,
});

export function useLayout() {
  return layoutStore;
}
