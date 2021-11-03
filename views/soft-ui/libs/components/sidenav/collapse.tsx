import { Collapse, ListItem, ListItemIcon, ListItemText, Icon, Box } from "@mui/material";
import { collapseStyles as styles } from "./styles";
import { useDashboard } from "../../dashboard";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  name: string;
  children?: ReactNode;
  active?: boolean;
  noCollapse?: boolean;
  open?: boolean;
};

export const SideNavCollapse = ({
  icon,
  name,
  active = false,
  noCollapse = false,
  open = false,
  children,
  ...rest
}: Props) => {
  const { softUi } = useDashboard();
  const { miniSidenav, transparentSidenav, sidenavColor } = softUi;
  const classes = styles({
    active,
    noCollapse,
    open,
    miniSidenav,
    transparentSidenav,
    sidenavColor,
  });
  return (
    <>
      <ListItem component="li">
        <Box {...rest} className={classes.collapse_item}>
          <ListItemIcon className={classes.collapse_iconBox}>
            {typeof icon === "string" ? (
              <Icon className={classes.collapse_icon}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>
          <ListItemText primary={name} classes={{ root: classes.collapse_text }} />
        </Box>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
};
