import * as React from "react";
import { useController, UseControllerReturn } from "react-hook-form";
import {
  EditorState,
  convertFromRaw,
  RawDraftContentState,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Theme } from "@mui/material";
import withTheme from '@mui/styles/withTheme';
import { FormHelper } from "./form-helper";
import { MutableRefObject } from "react";

export type Action = {
  reset(): void;
};

type Props = {
  name: string;
  editorRef?: MutableRefObject<Action | null>;
  disableOptions?: boolean;
  placeholder?: string;
};

const toolbarStyle = {
  backgroundColor: "white",
  position: "sticky",
  top: 0,
  zIndex: 10,
};

type FieldProps = UseControllerReturn;
const parseJson = (value: any): Record<string, any> => {
  const obj = JSON.parse(value);
  if (typeof obj !== "object") {
    return parseJson(obj);
  }
  return obj;
};
const getInitial = (field: FieldProps["field"]) => {
  const value = field.value;
  if (!value) return EditorState.createEmpty();
  try {
    const json = parseJson(value) as RawDraftContentState;
    const checkProperty = "blocks" in json && "entityMap" in json;
    if (!checkProperty) return EditorState.createEmpty();
    const state = convertFromRaw(json);
    return EditorState.createWithContent(state);
  } catch (e) {
    return EditorState.createEmpty();
  }
};

type FieldComponentProps = FieldProps & {
  theme: Theme;
  editorRef?: MutableRefObject<Action | null>;
  disableOptions?: boolean;
  placeholder: string;
};

class Field extends React.Component<FieldComponentProps, any> {
  EditorState: EditorState;

  constructor(props: any) {
    super(props);
    this.EditorState = getInitial(this.props.field);
    if (typeof this.props.field.value === "string") {
      this.props.field.onChange(
        convertToRaw(this.EditorState.getCurrentContent())
      );
    }
    if (this.props.editorRef) {
      this.props.editorRef.current = {
        reset: this.reset,
      };
    }
  }

  reset = () => {
    this.EditorState = EditorState.createEmpty();
  };

  onEditorChange = (editor: EditorState) => {
    const { field } = this.props;
    this.EditorState = editor;
    field.onChange(convertToRaw(editor.getCurrentContent()));
  };

  render() {
    const toolbar = !this.props.disableOptions
      ? {}
      : {
          options: [],
        };
    return (
      <>
        <Editor
          onEditorStateChange={this.onEditorChange}
          toolbarHidden={this.props.disableOptions}
          toolbarStyle={toolbarStyle}
          editorState={this.EditorState}
          toolbar={toolbar}
          editorStyle={{
            minHeight: 300,
          }}
          placeholder={this.props.placeholder}
        />
        <FormHelper name={this.props.field.name} />
      </>
    );
  }
}

const Node = withTheme(Field);

export const TextEditor = ({
  name,
  editorRef,
  disableOptions = false,
  placeholder = "",
}: Props) => {
  const controller = useController({
    name,
  });
  return (
    <Node
      {...controller}
      placeholder={placeholder}
      editorRef={editorRef}
      disableOptions={disableOptions}
    />
  );
};
