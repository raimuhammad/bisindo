import * as React from "react";
import { UserModelType } from "root/models/stores";
import { TableCell, TableRow } from "@material-ui/core";
import { Tableprops, TableBase } from "../table-base";

type Props = Tableprops<UserModelType>;

const Header = () => (
  <TableRow>
    <TableCell>Nama</TableCell>
    <TableCell>Email</TableCell>
    <TableCell>Status</TableCell>
  </TableRow>
);
const UserRowRender = ({ model }: { model: UserModelType }) => {
  return (
    <TableRow>
      <TableCell>{model.name}</TableCell>
      <TableCell>{model.email}</TableCell>
      <TableCell>{model.active ? "Aktif" : "Tidak aktif"}</TableCell>
    </TableRow>
  );
};

export const UserDataTable = (props: Props) => {
  return (
    <TableBase {...props} headerRenderer={Header} rowRenderer={UserRowRender} />
  );
};
