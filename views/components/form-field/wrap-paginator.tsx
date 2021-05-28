import * as React from "react";
import { observer } from "mobx-react";
import { PaginatorProvider, Opt, usePaginator } from "@hooks/use-paginator";

type Props = {
  Component: React.ComponentType;
} & Opt<any>;
export const WrapPaginator = ({ Component, ...options }: Props) => {
  const Node = observer((props: any) => {
    const ctx = usePaginator(options);
    return (
      <PaginatorProvider.Provider value={ctx}>
        <Component {...props} />
      </PaginatorProvider.Provider>
    );
  });
  return Node;
};
