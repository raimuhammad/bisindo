import { types } from "mobx-state-tree";

const initial = {
  tab: 0,
};

const action = (self: any) => {
  const reset = () => {
    Object.assign(self, initial);
  };
  const changeTab = (n: number) => {
    self.tab = n;
  };
  return {
    changeTab,
    reset,
  };
};

const store = types
  .model({
    tab: types.number,
  })
  .actions(action);

export const pagestore = store.create(initial);
