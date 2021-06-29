import { types } from "mobx-state-tree";

const pageModel = types
  .model({
    tab: types.enumeration(["video", "discussion"]),
  })
  .actions((self) => ({
    changeTab(v: any) {
      self.tab = v;
    },
  }));
export const pageStore = pageModel.create({
  tab: "discussion",
});
