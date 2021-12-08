import { observer } from "mobx-react";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useLayout } from "@layout/layout-provider";
import { Outlet } from "react-router-dom";

export const adminBatchManagement = [
  {
    path: "/",
    name: "batch-show-video",
    key: "batch-show-video",
  },
  {
    path: "videos",
    name: "batch-show-video",
    key: "batch-show-video",
  },
  {
    path: "add-video",
    name: "batch-show-add-vide",
    key: "batch-show-add-video",
  },
  {
    path: "students",
    name: "batch-show-student",
    key: "batch-show-student",
  },
  {
    path: "quiz-check",
    name: "batch-show-quiz-check",
    key: "batch-show-quiz-check",
  },
  {
    path: "discussion",
    name: "batch-show-discussion",
    key: "batch-show-discussion",
  },
];
export const BatchShow = observer((location: any) => {
  const { updateBackUrl } = useLayout();
  useEffect(() => {
    updateBackUrl({
      url: "classroom",
      label: "kembali ke ruang kelas",
    });
    return () => updateBackUrl(null);
  }, []);
  return (
    <Container>
      <Outlet />
    </Container>
  );
});
