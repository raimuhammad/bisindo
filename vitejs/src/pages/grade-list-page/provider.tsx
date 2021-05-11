// noinspection UnnecessaryLocalVariableJS

import * as React from "react";
import { GradeModelType, useQuery } from "root/models/stores";
import { observer } from "mobx-react";

export type Action = "edit" | "students" | "video" | "create";

type State = {
  action: null | Action;
  selected: null | GradeModelType;
};

type UseGradePage = {
  data: GradeModelType[];
  loading: boolean;
  handleAction(selected: GradeModelType | null, action: Action): void;
  handleClose(): void;
  fetch: () => void;
} & State;

const Context = React.createContext<UseGradePage | null>(null);

export function useGradePage() {
  return React.useContext(Context) as UseGradePage;
}
type Ref = {
  grades: GradeModelType[];
};

const useProvider = (): UseGradePage => {
  /**
   * Mengambil data grade
   */
  const { data, loading, setQuery } = useQuery<Ref>();

  const fetch = () => setQuery((root: RootModel) => root.queryGrades());
  React.useEffect(() => {
    fetch();
  }, []);

  const [{ selected, action }, setState] = React.useState<State>({
    selected: null,
    action: null,
  });
  const handleAction = (selected: GradeModelType | null, action: Action) => {
    setState({ selected, action });
  };
  const handleClose = () => setState({ selected: null, action: null });

  return {
    loading,
    selected,
    action,
    data: data && data.grades ? data.grades : [],
    handleClose,
    handleAction,
    fetch,
  };
};

export const Provider = observer(
  ({ children }: React.PropsWithChildren<any>) => {
    const { loading, data, ...rest } = useProvider();
    return (
      <Context.Provider value={{ loading, data, ...rest }}>
        {loading ? null : children}
      </Context.Provider>
    );
  }
);
export const Wrap = (Component: React.ComponentType) => {
  const Node = () => {
    return (
      <Provider>
        <Component />
      </Provider>
    );
  };
  return Node;
};
