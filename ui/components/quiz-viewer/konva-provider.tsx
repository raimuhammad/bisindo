import { Stage, Layer } from "react-konva";
import { useQuizDimension } from "./quiz-viewer-container";
import {createContext, useContext, useRef} from "react";
import Konva from "konva";

const useKonvaProvider = () => {
  const layer = useRef<Konva.Layer>(null);
  const stage = useRef<Konva.Stage>(null);
  return {
    layer,
    stage,
  };
};
type IKonvaProvider = ReturnType<typeof useKonvaProvider>;
export const Context = createContext<null | IKonvaProvider>(null);
export const KonvaProvider = ({ children }: any) => {
  const { height, width } = useQuizDimension();
  const context = useKonvaProvider();
  return (
    <Context.Provider value={context}>
      <Stage
        ref={context.stage}
        height={height as number}
        width={window.innerWidth}
      >
        <Layer ref={context.layer}>
          <Context.Provider value={context}>
            {children}
          </Context.Provider>
        </Layer>
      </Stage>
    </Context.Provider>
  );
};
export function useKonva(): IKonvaProvider{
  return useContext(Context) as IKonvaProvider;
}