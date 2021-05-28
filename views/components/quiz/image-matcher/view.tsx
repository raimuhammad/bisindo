import * as React from "react";
import { KonvaProvider } from "@providers/konva/konva-provider";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { ImageMatchProvider } from "./image-match-provider";
import { ItemBox } from "./item-box";
import { ArrowRenderer } from "./arrow-renderer";

const percentOfWindow = (n: number, k: "innerWidth" | "innerHeight") => {
  return (n / 100) * window[k];
};

export const View = ({
  text,
  height,
  width,
}: {
  text: string;
  height: number;
  width: number;
}) => {
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
            <ImageMatchProvider text={text}>
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
