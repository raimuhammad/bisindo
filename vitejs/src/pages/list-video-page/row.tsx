import * as React from "react";
import { VideoModelType } from "root/models/stores";
import {
  Box,
  Button,
  ButtonGroup,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { observer } from "mobx-react";
import { useToggle } from "hooks/use-toggle";
import { useVideoPageList } from "./page-properties";
import { useNavigate } from "hooks/use-navigate";
import { RowProps } from "components/data-table";

const useClasses = makeStyles(() => ({
  row: {
    padding: 0,
  },
  cell: {
    padding: 0,
    width: "70%",
  },
}));

const Buttons = ({ model }: { model: VideoModelType }) => {
  const page = useVideoPageList();
  const { navigateHandler } = useNavigate();
  const handler = () => page.attach(model);
  const quizHandler = navigateHandler(`/video/${model.id}/quiz`);
  return (
    <ButtonGroup size="small">
      <Button onClick={handler}>Deskripsi</Button>
      <Button onClick={quizHandler}>Quiz</Button>
      <Button>Download</Button>
      <Button>Hapus</Button>
    </ButtonGroup>
  );
};

export const Row = observer(({ model }: RowProps<VideoModelType>) => {
  const classes = useClasses();
  const [hoverd, { force }] = useToggle();
  return (
    <TableRow
      onMouseEnter={force(true)}
      onMouseLeave={force(false)}
      className={classes.row}
      hover
    >
      <TableCell width="60%" className={classes.cell}>
        <Box display="flex" alignItems="center">
          <img width={128} height={72} src={model.thumbnail} alt="" />
          <Box padding={1}>
            {hoverd ? (
              <Buttons model={model} />
            ) : (
              <Typography>{model.title}</Typography>
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell width="20%">{model.created_at}</TableCell>
      <TableCell width="20%">{model.durationText}</TableCell>
    </TableRow>
  );
});
