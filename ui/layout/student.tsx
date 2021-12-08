import { StudentContext, useStudentContext } from "@providers/student-contexts";
import { observer } from "mobx-react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Header } from "@layout/components/header";
import { Banner } from "@layout/components/banner";
import { NavigationPanel } from "@layout/components/navigation-panel";
import { useLayout } from "@layout/layout-provider";
import { useEffect } from "react";
import { ScreenLoading } from "@components/screen-loading";

export const Student = observer(({ children }: any) => {
  const ctx = useStudentContext();
  return (
    <StudentContext.Provider value={ctx}>
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
          {ctx.isPageLoading ? <ScreenLoading /> : children}
        </Box>
      </Box>
    </StudentContext.Provider>
  );
});

export function useStudentNavs(navs: ReturnType<typeof useLayout>["navs"]) {
  const { updateNavs, navs: current } = useLayout();
  useEffect(() => {
    if (!navs.length && !current.length) {
      updateNavs([
        {
          label: "Dashboard",
          path: "/",
        },
        {
          label: "Diskusi",
          path: "/discussion",
        },
      ]);
    }
  }, [navs]);
}
