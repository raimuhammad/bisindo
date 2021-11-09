import {
  AppBar as MuiAppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useAdminLayout } from "../admin.context";
import { Search, AccountCircle, ExpandMore } from "@mui/icons-material";
import { useApp } from "@providers/application-provider";
import { useIsSm } from "@hooks/use-media";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      width: "100%",
    },
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const toolbarSx = {
  paddingLeft: [0, 2],
  paddingRight: [0, 2],
  display: ["block", "flex"],
  color: "#2c3e50",
  "& > .page-info": {
    paddingX: 2,
    display: "flex",
    alignItems: "center",
  },
  "& > .search-bar": {
    borderRadius: 1,
    display: "flex",
    alignItems: "center",
    border: "solid 1px #f8f8f8",
    boxShadow: `inset 0 1px 2px #eee`,
    "& > .icon-container": {
      alignItems: "center",
      display: "flex",
      paddingX: 2,
      background: "#f9f9f9",
      height: 42,
    },
  },
};

const UserInfo = () => {
  const { user } = useApp();
  const isSm = useIsSm();
  if (!user) {
    return <></>;
  }
  const { name } = user;
  return (
    <Box
      sx={{
        marginLeft: "auto",
        position: ["absolute", "static"],
        top: 0,
        right: 0,
      }}
    >
      {isSm ? (
        <IconButton>
          <AccountCircle />
        </IconButton>
      ) : (
        <Button endIcon={<ExpandMore />} startIcon={<AccountCircle />}>
          {isSm ? "" : name}
        </Button>
      )}
    </Box>
  );
};

export const Header = () => {
  const {
    handleOpenDrawer,
    handleCloseDrawer,
    sidebaropen: open,
    title,
  } = useAdminLayout();
  return (
    <>
      <AppBar
        sx={{
          borderLeft: "none",
          background: "white",
          color: "black",
        }}
        variant="outlined"
        elevation={0}
        position="fixed"
        open={open}
      >
        <Toolbar sx={toolbarSx}>
          <Box className="page-info">
            <IconButton color="inherit" onClick={handleOpenDrawer} edge="start">
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{ color: "#2c3e50", paddingX: [1, 3] }}
              variant="h6"
              noWrap
              component="div"
            >
              {title ? title : "TITLE"}
            </Typography>
          </Box>
          <Box className="search-bar">
            <InputBase
              sx={{ flex: 1, paddingLeft: 2 }}
              placeholder="Pencarian"
            />
            <Box className="icon-container">
              <Search />
            </Box>
          </Box>
          <UserInfo />
        </Toolbar>
      </AppBar>
    </>
  );
};
