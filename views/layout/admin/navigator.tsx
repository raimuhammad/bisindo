import * as React from "react";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Route } from "@root/routes/type";
import { useNavigate } from "@hooks/use-navigate";

type Props = {
  routes: Route[];
};
export const Navigator = ({ routes }: Props) => {
  const { navigateHandler } = useNavigate();
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
    </>
  );
};
