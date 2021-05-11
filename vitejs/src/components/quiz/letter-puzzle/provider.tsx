import * as React from "react";
import { LetterPuzzle } from "classes/letter-puzzle/letter-puzzle";
import { useTheme } from "@material-ui/core";
import { useKonva } from "providers/konva/konva-provider";
import { observer } from "mobx-react";

const Context = React.createContext<null | LetterPuzzle>(null);

export function useLetterPuzzle(): LetterPuzzle {
  return React.useContext(Context) as LetterPuzzle;
}

export const Consumer = (
  Component: React.FC<{ instance: LetterPuzzle }>,
  instance: LetterPuzzle
) => {
  class UseLetterConsumer extends React.Component {
    render() {
      return <Component instance={instance} />;
    }
  }
  return observer(UseLetterConsumer);
};
export const Provider = ({ children }: React.PropsWithChildren<any>) => {
  const theme = useTheme();
  const { stage } = useKonva();
  const letterPuzzle = new LetterPuzzle({
    stage,
    letter: "makan",
    spacing: theme.spacing(1),
  });
  return <Context.Provider value={letterPuzzle}>{children}</Context.Provider>;
};
