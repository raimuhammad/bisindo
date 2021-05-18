import * as React from "react";
import {
  Controller,
  useController,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import {
  EditorState,
  convertFromRaw,
  RawDraftContentState,
  convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Theme, withTheme } from "@material-ui/core";
import { FormHelper } from "./form-helper";
import { string } from "yup";

type Props = {
  name: string;
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
  console.log(value);
  if (!value) return EditorState.createEmpty();
  if (typeof value === "object" && "blocks" in value) {
    return EditorState.createWithContent(value);
  }
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

const useGetEditorStyle = (theme: Theme) => {
  return {
    border: "solid 1px " + theme.palette.grey.A100,
    padding: theme.spacing(2),
    ...theme.shape,
  };
};

type FieldComponentProps = FieldProps & {
  theme: Theme;
};

class Field extends React.Component<FieldComponentProps, any> {
  EditorState: EditorState;

  constructor(props: any) {
    super(props);
    this.EditorState = getInitial(this.props.field);
  }

  onEditorChange = (editor: EditorState) => {
    const { field } = this.props;
    this.EditorState = editor;
    field.onChange(convertToRaw(editor.getCurrentContent()));
  };

  render() {
    const { theme, field } = this.props;
    const editorStyle = useGetEditorStyle(theme);
    return (
      <>
        <Editor
          toolbarStyle={toolbarStyle}
          editorState={this.EditorState}
          editorStyle={editorStyle}
          onEditorStateChange={this.onEditorChange}
        />
        <FormHelper name={field.name} />
      </>
    );
  }
}

const Node = withTheme(Field);

export const TextEditor = ({ name }: Props) => {
  const form = useFormContext();
  const controller = useController({
    name,
  });
  return <Node {...controller} />;
};
