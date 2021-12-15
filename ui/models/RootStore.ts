import { Instance } from "mobx-state-tree";
import { RootStoreBase } from "./RootStore.base";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type RootStoreType = Instance<typeof RootStore.Type>;

export const RootStore = RootStoreBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
}));
