import {
  CssBaseline,
  styled,
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import { useAdminStateProvider, AdminContext } from "./admin.context";
import { Header } from "./components/header";
import { useIsSm } from "@hooks/use-media";
import { Banner } from "./components/banner";
import { NavigationPanel } from "./components/navigation-panel";
import { useLayout } from "./layout-provider";
import { useEffect } from "react";

export const Admin = ({ children }: any) => {
  const adminContext = useAdminStateProvider();
  const open = adminContext.sidebaropen;
  const handleDrawerOpen = adminContext.handleOpenDrawer;
  const isSm = useIsSm();
  const { updateNavs } = useLayout();

  useEffect(() => {
  }, []);

  return (
    <AdminContext.Provider value={adminContext}>
      <Box sx={{ background: "#f9f9f9", minHeight: "100vh" }}>
        <CssBaseline />
        <Header />
        <Box id='main-component' component="main" sx={{ flexGrow: 1, minHeight: "100vh" }}>
          <Toolbar />
          <Banner />
          <NavigationPanel />
          {children}
        </Box>
      </Box>
    </AdminContext.Provider>
  );
};
