import * as React from "react";
import { KonvaProvider } from "@providers/konva/konva-provider";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { ImageMatchProvider } from "./image-match-provider";
import { ItemBox } from "./item-box";
import { ArrowRenderer } from "./arrow-renderer";
import { ArrowState, ListenerArgs } from "./types";

type Props = {
  text: string;
  height: number;
  width: number;
  showHint?: boolean;
  answers?: Array<ArrowState>;
  listener?(args: ListenerArgs): void;
};

export const View = ({
  text,
  height,
  width,
  showHint = false,
  listener,
  answers = [],
}: Props) => {
  const { nodeRef, dimension } = useNodeDimension();
  return (
    <>
      <div
        ref={nodeRef as any}
        style={{
          height,
          width,
        }}
      >
        {!dimension.height ? null : (
          <KonvaProvider height={dimension.height} width={dimension.width}>
            <ImageMatchProvider
              answers={answers}
              listener={listener}
              showHint={showHint}
              text={text}
            >
              <ItemBox alignment="left" type="TEXT" />
              <ItemBox alignment="right" type="IMAGE" />
              <ArrowRenderer />
            </ImageMatchProvider>
          </KonvaProvider>
        )}
      </div>
    </>
  );
};
