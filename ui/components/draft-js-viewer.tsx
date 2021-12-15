import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import makeStyles from "@mui/styles/makeStyles";

type Props = {
  data: string;
};
const useClassses = makeStyles((theme) => ({
  root: {
    "& > *": {
      fontFamily: "Roboto!important",
    },
  },
  editor: {
    "& > *": {
      fontFamily: "Roboto!important",
    },
  },
}));

const parser = (data: any): any => {
  const parse = JSON.parse(data);
  if (typeof parse === "string") {
    return parser(parse);
  }
  return parse;
};

export const DraftJsViewer = ({ data }: Props) => {
  const classes = useClassses();
  try {
    const parsed = convertFromRaw(parser(data));
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
    console.log(e);
    return null;
  }
};
