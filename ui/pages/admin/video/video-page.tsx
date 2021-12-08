import { observer } from "mobx-react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useLayout } from "@layout/layout-provider";

const navs = [
  {
    path: "info",
    name: "Informasi video",
  },
  {
    path: "quiz",
    name: "Quis",
  },
  {
    path: "edit",
    name: "Edit",
  },
];

export const VideoPage = observer((props: any) => {
  const location = useLocation();
  const { updateBackUrl } = useLayout();
  useEffect(() => {
    if (location.state && location.state.backurl) {
      updateBackUrl(location.state.backurl);
    }
  }, [location]);
  return (
    <Container>
      <Outlet />
    </Container>
  );
});
