/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum SortOrder {
  ASC="ASC",
DESC="DESC"
}

/**
* SortOrder
 *
 * The available directions for ordering a list of records.
*/
export const SortOrderEnumType = types.enumeration("SortOrder", [
        "ASC", // Sort records in ascending order.
  "DESC", // Sort records in descending order.
      ])
