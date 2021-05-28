import * as React from "react";
import { Layer, Stage } from "react-konva";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { useContext, useEffect, useRef, useState } from "react";
import Konva from "konva";

type Props = {
  height: number;
  width: number;
};

interface IKonvaProvider {
  stageHeight: number;
  stageWidth: number;
  layer: Konva.Layer;
  stage: Konva.Stage;
}

const Context = React.createContext<null | IKonvaProvider>(null);

export function useKonva() {
  return useContext(Context) as IKonvaProvider;
}

function useStageLayer() {
  const stageRef = useRef<null | Konva.Stage>(null);
  const layerRef = useRef<null | Konva.Layer>(null);
  const [state, setter] = useState<{
    layer: null | Konva.Layer;
    stage: null | Konva.Stage;
  }>({ layer: null, stage: null });

  useEffect(() => {
    if (!state.layer || !state.stage)
      setter({
        layer: layerRef.current,
        stage: stageRef.current,
      });
  }, [stageRef, layerRef, state]);
  return {
    ...state,
    stageRef,
    layerRef,
  };
}

export const KonvaProvider = ({
  children,
  height,
  width,
}: React.PropsWithChildren<Props>) => {
  const { nodeRef, dimension } = useNodeDimension();
  const { stage, layer, layerRef, stageRef } = useStageLayer();

  const contextVal: IKonvaProvider = {
    stageHeight: dimension.height,
    stageWidth: dimension.width,
    stage: stage as Konva.Stage,
    layer: layer as Konva.Layer,
  };
  return (
    <Context.Provider value={contextVal}>
      <div style={{ height, width }} ref={nodeRef as any}>
        {!dimension.height ? null : (
          <Stage ref={stageRef} height={height} width={width}>
            <Layer ref={layerRef}>
              <Context.Provider value={contextVal}>
                {!stage || !layer ? null : children}
              </Context.Provider>
            </Layer>
          </Stage>
        )}
      </div>
    </Context.Provider>
  );
};
