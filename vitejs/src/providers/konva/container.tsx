import React from "react";
import { makeStyles } from "@material-ui/core";

const useClasses = makeStyles(() => ({
  root: {
    flexGrow: 1,
    position: "relative",
  },
}));

const Component = (
  { children }: React.PropsWithChildren<any>,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const classes = useClasses();
  return (
    <div className={classes.root} ref={ref}>
      {children}
    </div>
  );
};

export const Container = React.forwardRef(Component);
