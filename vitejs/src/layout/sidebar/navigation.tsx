import * as React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Dashboard,
  VideoLibrary,
  AccountBox,
  VerifiedUser,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const items = [
  { icon: Dashboard, path: "/dashboard", label: "Dashboard" },
  { icon: VideoLibrary, path: "/video", label: "Video" },
  { icon: AccountBox, path: "/students", label: "Data siswa" },
  { icon: VerifiedUser, path: "/account/edit", label: "Akun" },
];

export const Navigation = () => {
  const history = useHistory();
  const callback = React.useCallback((path: string) => {
    return () => {
      history.push(path);
    };
  }, []);
  return (
    <div>
      <List>
        {items.map((Props) => (
          <ListItem onClick={callback(Props.path)} key={Props.path} button>
            <ListItemIcon>
              <Props.icon />
            </ListItemIcon>
            <ListItemText primary={Props.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
