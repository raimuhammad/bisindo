import * as React from "react";
import { useStore, Action } from "./provider";
import {
  Box,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { VideoModelType } from "@root/models";
import { useNodeDimension } from "@hooks/use-node-dimension";
import { Apps } from "@material-ui/icons";

const useMenuClass = makeStyles(() => ({
  paper: {
    backgroundColor: "transparent",
    width: 200,
  },
  icon: {
    height: 10,
    width: 10,
    marginRight: 10,
  },
  menuItem: {},
  menu: {
    padding: 0,
  },
}));

const buttons = [
  { title: "Edit", action: "EDIT" },
  { title: "Tampilkan konten", action: "WATCH" },
  { title: "Deskripsi", action: "DESCRIPTION" },
  { title: "Quis", action: "QUIZ" },
];

const RowMenu = ({ model }: { model: VideoModelType }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { thumbnail } = model;
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { itemHandler } = useStore();

  const handler = (action: Action) => {
    return () => {
      handleClose();
      itemHandler(model, action)();
    };
  };

  const classes = useMenuClass();

  return (
    <>
      <IconButton onClick={handleClick} className={classes.icon}>
        <Apps />
      </IconButton>
      <Menu
        style={{ width: 500, padding: 0 }}
        MenuListProps={{ className: classes.menu }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div style={{ padding: 0 }}>
          <img alt="img" style={{ width: 350 }} src={thumbnail} />
        </div>
        {buttons.map((item) => (
          <MenuItem
            key={item.action}
            className={classes.menuItem}
            onClick={handler(item.action as Action)}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const Row = ({ model }: { model: VideoModelType }) => {
  return (
    <TableRow>
      <TableCell>
        <Box component="span" display="flex" alignItems="center">
          <RowMenu model={model} />
          <Typography component="span">{model.title}</Typography>
        </Box>
      </TableCell>
      <TableCell>{model.durationText}</TableCell>
      <TableCell>{model.grade.name}</TableCell>
    </TableRow>
  );
};

export const DataTable = () => {
  const { data } = useStore();
  const {
    nodeRef,
    dimension: { height },
  } = useNodeDimension();

  const tableHeight = `calc(80vh - ${height}px)`;

  return (
    <Paper>
      {!height ? null : (
        <TableContainer style={{ height: tableHeight }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Judul</TableCell>
                <TableCell>Durasi</TableCell>
                <TableCell>Batch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <Row model={item} key={item.id} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box
        component="div"
        padding={2}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={(nodeRef as unknown) as any}
      >
        <h1>LOL</h1>
      </Box>
    </Paper>
  );
};
