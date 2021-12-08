import {
  AppBar as MuiAppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar/AppBar";
import { useAdminLayout } from "../admin.context";
import { AccountCircle, ExpandMore, Search } from "@mui/icons-material";
import { useApp } from "@providers/application-provider";
import { useIsSm } from "@hooks/use-media";
import { useEffect, useState } from "react";
import { useMutation } from "@hooks/use-mutation";
import { RootStoreBaseMutations } from "@root-model";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

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
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const toolbarSx = {
  paddingLeft: [0, 0],
  paddingRight: [0, 0],
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
    bgcolor: "red",
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

const UserInfo = observer(() => {
  const { user } = useApp();
  const isSm = useIsSm();
  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null);
  const [{ loading, response }, doLogout] = useMutation({
    api: RootStoreBaseMutations.mutateLogout,
  });
  const { setUser } = useApp();
  const push = useNavigate();
  useEffect(() => {
    if (response) {
      push("/");
      setUser(null);
    }
  }, [response]);

  const onLogout = () => {
    doLogout({});
  };

  const handler = (e: any) => {
    setAnchor(anchor ? null : e.target);
  };

  if (!user) {
    return <></>;
  }
  const { name } = user;
  return (
    <>
      <Backdrop sx={{ zIndex: 100 * 100, color: "white" }} open={loading}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          <Typography>Mengeluarkan akun anda</Typography>
        </Box>
      </Backdrop>
      <Menu
        PaperProps={{
          elevation: 1,
          sx: {
            width: 200,
          },
        }}
        onClose={() => setAnchor(null)}
        open={Boolean(anchor)}
        anchorEl={anchor}
      >
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
      <Box
        sx={{
          marginLeft: "auto",
          position: ["absolute", "static"],
          top: 0,
          right: 0,
        }}
      >
        {isSm ? (
          <IconButton onClick={handler}>
            <AccountCircle />
          </IconButton>
        ) : (
          <Button
            onClick={handler}
            endIcon={<ExpandMore />}
            startIcon={<AccountCircle />}
          >
            {isSm ? "" : name}
          </Button>
        )}
      </Box>
    </>
  );
});

export const Header = () => {
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
        open={false}
      >
        <Container>
          <Toolbar sx={toolbarSx}>
            <Box className="page-info">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: (t) => t.palette.grey.A100,
                  borderRadius: 2,
                }}
              >
                <InputBase
                  sx={{ flex: 1, paddingLeft: 2 }}
                  placeholder="Pencarian"
                />
                <Search sx={{ mr: 2 }} />
              </Box>
            </Box>
            <UserInfo />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
