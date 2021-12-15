import { CssBaseline, Box, Toolbar } from "@mui/material";
import { useAdminStateProvider, AdminContext } from "./admin.context";
import { Header } from "./components/header";
import { Banner } from "./components/banner";
import { NavigationPanel } from "./components/navigation-panel";

export const Admin = ({ children }: any) => {
  const adminContext = useAdminStateProvider();
  return (
    <AdminContext.Provider value={adminContext}>
      <Box sx={{ background: "#f9f9f9", minHeight: "100vh" }}>
        <CssBaseline />
        <Header />
        <Box
          id="main-component"
          component="main"
          sx={{ flexGrow: 1, minHeight: "100vh" }}
        >
          <Toolbar />
          <Banner />
          <NavigationPanel />
          {children}
        </Box>
      </Box>
    </AdminContext.Provider>
  );
};
