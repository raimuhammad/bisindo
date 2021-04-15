import * as React from "react";
import Konva from "konva";
import {
  makArrow,
  attachLineToLayer,
  pointerInDimension,
  getImageNodes,
  makeBackActions,
  findGroupByItemId,
  arrowFactory,
  getLetterArrowPointerPos,
  getImageArrowPointerPos,
  extractAttrsFromNode,
} from "./utility";
import { useKonva } from "providers/konva/konva-provider";
import {
  ArrowNode,
  Item,
  NodeAttributes,
  ArrowAttributes,
  ItemAnswer,
} from "./types";

export type Props = {
  stage: Konva.Stage;
  layer: Konva.Layer;
  answers: ItemAnswer[];
  data: Item[];
  onSubmitted(args: ItemAnswer[]): void;
};
export type State = {
  arrows: ArrowNode[];
  items: Item[];
  drawingLine: null | Konva.Arrow;
};

type IImageMatcherProvider = Omit<State, "drawingLine"> & {
  registerHandler(args: Item): (e: any) => void;
  onBackAction(): void;
  onSubmitted(): void;
};

const Context = React.createContext<null | IImageMatcherProvider>(null);

class Provider extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    const items = this.props.data;
    this.state = {
      arrows: [],
      items,
      drawingLine: null,
    };
  }

  getAnswers = (): Array<ItemAnswer> => {
    const { arrows } = this.state;
    return arrows.map((item) => {
      const {
        itemQuestion,
        itemAnswer,
      } = extractAttrsFromNode<ArrowAttributes>(item.arrowNode);
      return {
        itemAnswer,
        itemQuestion,
      };
    });
  };

  handleWindowResize = () => {
    const { arrows } = this.state;
    const { stage } = this.props;
    arrows.forEach((item) => {
      if (item.to) {
        const imageNode = findGroupByItemId(stage, item.to);
        attachLineToLayer(item.arrowNode, imageNode as Konva.Group);
      }
    });
    this.redraw();
  };

  onBackAction = () => {
    const filtered = makeBackActions(this.state.arrows);
    this.setState(
      {
        arrows: filtered,
      },
      this.redraw
    );
  };

  geIsLineCanBeAttached = (node: Konva.Group, isLetter = false): boolean => {
    const key: keyof ArrowNode = isLetter ? "from" : "to";
    const { itemId } = extractAttrsFromNode<NodeAttributes>(node);
    const find = this.state.arrows.findIndex((item) => {
      return item[key] === itemId;
    });
    return find === -1;
  };

  registerArrow = (arg: ArrowNode) => {
    const current = this.state.arrows;
    this.setState({
      arrows: [...current, arg],
    });
  };

  onDrawingEnd = () => {
    const currentIds = this.state.arrows
      .map((item) => item.to)
      .filter((item) => item) as Array<string>;
    const pos = this.props.stage.getPointerPosition();
    let shouldRemove = true;
    const { drawingLine } = this.state;
    if (pos) {
      const imageNode = getImageNodes(
        this.props.stage,
        currentIds
      ).find((item) => pointerInDimension(pos, item));
      if (imageNode && pos && drawingLine) {
        shouldRemove = false;
        const lineAttributes = extractAttrsFromNode<ArrowAttributes>(
          drawingLine
        );
        const imageAttribute = extractAttrsFromNode<NodeAttributes>(imageNode);
        this.registerArrow({
          from: lineAttributes.itemFrom,
          to: imageAttribute.itemId,
          arrowNode: drawingLine,
        });
        drawingLine.setAttr("itemAnswer", imageAttribute.itemLetter);
        attachLineToLayer(drawingLine, imageNode);
      }
    }
    if (shouldRemove && drawingLine) {
      drawingLine.remove();
    }
    this.setState(
      {
        drawingLine: null,
      },
      this.redraw
    );
  };

  onDrawing = () => {
    const { drawingLine } = this.state;
    const { stage } = this.props;
    const pos = stage.getPointerPosition();
    if (drawingLine && pos) {
      const points = [
        drawingLine.points()[0],
        drawingLine.points()[1],
        pos.x,
        pos.y,
      ];
      drawingLine.points(points);
      this.redraw();
    }
  };

  redraw = () => {
    this.props.layer.batchDraw();
  };

  registerHandler = (items: Item) => {
    return (e: any) => {
      const target = e.currentTarget;
      const nodeAttributes = extractAttrsFromNode<NodeAttributes>(target);
      const pos = this.props.stage.getPointerPosition();
      const canBeAttached = this.geIsLineCanBeAttached(target, true);
      if (pos && canBeAttached) {
        const drawingLine = makArrow(target, pos, items);
        drawingLine.setAttr("itemFrom", nodeAttributes.itemId);
        drawingLine.setAttr("itemQuestion", nodeAttributes.itemLetter);
        this.props.layer.add(drawingLine);
        this.setState(
          {
            drawingLine,
          },
          this.redraw
        );
      }
    };
  };

  handleSubmit = () => {
    const { onSubmitted } = this.props;
    return onSubmitted(this.getAnswers());
  };
  getValue = (): IImageMatcherProvider => ({
    ...this.state,
    registerHandler: this.registerHandler,
    onBackAction: this.onBackAction,
    onSubmitted: this.handleSubmit,
  });
  drawWithAnswer = () => {
    const { answers, stage } = this.props;
    const mapperAnswer = answers.map((item) => {
      const letterNode = findGroupByItemId(
        stage,
        `letter-${item.itemQuestion}`
      );
      const imageNode = findGroupByItemId(stage, `image-${item.itemQuestion}`);
      const attributes = extractAttrsFromNode<NodeAttributes>(letterNode);
      const points = [
        ...getLetterArrowPointerPos(letterNode),
        ...getImageArrowPointerPos(imageNode),
      ];
      const lineNode = arrowFactory(attributes["data-content"].bgColor, points);
      lineNode.setAttr("itemQuestion", item.itemQuestion);
      lineNode.setAttr("itemAnswer", item.itemAnswer);
      this.props.layer.add(lineNode);
      return {
        arrowNode: lineNode,
        to: imageNode.attrs["itemId"],
        from: letterNode.attrs["itemId"],
      };
    });
    this.setState({
      arrows: mapperAnswer,
    });
    this.redraw();
  };

  componentDidMount() {
    this.props.stage.on("mousemove touchmove", this.onDrawing);
    this.props.stage.on("mouseup touchend", this.onDrawingEnd);
    window.addEventListener("resize", this.handleWindowResize);
    if (this.props.answers.length) {
      this.drawWithAnswer();
    }
  }
  componentWillUnmount() {
    this.props.stage.off("mousemove touchmove");
    this.props.stage.off("mouseup touchend");
    window.removeEventListener("resize", this.handleWindowResize);
  }
  render() {
    return (
      <Context.Provider value={this.getValue()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export function useImageMatcher(): IImageMatcherProvider {
  return React.useContext(Context) as IImageMatcherProvider;
}

export const ImageMatcherProvider = ({
  children,
  ...props
}: React.PropsWithChildren<Omit<Props, "stage" | "layer">>) => {
  const konva = useKonva();
  return (
    <Provider {...konva} {...props}>
      {children}
    </Provider>
  );
};
