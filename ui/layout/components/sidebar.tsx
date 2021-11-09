import {
  CSSObject,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAdminLayout } from "../admin.context";
import { ChevronLeft, Inbox } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import { useApp } from "@providers/application-provider";

const drawerWidth = 240;
export const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  [theme.breakpoints.down("sm")]: {
    width: "80vw",
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const NavLink = ({ path, icon: Icon, name }: RouteDefinition) => {
  const {
    location: { pathname },
    push,
  } = useHistory();

  const active = path === pathname;
  const handler = () => push(path);

  return (
    <ListItem button onClick={handler} selected={active}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
export const Sidebar = () => {
  const {
    sidebaropen: open,
    handleCloseDrawer,
    handleOpenDrawer,
  } = useAdminLayout();
  const theme = useTheme();
  const { routes } = useApp();
  const links = routes.filter((item) => !item.hideInMenu);
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const DrawerNode = isSm ? SwipeableDrawer : Drawer;
  const drawerNodeProps = isSm
    ? {
        onOpen: handleOpenDrawer,
        PaperProps: {
          sx: {
            width: "80vw",
          },
        },
      }
    : {
        variant: "permanent",
        PaperProps: {
          sx: { border: "none" },
        },
      };

  return (
    <DrawerNode
      open={open}
      onClose={handleCloseDrawer}
      {...(drawerNodeProps as any)}
    >
      <DrawerHeader>
        <IconButton
          sx={{ display: open ? "block" : "none" }}
          onClick={handleCloseDrawer}
        >
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <DrawerHeader />
      <List>
        {links.map((item) => (
          <NavLink {...item} key={item.path} />
        ))}
      </List>
    </DrawerNode>
  );
};
