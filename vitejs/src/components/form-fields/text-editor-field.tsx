import * as React from "react";
import {
  Controller,
  UseControllerReturn,
  useFormContext,
} from "react-hook-form";
import { EditorState, convertFromRaw, RawDraftContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Theme, withTheme } from "@material-ui/core";
import { FormHelper } from "./form-helper";

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

const getInitial = (field: FieldProps["field"]) => {
  const value = field.value;
  if (!value) return EditorState.createEmpty();
  const checkProperty = "blocks" in value && "entityMap" in value;
  if (!checkProperty) return EditorState.createEmpty();
  const state = convertFromRaw(value);
  return EditorState.createWithContent(state);
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
  editorState: EditorState;

  constructor(props: any) {
    super(props);
    this.editorState = EditorState.createEmpty();
  }

  onEditorChange = (editor: EditorState) => {
    this.editorState = editor;
  };
  onChange = (content: RawDraftContentState) => {
    const { field } = this.props;
    field.onChange(content);
  };
  componentDidMount() {
    if (this.props.field.value) {
      this.editorState = getInitial(this.props.field);
    }
  }
  render() {
    const { theme, field } = this.props;
    const editorStyle = useGetEditorStyle(theme);
    return (
      <>
        <Editor
          toolbarStyle={toolbarStyle}
          editorState={this.editorState}
          editorStyle={editorStyle}
          onEditorStateChange={this.onEditorChange}
          onChange={this.onChange}
        />
        <FormHelper name={field.name} />
      </>
    );
  }
}

const Node = withTheme(Field);

export const TextEditor = ({ name }: Props) => {
  const form = useFormContext();
  return (
    <Controller
      name={name}
      control={form.control}
      render={(props) => <Node {...props} />}
    />
  );
};
