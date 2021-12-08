import { Component, createRef, RefObject } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import { ImageNode, UseImageMatch, ArrowNode } from "./types";
import { makeNodeInitial, makeImageRect } from "./utils";
import { Images } from "./images";
import { Context as KonvaContext } from "../konva-provider";
import { ImageMatchContext } from "./provider";
import { ArrowRenderer } from "./arrow-renderer";
import { onDrawing } from "./utils";
import { shuffle } from "lodash";
import { Controller } from "./controller";
import { AppBar } from "@mui/material";

type Props = {
  stageHeight: number;
  text: string;
};
type State = {
  nodes: ImageNode[];
  shufledNodes: ImageNode[];
  showHint: boolean;
  arrows: ArrowNode[];
};

export class Hoc extends Component<Props, State> {
  stage: RefObject<Konva.Stage>;
  layer: RefObject<Konva.Layer>;
  headerRef: RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      nodes: [],
      shufledNodes: [],
      showHint: false,
      arrows: [],
    };
    this.stage = createRef<Konva.Stage>();
    this.layer = createRef<Konva.Layer>();
    this.headerRef = createRef<HTMLDivElement>();
  }
  getNodes = (shuffled = true) => {
    const { text } = this.props;
    const stage = this.stage.current as Konva.Stage;
    const items = text
      .split(" ")
      .join("")
      .split("")
      .filter((item) => item !== " ");
    const nodes: any[] = [];
    const currentColors: string[] = [];
    const posMapper = makeImageRect({
      stage,
      text: items.join(""),
    });
    (shuffled ? shuffle(items) : items).forEach((_, index) => {
      const node = makeNodeInitial(index, _, currentColors);
      nodes.push({
        ...node,
        ...posMapper("", index),
        hasArrow: false,
      });
      currentColors.push(node.bg);
    });
    return nodes;
  };

  prepareNodes = () => {
    const nodes = this.getNodes(false);
    const shufledNodes = this.getNodes(true).map((item, index) => {
      return {
        ...item,
        bg: nodes[index].bg,
      };
    });
    this.setState({
      nodes,
      shufledNodes: shufledNodes,
    });
  };

  getArrows = () => {
    if (this.state.showHint) {
      return this.state.nodes.map((item, index): ArrowNode => {
        const shufledIndex = this.state.shufledNodes.findIndex(s=>s.text === item.text);
        const shufled = this.state.shufledNodes[shufledIndex];
        return {
          toId: `item-image-${shufledIndex}`,
          fromId: `item-text-${index}`,
          bg: item.bg,
          to: item.text,
          from: item.text,
          arrowIndex: index,
          points: [
            shufled.x + (item.width / 2 ),
            item.height,
            (shufled.x + (shufled.width / 2)),
            (this.stage.current as any).height() - (item.height),
          ]
        };
      });
    }
    return this.state.arrows;
  };

  componentDidMount = () => {
    this.prepareNodes();
  };

  componentDidUpdate = (
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ) => {
    if (prevProps.text !== this.props.text) {
      this.prepareNodes();
    }
  };
  mouseHandler = (index: number) => {
    return (event: any) => {
      const handler = onDrawing({
        index,
        stage: this.stage.current as any,
        layer: this.layer.current as any,
        nodes: this.state.nodes,
      })(event);
      return handler.then((result) => {
        if (result.arrow)
          this.setState((prev) => {
            if (result.arrow) {
              prev.arrows.push(result.arrow);
            }
            return {
              ...prev,
              nodes: result.nodes,
            };
          });
      });
    };
  };

  getStageHeight = (): number => {
    if (this.headerRef.current) {
      return this.props.stageHeight - this.headerRef.current.clientHeight;
    }
    return 0;
  };

  popArrow = () => {
    this.setState((prev) => {
      const arrow = prev.arrows.pop();
      if (arrow) prev.nodes[arrow.arrowIndex].hasArrow = false;
      return {
        ...prev,
      };
    });
  };

  toggleHint = () => {
    this.setState({
      showHint: ! this.state.showHint
    })
  }

  getContextValues = (): UseImageMatch => {
    return {
      mouseHandler: this.mouseHandler,
      arrows: this.getArrows(),
      popArrow: this.popArrow,
      nodes: this.state.nodes,
      toggleHint: this.toggleHint
    };
  };

  render() {
    return (
      <ImageMatchContext.Provider value={this.getContextValues()}>
        <AppBar color="transparent" position="static" ref={this.headerRef}>
          <Controller />
        </AppBar>
        <Stage
          ref={this.stage}
          width={window.innerWidth}
          height={this.getStageHeight()}
        >
          <Layer ref={this.layer}>
            <KonvaContext.Provider
              value={{
                stage: this.stage as any,
                layer: this.layer as any,
              }}
            >
              <ImageMatchContext.Provider value={this.getContextValues()}>
                <Images items={this.state.nodes} />
                <Images pos="end" items={this.state.shufledNodes} />
                <ArrowRenderer showHint={this.state.showHint} arrows={this.getArrows()} />
              </ImageMatchContext.Provider>
            </KonvaContext.Provider>
          </Layer>
        </Stage>
      </ImageMatchContext.Provider>
    );
  }
}
