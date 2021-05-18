import { VideoModelType } from "root/models/stores";
import { Delete, Edit, PlayCircleFilled, Book } from "@material-ui/icons";
import { IconButton, TableCell, TableRow, Tooltip } from "@material-ui/core";
import * as React from "react";
import { Action, useVideoDataTable } from "./provider";
import { useNavigate } from "hooks/use-navigate";

type IconAction = {
  title: string;
  icon: React.ReactNode;
  action: Action;
  color: any;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const icons: Array<IconAction & { key: Action }> = [
  { icon: <Edit />, title: "Edit video", color: "default", action: "edit" },
  { icon: <Delete />, title: "Hapus", color: "secondary", action: "delete" },
  {
    icon: <PlayCircleFilled />,
    title: "Putar video",
    color: "primary",
    action: "view",
  },
].map((item) => ({ ...item, key: item.action }));

export const Row = ({ model }: { model: VideoModelType }) => {
  const { handleAction, selected } = useVideoDataTable();
  const iconRenderer = ({
    title,
    key,
    icon,
    color,
    action,
  }: typeof icons[number]) => {
    return (
      <Tooltip key={key} title={title}>
        <IconButton
          onClick={() => handleAction(model, action)}
          color={color as any}
          size="small"
        >
          {icon}
        </IconButton>
      </Tooltip>
    );
  };
  const { navigateHandler } = useNavigate();
  const quizHandler = navigateHandler(
    `/video/${model.id}/quiz?gradeId=${model.grade.id}`
  );
  return (
    <TableRow>
      <TableCell>{model.title}</TableCell>
      <TableCell>{model.durationText}</TableCell>
      <TableCell>
        {icons.map(iconRenderer)}
        <Tooltip title="Tampilkan quiz">
          <IconButton onClick={quizHandler} size="small">
            <Book />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
