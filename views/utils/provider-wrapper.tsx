import * as React from "react";

export const ProviderWrapper = (
  Provider: React.ComponentType<any>,
  Children: React.ComponentType<any>
) => {
  const Wrap = (props: any) => {
    return (
      <Provider>
        <Children {...props} />
      </Provider>
    );
  };
  return Wrap;
};
