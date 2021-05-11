import * as React from "react";
import { ChilProps as Props } from "./type";

export const Discussion = ({ grade }: Props) => {
  return <div>discussion for grade : {grade.name}</div>;
};
