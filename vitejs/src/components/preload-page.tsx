import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreBaseQueries } from "root-model";
import voca from "voca";
import { observer } from "mobx-react";
import { LoadingBackdrop } from "./loading-backdrop";
import { useQuery } from "root/models/stores";

type Props = {
  root: RootModel;
  routeProp: RouteComponentProps;
  queryKey: RootStoreBaseQueries;
  identifier: string;
  children(model: any): React.ReactNode;
};
type State<T extends Record<string, any> = Record<string, any>> = {
  /**
   * Penanda kalau identifier dari url tidak di temukan
   */
  identifierNotExists: boolean;
  /**
   * Penanda kalau sedang menarik data dari server
   */
  loading: boolean;
  /**
   * Penanda kalau id yang di cari tidak di temukan
   */
  notExists: boolean;
  /**
   * Informasi data yang di ambil dari graphql
   */
  model: T | null;
};

@observer
class Page extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      identifierNotExists: false,
      loading: true,
      model: null,
      notExists: false,
    };
  }

  get params(): Record<string, any> {
    const { match } = this.props.routeProp;
    if (!match.params || !Object.keys(match.params).length) {
      return {};
    }
    return match.params;
  }

  fetch = (variables: Record<string, any>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const promise = this.props.root[this.props.queryKey](variables);
    const result = voca(this.props.queryKey)
      .replace("query", "")
      .camelCase()
      .value();
    this.setState({ loading: true });
    promise.then((data: any) => {
      console.log(result);
      if (data[result]) {
        return this.setState({
          model: data[result],
          loading: false,
        });
      }
      return this.setState({
        notExists: true,
        loading: false,
      });
    });
  };

  componentDidMount() {
    /**
     * Check apakah url memiliki id
     * contoh : grade/:id
     */
    const identifier = this.params;
    if (!identifier[this.props.identifier]) {
      return this.setState({ identifierNotExists: true });
    }
    return this.fetch(identifier);
  }
  render() {
    const { loading, notExists, identifierNotExists, model } = this.state;
    if (loading) {
      return <LoadingBackdrop loading />;
    }
    if (identifierNotExists) {
      return <div>Model identifier not exists</div>;
    }
    return (
      <>{notExists ? <p>Model not exists</p> : this.props.children(model)}</>
    );
  }
}

export type PreloadPageProp = {
  queryKey: Props["queryKey"];
  identifier?: string;
};
export type PreloadComponentProp<T> = {
  model: T;
};

export function preloadPageFactory<T>(
  { queryKey, identifier = "id" }: PreloadPageProp,
  Component: React.ComponentType<PreloadComponentProp<T>>
) {
  const Node = (props: RouteComponentProps) => {
    const { store } = useQuery();
    return (
      <Page
        root={(store as unknown) as RootModel}
        routeProp={props}
        queryKey={queryKey}
        identifier={identifier}
      >
        {(model: T) => <Component model={model} />}
      </Page>
    );
  };
  return Node;
}
