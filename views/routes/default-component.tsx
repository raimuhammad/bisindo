import * as React from "react";
import { RouteChildrenProps } from "react-router-dom";

export const DefaultComponent = ({ match, location }: RouteChildrenProps) => {
  return (
    <>
      <h1>{location.pathname}</h1>
      <p>coming soon</p>
    </>
  );
};
