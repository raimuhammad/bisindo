import * as React from "react";
import {
  UseControllerReturn,
  useFormContext,
  Controller,
} from "react-hook-form";
import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import { useToggle } from "hooks/use-toggle";
import { FormHelper } from "./form-helper";

export type FileUploadFieldProps = {
  onFileChange?(file: File): void;
  onUrlChange?(url: string): void;
  name: string;
  accept: HTMLInputElement["accept"];
};
const useClasses = makeStyles((theme) => ({
  controller: {
    ...theme.shape,
    borderColor: theme.palette.primary.light,
    border: "solid 1px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    '&[aria-colspan="12"]': {
      display: "block!important",
    },
    alignItems: "center",
    cursor: "pointer",
  },
  titleContainer: {
    width: "80%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    '&[aria-colspan="12"]': {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1),
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      marginBottom: 0,
    },
  },
}));
type UploadControllerProps = Omit<FileUploadFieldProps, "name"> &
  UseControllerReturn;

const InfoBox = ({ file, onClick }: { onClick(): void; file: File | null }) => {
  const classes = useClasses();
  const [displayBlock, { inline }] = useToggle();
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  React.useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect() as DOMRect;
      if (rect.width < 600) {
        inline(true);
      }
    }
  }, [containerRef]);
  return (
    <div ref={containerRef}>
      <Box
        aria-colspan={displayBlock ? 12 : 0}
        className={classes.controller}
        onClick={onClick}
      >
        <Box display="flex" height="100%">
          <Button color="primary" fullWidth>
            Pilih file
          </Button>
        </Box>
        {file ? (
          <Box alignItems="center" flexGrow={1} paddingX={2} display="flex">
            <Box
              aria-colspan={displayBlock ? 12 : 0}
              className={classes.titleContainer}
            >
              <Typography>{file.name}</Typography>
            </Box>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

type State = {
  file: File | null;
};

class UploadController extends React.Component<UploadControllerProps, State> {
  inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      file: null,
    };
  }
  componentDidMount() {
    const { value } = this.props.field;
    if (value && value instanceof File) {
      this.setState({
        file: value,
      });
    }
  }
  handleClick = () => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  };
  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onFileChange, onUrlChange, field } = this.props;
    const files = e.target.files;
    if (files && files.length && files[0]) {
      const file = files[0];
      field.onChange(file);
      onFileChange && onFileChange(file);
      if (onUrlChange) {
        const url = URL.createObjectURL(file);
        onUrlChange(url);
      }
    }
  };
  render() {
    return (
      <>
        <input
          ref={this.inputRef}
          style={{ display: "none" }}
          type="file"
          accept={this.props.accept}
          onChange={this.onInputChange}
        />
        <InfoBox onClick={this.handleClick} file={this.state.file} />
        <FormHelper name={this.props.field.name} />
      </>
    );
  }
}

export const FileUploadField = ({ name, ...rest }: FileUploadFieldProps) => {
  const form = useFormContext();
  const render = (props: UseControllerReturn) => {
    return <UploadController {...props} {...rest} />;
  };
  return (
    <div>
      <Controller control={form.control} render={render} name={name} />
    </div>
  );
};
