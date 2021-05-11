import * as React from "react";
import { VideoModelType } from "root/models/stores";
import { TableCell, TableRow } from "@material-ui/core";
import { Tableprops, TableBase } from "../table-base";

type Props = Tableprops<VideoModelType>;

const Header = () => (
  <TableRow>
    <TableCell>Nama</TableCell>
  </TableRow>
);
const RowRenderer = ({ model }: { model: VideoModelType }) => {
  return (
    <TableRow>
      <TableCell>{model.title}</TableCell>
    </TableRow>
  );
};

export const VideoDataTable = (props: Props) => {
  return (
    <TableBase {...props} headerRenderer={Header} rowRenderer={RowRenderer} />
  );
};
