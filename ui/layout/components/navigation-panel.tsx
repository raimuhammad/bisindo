import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
  Container,
  Button,
} from "@mui/material";
import { useLayout } from "../layout-provider";
import { useNavigate, useLocation, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";

export const NavigationPanel = () => {
  const { navs, backurl } = useLayout();
  const push = useNavigate();
  const { pathname } = useLocation();
  const navigate = (path: string) => {
    push(path);
  };
  console.log(
    pathname
  )
  useEffect(() => {
    document.body.scroll({
      top: 0,
    });
    const main = document.getElementById("root");
    if (main) {
      main.scrollTo(0, 0);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pathname]);

  const onBack = () => {
    if (backurl) {
      push(backurl.url);
    }
  };
  const getValue = (): number => {
    const selected = navs.findIndex((item) => {
      return item.path === pathname.replaceAll("%20", " ");
    });
    console.log(
      navs
    )
    return selected === -1 ? 0 : selected;
  };
  return (
    <AppBar
      component={motion.div}
      animate={{
        height: !navs.length ? 0 : "fit-content",
      }}
      sx={{ overflow: "hidden" }}
      position="static"
      color="transparent"
      elevation={0}
      variant="outlined"
    >
      <Container
        sx={{
          "& > *": {
            color: "white",
          },
          py: 0,
          minHeight: "fit-content",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Tabs sx={{ py: 0 }} value={getValue()}>
          {navs.map((item, index) => (
            <Tab
              onClick={() => navigate(item.path)}
              key={item.path}
              sx={{ py: 0, my: 0, textTransform: "none", fontWeight: "bolder" }}
              label={item.label}
              value={index}
            />
          ))}
        </Tabs>
        <motion.div
          style={{ flex:1,marginLeft: "auto", width: 'fit-content', textAlign:'right' }}
          animate={{
            opacity: backurl ? 1 : 0,
          }}
        >
          <Button
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{
              textTransform: "none",
            }}
          >
            {backurl?.label}
          </Button>
        </motion.div>
      </Container>
    </AppBar>
  );
};
