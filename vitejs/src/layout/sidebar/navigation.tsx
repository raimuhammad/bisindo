import * as React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Dashboard,
  VideoLibrary,
  AccountBox,
  VerifiedUser,
  Book,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { useApp } from "providers/app-provider";

const items = [
  { icon: Dashboard, path: "/dashboard", label: "Dashboard" },
  { icon: Book, path: "/grades", label: "Jenjang" },
  { icon: VideoLibrary, path: "/video", label: "Video" },
  { icon: AccountBox, path: "/students", label: "Data siswa" },
  { icon: VerifiedUser, path: "/account/edit", label: "Akun" },
];

export const Navigation = observer(() => {
  const history = useHistory();
  const callback = React.useCallback((path: string) => {
    return () => {
      history.push(path);
    };
  }, []);
  const app = useApp();
  const lists = app.user?.role === "ADMIN" ? items : [];
  return (
    <div>
      <List>
        {lists.map((Props) => (
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
});
