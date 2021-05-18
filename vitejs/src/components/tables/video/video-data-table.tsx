import * as React from "react";
import { VideoModelType } from "root/models/stores";
import { TableCell, TableRow } from "@material-ui/core";
import { Tableprops, TableBase } from "../table-base";
import { VideoDataTableProvider } from "./provider";
import { Row } from "./row";
import { VideoDialog } from "./VideoDialog";

type Props = Tableprops<VideoModelType>;

const Header = () => (
  <TableRow>
    <TableCell>Nama</TableCell>
    <TableCell colSpan={2}>Durasi video</TableCell>
  </TableRow>
);

export const VideoDataTable = (props: Props) => {
  return (
    <VideoDataTableProvider {...props}>
      <VideoDialog />
      <TableBase {...props} headerRenderer={Header} rowRenderer={Row} />
    </VideoDataTableProvider>
  );
};
