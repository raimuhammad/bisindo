import { Component, createRef, RefObject } from "react";
import { LetterNode, UseLetterSequence } from "./types";
import Konva from "konva";
import { Stage, Layer } from "react-konva";
import { makeImageRect } from "@components/quiz-viewer/letter-sequence/utils";
import faker from "faker";
import { colors } from "@components/quiz-viewer/colors";
import { find } from "lodash";
import { LetterSequenceContext } from "./provider";
import { ImageContainer } from "./image-container";
import { Context as KonvaContext } from "../konva-provider";
import { Controller } from "./controller";
import { shuffle } from "lodash";

type Props = {
  text: string;
  width: number | string;
  height: number | string;
  onSubmit?(v: boolean): Promise<void>;
};
type State = {
  nodes: LetterNode[];
  mode: "letter" | "image";
  showHint: boolean;
  enableDrag: boolean;
};

const getColor = (current: Array<string>): string => {
  const random = faker.random.arrayElement(colors);
  const f = find(current, random);
  if (f) return getColor(current);
  return random;
};
const makeNodeInitial = (
  index: number,
  string: string,
  current: Array<string>
) => {
  return {
    id: `rect-${index}-node`,
    text: string,
    bg: getColor(current),
  };
};

export class Hoc extends Component<Props, State> {
  stage: RefObject<Konva.Stage>;
  layer: RefObject<Konva.Layer>;

  constructor(props: any) {
    super(props);
    this.state = {
      nodes: [],
      mode: "image",
      showHint: false,
      enableDrag: true,
    };
    this.stage = createRef<Konva.Stage>();
    this.layer = createRef<Konva.Layer>();
  }

  toggleMode = () => {
    return this.setState({
      ...this.state,
      mode: this.state.mode === "letter" ? "image" : "letter",
    });
  };

  toggleHint = () => {
    return this.setState({
      ...this.state,
      showHint: !this.state.showHint,
    });
  };

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
      });
      currentColors.push(node.bg);
    });
    return nodes;
  };

  prepareNodes = () => {
    this.setState({
      nodes: [...this.getNodes()],
    });
  };

  getItems = () => {
    if (this.state.showHint) {
      return this.getNodes(false);
    }
    return this.state.nodes;
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

  swap = (targetIndex: number, siblingIndex: number) => {
    const next = [...this.state.nodes];
    const target = next[targetIndex];
    const sibling = next[siblingIndex];
    next[siblingIndex] = {
      ...sibling,
      y: target.y,
      x: target.x,
    };
    next[targetIndex] = {
      ...next[targetIndex],
      x: sibling.x,
      y: sibling.y,
    };
    this.setState({
      nodes: [...next],
    });
  };

  getNodeState = (
    index: number
  ): [LetterNode, (v: Partial<LetterNode>) => void] => {
    const { nodes } = this.state;
    const setter = (values: Partial<LetterNode>) => {
      const { nodes } = this.state;
      const arr = [...this.state.nodes];
      const curr = arr[index];
      arr[index] = {
        ...curr,
        ...values,
      };
      this.setState({
        nodes: [...arr],
      });
    };
    return [nodes[index], setter];
  };

  toggleDrag = () =>
    this.setState({
      enableDrag: !this.state.enableDrag,
    });

  getContextValues = (): UseLetterSequence => ({
    nodes: this.state.nodes,
    text: this.props.text,
    swap: this.swap,
    getNodeState: this.getNodeState,
    toggleHint: this.toggleHint,
    toggleMode: this.toggleMode,
    mode: this.state.mode,
    showHint: this.state.showHint,
    enableDrag: this.state.enableDrag,
    toggleDrag: this.toggleDrag,
    onSubmit: this.props.onSubmit,
  });

  render() {
    return (
      <LetterSequenceContext.Provider value={this.getContextValues()}>
        <Stage
          height={this.props.height as number}
          width={window.innerWidth}
          ref={this.stage}
        >
          <Layer ref={this.layer}>
            <KonvaContext.Provider
              value={{
                stage: this.stage as any,
                layer: this.layer as any,
              }}
            >
              <LetterSequenceContext.Provider value={this.getContextValues()}>
                {this.getItems().map((item, index) => (
                  <ImageContainer index={index} key={item.id} {...item} />
                ))}
              </LetterSequenceContext.Provider>
            </KonvaContext.Provider>
          </Layer>
        </Stage>
        <Controller />
      </LetterSequenceContext.Provider>
    );
  }
}
