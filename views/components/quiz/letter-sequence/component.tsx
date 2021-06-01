import * as React from "react";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { KonvaProvider } from "@root/providers/konva/konva-provider";
import { Provider } from "./provider";
import { ItemBox } from "./item-box";
import { ILetterCheck } from "./type";

type Props = {
  height: number;
  width: number;
  text: string;
  showHint?: boolean;
  readOnly?: boolean;
  letterCheckRef?: React.MutableRefObject<ILetterCheck | undefined>;
  useImage?: boolean;
};
export const Component = ({
  height,
  width,
  text,
  showHint = false,
  readOnly = false,
  useImage = true,
  letterCheckRef,
}: Props) => {
  const { dimension, nodeRef } = useNodeDimension();
  return (
    <div
      ref={nodeRef as any}
      style={{
        height,
        width,
      }}
    >
      {dimension.height ? (
        <KonvaProvider height={dimension.height} width={dimension.width}>
          <Provider
            useImage={useImage}
            letterCheckRef={letterCheckRef}
            showHint={showHint}
            readOnly={readOnly}
            text={text}
          >
            <ItemBox />
          </Provider>
        </KonvaProvider>
      ) : null}
    </div>
  );
};
