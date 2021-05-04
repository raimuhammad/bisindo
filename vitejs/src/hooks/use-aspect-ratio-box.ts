import * as React from "react";

export function useAspectRatioBox() {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  const nodeRef = React.useRef<HTMLDivElement | null>(null);
  const getDimension = () => {
    if (!rect) {
      return { height: 0, width: 0 };
    }
    const half = rect.width / 1.2;
    const height = Math.round((half / 16) * 9);
    return {
      height,
      width: "100%",
    };
  };
  React.useEffect(() => {
    if (nodeRef.current) {
      const cb = () => {
        if (nodeRef.current) {
          setRect(nodeRef.current?.getBoundingClientRect());
        }
      };
      cb();
      window.addEventListener("resize", cb);
      return () => {
        window.removeEventListener("resize", cb);
      };
    }
  }, [nodeRef.current]);
  return {
    nodeRef,
    style: getDimension(),
  };
}
