/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum Trashed {
  ONLY="ONLY",
WITH="WITH",
WITHOUT="WITHOUT"
}

/**
* Trashed
 *
 * Specify if you want to include or exclude trashed results from a query.
*/
export const TrashedEnumType = types.enumeration("Trashed", [
        "ONLY", // Only return trashed results.
  "WITH", // Return both trashed and non-trashed results.
  "WITHOUT", // Only return non-trashed results.
      ])
