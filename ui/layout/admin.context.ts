import { useLocalStorage, useMount } from "react-use";
import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import type { Theme } from "@mui/material";

type State = {
  isExpanded: boolean;
};

export function useAdminStateProvider() {
  const [sidebaropenInitial] = useLocalStorage("admin-sidebar-open");
  const [sidebaropen, setSidebarOpen] = useLocalStorage("admin-sidebar-open");
  const handleOpenDrawer = () => setSidebarOpen(true);
  const handleCloseDrawer = () => setSidebarOpen(false);
  const [title, setTitle] = useState<string>("");
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    if (isSm && sidebaropenInitial) {
      setSidebarOpen(false);
    }
  }, [sidebaropenInitial, isSm]);

  return {
    title,
    setTitle,
    sidebaropen: Boolean(sidebaropen),
    handleCloseDrawer,
    handleOpenDrawer,
  };
}

type IAdminLayout = ReturnType<typeof useAdminStateProvider>;

export const AdminContext = createContext<null | IAdminLayout>(null);

export const useAdminLayout = (): IAdminLayout => {
  return useContext(AdminContext) as IAdminLayout;
};
