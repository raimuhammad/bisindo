import {
  CssBaseline,
  styled,
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import { Sidebar, DrawerHeader } from "./components/sidebar";
import { useAdminStateProvider, AdminContext } from "./admin.context";
import { Header } from "./components/header";
import { useIsSm } from "@hooks/use-media";

export const Admin = ({ children }: any) => {
  const adminContext = useAdminStateProvider();
  const open = adminContext.sidebaropen;
  const handleDrawerOpen = adminContext.handleOpenDrawer;
  const isSm = useIsSm();
  return (
    <AdminContext.Provider value={adminContext}>
      <Box sx={{ display: "flex", background: "#f9f9f9", minHeight: "100vh" }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, minHeight: "100vh" }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </AdminContext.Provider>
  );
};
