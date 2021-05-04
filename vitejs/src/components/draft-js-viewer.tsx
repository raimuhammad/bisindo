import * as React from "react";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { makeStyles } from "@material-ui/core";

type Props = {
  data: string;
};
const useClassses = makeStyles((theme) => ({
  root: {
    "& > *": {
      fontFamily: "Roboto!important",
    },
    padding: theme.spacing(2),
  },
  editor: {
    "& > *": {
      fontFamily: "Roboto!important",
    },
  },
}));

export const DraftJsViewer = ({ data }: Props) => {
  const classes = useClassses();
  try {
    const parsed = convertFromRaw(JSON.parse(data));
    const state = EditorState.createWithContent(parsed);
    return (
      <div className={classes.root}>
        <Editor
          editorClassName={classes.editor}
          toolbarHidden
          readOnly
          toolbar={{}}
          editorState={state}
        />
      </div>
    );
  } catch (e) {
    return null;
  }
};
