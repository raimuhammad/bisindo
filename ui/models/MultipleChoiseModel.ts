import { Instance } from "mobx-state-tree";
import { MultipleChoiseModelBase } from "./MultipleChoiseModel.base";

/* The TypeScript type of an instance of MultipleChoiseModel */
export type MultipleChoiseModelType = Instance<typeof MultipleChoiseModel.Type>;

/* A graphql query fragment builders for MultipleChoiseModel */
export {
  selectFromMultipleChoise,
  multipleChoiseModelPrimitives,
  MultipleChoiseModelSelector,
} from "./MultipleChoiseModel.base";

/**
 * MultipleChoiseModel
 */
export const MultipleChoiseModel = MultipleChoiseModelBase.actions((self) => ({
  // This is an auto-generated example action.
  log() {
    console.log(JSON.stringify(self));
  },
}));
