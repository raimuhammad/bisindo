import Konva from "konva";
import React from "react";
import { Layer, Stage } from "react-konva";
import { Container } from "./container";

type IKonvaProvider = {
  stage: Konva.Stage;
  layer: Konva.Layer;
  attachPortal(node: React.ReactNode, className: string): void;
  stageDimension: Record<"height" | "width", number>;
};

const Context = React.createContext<null | IKonvaProvider>(null);

type State = {
  listenerAttached: boolean;
  portalNode: React.ReactNode | null;
  portalClassName: string;
  height: number;
  width: number;
};

export function useKonva(): IKonvaProvider {
  return React.useContext(Context) as IKonvaProvider;
}

export class KonvaProvider extends React.Component<any, State> {
  stageRef: React.RefObject<Konva.Stage>;
  layerRef: React.RefObject<Konva.Layer>;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.stageRef = React.createRef();
    this.layerRef = React.createRef();
    this.containerRef = React.createRef();
    this.state = {
      listenerAttached: false,
      portalClassName: "",
      portalNode: null,
      width: 0,
      height: 0,
    };
  }

  attachPortal = (portalNode: React.ReactNode, portalClassName: string) => {
    this.setState({
      portalNode,
      portalClassName,
    });
  };

  reCalcDimension = () => {
    const div = this.containerRef.current;
    if (div) {
      this.setState({
        height: div.clientHeight,
        width: div.clientWidth,
      });
    }
  };

  componentDidMount() {
    if (this.containerRef.current) {
      window.addEventListener("resize", this.reCalcDimension);
      this.reCalcDimension();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.reCalcDimension);
  }

  getValues = (): IKonvaProvider =>
    ({
      stage: this.stageRef.current,
      layer: this.layerRef.current,
      attachPortal: this.attachPortal,
      stageDimension: {
        height: this.state.height,
        width: this.state.width,
      },
    } as IKonvaProvider);
  getStageDimension = (): Record<"height" | "width", number> => {
    const container = this.containerRef.current;
    if (!container) {
      return { height: 0, width: 0 };
    }
    return {
      height: this.state.height,
      width: this.state.width,
    };
  };

  render() {
    const shouldRender = Boolean(
      this.stageRef && this.layerRef && this.stageRef.current
    );
    const { portalNode, portalClassName } = this.state;
    return (
      <Container ref={this.containerRef}>
        {portalNode && portalClassName ? (
          <div className={portalClassName}>{portalNode}</div>
        ) : null}
        <Stage ref={this.stageRef} {...this.getStageDimension()}>
          <Layer ref={this.layerRef}>
            {!shouldRender ? null : (
              <Context.Provider value={this.getValues()}>
                {this.props.children}
              </Context.Provider>
            )}
          </Layer>
        </Stage>
      </Container>
    );
  }
}
