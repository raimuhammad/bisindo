import { createContext, useContext, useState } from "react";
import type { QuizModelType } from "@root/models";

type State = {
  selected: null | QuizModelType;
  action: null | "delete" | "quiz";
};
const initial = {
  selected: null,
  action: null,
};
export function useQuizListProvider() {
  const [selected, setSelected] = useState<State>(initial);
  const handleSelected = (selected: QuizModelType) => {
    return () =>
      setSelected({
        selected,
        action: "quiz",
      });
  };
  const onDeleteSelected = (selected: QuizModelType) => {
    return () =>
      setSelected({
        selected,
        action: "delete",
      });
  };
  return {
    ...selected,
    onDeleteSelected,
    handleSelected,
    handleClose: () => setSelected(initial),
  };
}
type UseQuizInfo = ReturnType<typeof useQuizListProvider>;
export const Context = createContext<null | UseQuizInfo>(null);
export function useQuizInfo() {
  return useContext(Context) as UseQuizInfo;
}
