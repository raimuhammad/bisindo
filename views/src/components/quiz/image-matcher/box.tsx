import * as React from "react";
import { useImageMatcher } from "./image-matcher-provider";
import { Item } from "./types";

export const Box = ({
  component: Node,
}: {
  component: React.FC<Item & { itemIndex: number }>;
}) => {
  const { items } = useImageMatcher();
  return (
    <>
      {items.map((item, index) => (
        <Node {...item} itemIndex={index} key={item.id} />
      ))}
    </>
  );
};
