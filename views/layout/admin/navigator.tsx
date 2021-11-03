import * as React from "react";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { Route } from "@root/routes/type";
import { useNavigate } from "@hooks/use-navigate";
import { ExitToApp } from "@mui/icons-material";
import { useLogout } from "@providers/logout-provider";

type Props = {
  routes: Route[];
};
export const Navigator = ({ routes }: Props) => {
  const { navigateHandler } = useNavigate();
  const { openDialog } = useLogout();
  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        {routes.map(({ icon, path, title }) => (
          <ListItem onClick={navigateHandler(path)} button key={path}>
            <ListItemIcon>{icon as React.ReactNode}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Button onClick={openDialog} startIcon={<ExitToApp />} fullWidth>
        Logout
      </Button>
    </>
  );
};
