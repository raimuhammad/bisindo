import * as React from "react";
import { UseControllerReturn, useController } from "react-hook-form";
import { createContext, createRef, useContext } from "react";

type FieldProps = {
  onFileChange?(file: File): void;
  onUrlChange?(url: string): void;
  accept?: HTMLInputElement["accept"];
  name: string;
  controller?: UseControllerReturn;
  initialUrl?: string;
};

type FieldState = {
  previewUrl: string;
  type: string;
};

type UseFileUpload = {
  previewUrl: string;
  type: string;
  clickHandler(): void;
  reset(): void;
};

const Ctx = createContext<UseFileUpload | null>(null);

export const useFileUpload = (): UseFileUpload =>
  useContext(Ctx) as UseFileUpload;

class Provider extends React.Component<FieldProps, FieldState> {
  fileRef: React.RefObject<HTMLInputElement>;

  constructor(props: FieldProps) {
    super(props);
    this.fileRef = createRef<HTMLInputElement>();
    this.state = {
      previewUrl: this.props.initialUrl ?? "",
      type: "",
    };
  }

  handler = () => {
    if (this.fileRef.current) {
      this.fileRef.current.click();
    }
  };

  getContext = (): UseFileUpload => {
    return {
      clickHandler: this.handler,
      reset: this.reset,
      ...this.state,
    };
  };

  setFormValue = (file: File) => {
    const { field } = this.props.controller as UseControllerReturn;
    field.onChange(file);
  };

  reset = () => {
    const { field } = this.props.controller as UseControllerReturn;
    field.onChange(undefined);
    this.setState({
      previewUrl: "",
      type: "",
    });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      this.setState({ previewUrl: url, type: file.type }, () => {
        this.props.controller && this.setFormValue(file);
      });
    }
  };

  render() {
    return (
      <Ctx.Provider value={this.getContext()}>
        {this.props.children}
        <input
          ref={this.fileRef}
          onChange={this.onChange}
          type="file"
          accept={this.props.accept}
          style={{ display: "none" }}
        />
      </Ctx.Provider>
    );
  }
}

export const FileUploadProvider = ({
  children,
  name,
  ...rest
}: React.PropsWithChildren<FieldProps>) => {
  const controller = useController({
    name,
  });
  return (
    <Provider name={name} {...rest} controller={controller}>
      {children}
    </Provider>
  );
};
