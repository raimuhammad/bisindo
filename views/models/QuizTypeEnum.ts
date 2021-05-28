/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */
/* tslint:disable */
import { types } from "mobx-state-tree"

/**
 * Typescript enum
 */

export enum QuizType {
  IMAGE_MATCH="IMAGE_MATCH",
LETTER_SEQUENCE="LETTER_SEQUENCE",
MULTIPLE_CHOICE="MULTIPLE_CHOICE"
}

/**
* QuizType
*/
export const QuizTypeEnumType = types.enumeration("QuizType", [
        "IMAGE_MATCH",
  "LETTER_SEQUENCE",
  "MULTIPLE_CHOICE",
      ])
