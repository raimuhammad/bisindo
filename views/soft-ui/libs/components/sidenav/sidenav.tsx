import { PropsWithChildren, useCallback } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Drawer, List, Divider, Icon, Box } from "@mui/material";
import { SuiTypography } from "../sui-typography";
// @ts-ignore
import SoftUILogo from "assets/images/logo-ct.png";
import { useSidenavStyles as styles } from "./styles";
import { ItemLink } from "./item-link";

type SidenavProps = {
  transparent: boolean;
  mini: boolean;
  routes: RouteDefinition[];
  handleClose(): void;
  getCurrentRoute(v: RouteDefinition): boolean;
};

type SideContainerProps = {
  mini: boolean;
  transparent: boolean;
  handleClose(): void;
};

const SideBarContainer = ({
  mini,
  transparent,
  handleClose,
  children,
}: PropsWithChildren<SideContainerProps>) => {
  const classes = styles({
    miniSidenav: mini,
    transparentSidenav: transparent,
  });
  const makeClasses = useCallback(
    (className: string = "") => {
      return clsx(className, {
        [classes.sidenav_open]: !mini,
        [classes.sidenav_close]: mini,
      });
    },
    [mini, transparent]
  );
  return (
    <Drawer
      variant="permanent"
      className={makeClasses()}
      style={{
        height: "100vh",
      }}
      classes={{
        paper: makeClasses(classes.sidenav),
      }}
    >
      <Box className={classes.sidenav_header}>
        <Box
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          className="cursor-pointer"
          onClick={handleClose}
        >
          <SuiTypography variant="h6" textColor="secondary">
            <Icon className="font-bold">close</Icon>
          </SuiTypography>
        </Box>
        <NavLink to="/">
          <Box className={classes.sidenav_logoLabel}>
            {/* @ts-ignore */}
            <SuiTypography component="h6" variant="button" fontWeight="medium">
              Soft UI Dashboard
            </SuiTypography>
          </Box>
        </NavLink>
      </Box>
      <Divider />
      {children}
    </Drawer>
  );
};

const MemoizeSidenav = ({
  mini,
  transparent,
  routes,
  handleClose,
  getCurrentRoute,
}: SidenavProps) => {
  return (
    <SideBarContainer
      mini={mini}
      transparent={transparent}
      handleClose={handleClose}
    >
      <List>
        {routes
          .filter((item) => !item.hideInMenu)
          .map((props) => (
            <ItemLink
              {...props}
              active={getCurrentRoute(props)}
              mini={mini}
              transparent={transparent}
              dataKey={props.key}
            />
          ))}
      </List>
    </SideBarContainer>
  );
};

export const Sidenav = MemoizeSidenav;
