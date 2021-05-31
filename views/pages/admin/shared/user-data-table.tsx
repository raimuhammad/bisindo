import * as React from "react";
import { StudentGradeModelType, UserModelType } from "@root/models";
import {
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { Apps } from "@material-ui/icons";
import { useCallback, useState } from "react";
import { Action } from "@pages/shared/user-management/type";
import { useUserManagement } from "@pages/shared/user-management/provider";
import { observer } from "mobx-react";

type RowProps = {
  model: StudentGradeModelType;
  onClick(): void;
  active: boolean;
  hideBatch?: boolean;
};

const UserMenu = ({
  model: user,
  active,
}: {
  model: UserModelType;
  active: boolean;
}) => {
  const [anchor, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleClick = (e: any) => {
    setAnchorEl(e.target);
  };
  const handleClose = () => setAnchorEl(null);
  const { handleAction } = useUserManagement();

  const handlerFactory = useCallback(
    (action: Action) => {
      return handleAction(
        {
          user,
          active,
          action,
        },
        handleClose
      );
    },
    [active]
  );

  const onInvitation = handlerFactory("invitation");
  const onEdit = handlerFactory("edit");
  const onActivation = handlerFactory("activation");

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <Apps />
      </IconButton>
      <Menu onClose={handleClose} open={Boolean(anchor)} anchorEl={anchor}>
        <MenuItem onClick={onInvitation}>Kirim ulang invitasi</MenuItem>
        <MenuItem onClick={onActivation}>
          Ganti password / Aktifkan akun
        </MenuItem>
        <MenuItem onClick={onEdit}>Edit akun</MenuItem>
      </Menu>
    </>
  );
};

export const Row = observer(
  ({ model, hideBatch = false, active }: RowProps) => {
    const width = hideBatch ? "50%" : "33%";
    return (
      <>
        <TableRow>
          <TableCell style={{ width }}>
            <span>
              <UserMenu model={model.student} active={active} />
            </span>
            <span>{model.student.name}</span>
          </TableCell>
          {!hideBatch ? (
            <TableCell style={{ width }}>{model.grade.name}</TableCell>
          ) : null}
          <TableCell style={{ width }}>
            {model.student.active ? "Aktif" : "Tidak aktif"}
          </TableCell>
        </TableRow>
      </>
    );
  }
);
