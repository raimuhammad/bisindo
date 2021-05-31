import * as React from "react";
import { UserModelType } from "@root/models";
import { Action } from "./type";
import { useCallback, useState } from "react";
import { useToggle } from "@hooks/use-toggle";

type State = {
  user: null | UserModelType;
  action: Action | null;
};

const initial: State = {
  user: null,
  action: null,
};

type IUserManagement = State & {
  handleAction(v: State & { active: boolean }, cb?: () => void): () => void;
  close(): void;
  isCloseDisabled: boolean;
  whenLoading(v: boolean): void;
};

const Context = React.createContext<null | IUserManagement>(null);

export function useUserManagement(): IUserManagement {
  return React.useContext(Context) as IUserManagement;
}

export const UserManagementProvider = ({ children }: any) => {
  const [state, setter] = useState<State>(initial);
  const [isCloseDisabled, { inline }] = useToggle();
  const handleAction = useCallback(
    ({ active, ...state }: State & { active: boolean }, cb?: () => void) => {
      return () => {
        setter(active ? initial : state);
        if (cb) {
          cb();
        }
      };
    },
    []
  );
  const close = useCallback(() => {
    setter(initial);
  }, []);
  const ctx: IUserManagement = {
    ...state,
    isCloseDisabled,
    whenLoading: inline,
    handleAction,
    close,
  };
  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};
