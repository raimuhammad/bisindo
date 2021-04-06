import * as React from "react";
import { Stage, Layer } from "react-konva";
import { makeStyles, Paper } from "@material-ui/core";
import { useProvider, useStage, InStageContext, Context } from "./provider";
import { Box } from "./box";
import Konva from "konva";

type WrapStageProps = {
  parent: HTMLDivElement;
};

const WrapStage = ({
  children,
  parent,
}: React.PropsWithChildren<WrapStageProps>) => {
  const stageRef = React.useRef<Konva.Stage | null>(null);
  const stagevalue = useStage();
  const { setStage, stage } = stagevalue;
  React.useEffect(() => {
    if (stageRef.current) {
      setStage(stageRef.current);
    }
  }, [stageRef]);
  return (
    <Stage
      ref={stageRef}
      height={parent.clientHeight}
      width={parent.clientWidth}
    >
      {stage ? (
        <Context.Consumer>
          {() => {
            return (
              <InStageContext.Provider value={stagevalue}>
                <Layer>{children}</Layer>
              </InStageContext.Provider>
            );
          }}
        </Context.Consumer>
      ) : null}
    </Stage>
  );
};

const useClasses = makeStyles(() => ({
  root: {
    width: "80vw",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flexGrow: 1,
  },
}));

const Boxes = () => {
  const { items } = useStage(true);
  return (
    <>
      <Box items={items} isLetter />
      <Box items={items} isLetter={false} />
    </>
  );
};

export const Component = () => {
  const [container, setContainer] = React.useState<null | HTMLDivElement>(null);
  const ref = React.useRef<null | HTMLDivElement>(null);
  const classes = useClasses();
  React.useEffect(() => {
    if (ref.current) {
      setContainer(ref.current);
    }
  }, [ref]);
  const values = useProvider();
  return (
    <Context.Provider value={values}>
      <Paper elevation={4} className={classes.root}>
        <div className={classes.container} ref={ref}>
          {container ? (
            <WrapStage parent={container}>
              <Boxes />
            </WrapStage>
          ) : null}
        </div>
      </Paper>
    </Context.Provider>
  );
};
