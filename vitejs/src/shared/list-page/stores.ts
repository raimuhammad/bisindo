import { RootStoreType } from "root/models/stores";
import { IModelType, types } from "mobx-state-tree";
import { rootModel } from "root/providers/app-provider";
import { ObservableMap } from "mobx";
import { createContext } from "react";

type Ref = IModelType<any, any>;

function makeRef<T extends Ref = Ref>(
  subType: T,
  subTypeKey: keyof RootStoreType
) {
  return types.reference(subType as T, {
    get(identifier: T["Type"]) {
      const items = rootModel[subTypeKey] as ObservableMap;
      return items.get(identifier);
    },
    set(value: any): T["Type"] {
      return value.id;
    },
  });
}

export function storeFactory<T extends Ref = Ref>(
  subType: T,
  subTypeKey: keyof RootStoreType
) {
  const reference = makeRef<T>(subType, subTypeKey);
  const actions = (self: any) => {
    return {
      detach() {
        self.selected = null;
      },
      attach(model: T["Type"]) {
        self.selected = model;
      },
    };
  };
  const modelType = types
    .model({
      selected: types.maybeNull(reference),
    })
    .actions(actions);
  return modelType.create({
    selected: null,
  });
}

export interface IlistPageStore<T> {
  attach(model: T): void;
  detach(): T;
  selected: null | T;
}

export const Context = createContext<null | IlistPageStore<any>>(null);
