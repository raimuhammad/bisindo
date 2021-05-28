/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */

import { IObservableArray } from "mobx"
import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder, withTypedRefs } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { PaginatorInfoModel, PaginatorInfoModelType } from "./PaginatorInfoModel"
import { PaginatorInfoModelSelector } from "./PaginatorInfoModel.base"
import { QuizModel, QuizModelType } from "./QuizModel"
import { QuizModelSelector } from "./QuizModel.base"
import { RootStoreType } from "./index"


/* The TypeScript type that explicits the refs to other models in order to prevent a circular refs issue */
type Refs = {
  data: IObservableArray<QuizModelType>;
}

/**
 * QuizPaginatorBase
 * auto generated base class for the model QuizPaginatorModel.
 *
 * A paginated list of Quiz items.
 */
export const QuizPaginatorModelBase = withTypedRefs<Refs>()(ModelBase
  .named('QuizPaginator')
  .props({
    __typename: types.optional(types.literal("QuizPaginator"), "QuizPaginator"),
    /** Pagination information about the list of items. */
    paginatorInfo: types.union(types.undefined, types.late((): any => PaginatorInfoModel)),
    /** A list of Quiz items. */
    data: types.union(types.undefined, types.array(MSTGQLRef(types.late((): any => QuizModel)))),
  })
  .views(self => ({
    get store() {
      return self.__getStore<RootStoreType>()
    }
  })))

export class QuizPaginatorModelSelector extends QueryBuilder {
  paginatorInfo(builder?: string | PaginatorInfoModelSelector | ((selector: PaginatorInfoModelSelector) => PaginatorInfoModelSelector)) { return this.__child(`paginatorInfo`, PaginatorInfoModelSelector, builder) }
  data(builder?: string | QuizModelSelector | ((selector: QuizModelSelector) => QuizModelSelector)) { return this.__child(`data`, QuizModelSelector, builder) }
}
export function selectFromQuizPaginator() {
  return new QuizPaginatorModelSelector()
}

export const quizPaginatorModelPrimitives = selectFromQuizPaginator()
