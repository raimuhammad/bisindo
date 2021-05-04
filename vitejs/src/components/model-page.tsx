import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { rootModel } from "providers/app-provider";
import { ObservableMap } from "mobx";

export abstract class ModelPage<T, P, S> extends React.Component<P, S> {
  model: null | T = null;
  identifier: string;
  route: RouteComponentProps;

  constructor(props: any) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    if ("pageProps" in props) {
      const routerProp = props.pageProps;
      this.route = routerProp;
      this.identifier = this.getParams(routerProp.match);
    } else {
      const routerProp = props.pageProps as RouteComponentProps;
      this.identifier = this.getParams(routerProp.match);
      this.route = routerProp;
    }
  }

  setModel = () => {
    const items = rootModel[this.getKey()] as ObservableMap;
    const find = items.get(this.identifier);
    if (!find) {
      this.route.history.push(this.fallbackUrl());
    }
    this.model = (find as unknown) as T;
  };

  componentDidMount() {
    this.setModel();
  }

  abstract getKey(): keyof RootModel;
  abstract getParams(
    match: RouteComponentProps<Record<string, any>>["match"]
  ): string;
  abstract fallbackUrl(): string;
}
