import { createContext, useContext, useState } from "react";
import { UserModelType } from "@root/models";

type State = {
  user: UserModelType | null;
  action: "edit" | "activation" | "delete";
};

export function useStudentFormProvider() {
  const [state, setState] = useState<State>({
    user: null,
    action: "activation",
  });
  const changeStudent = (user: any) => {
    setState({
      user,
      action: user.status ? "edit" : "activation",
    });
  };
  const handleClose = () => {
    setState({
      user: null,
      action: "activation",
    });
  };
  const changeAction = (action: State["action"]) => {
    setState({
      ...state,
      action,
    });
  };
  return {
    ...state,
    changeStudent,
    handleClose,
    changeAction,
  };
}
export type UseStudentForm = ReturnType<typeof useStudentFormProvider>;
export const StudentFormContext = createContext<null | UseStudentForm>(null);
export function useStudentForm() {
  return useContext(StudentFormContext) as UseStudentForm;
}
