import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconButton, AppBar, Toolbar, Icon } from "@mui/material";
import { SuiTypography } from "../sui-typography";
import { SuiBox } from "../sui-box";
import { SuiInput } from "../sui-input";
import { Breadcrumbs } from "../sui-breadcrumbs";
import styles from "./styles";
import { useSoftUIController } from "../../soft-ui";
import { Search } from "@mui/icons-material";

export function Header({ absolute = false, light = false, isMini = false }) {
  const [navbarType, setNavbarType] = useState<any>();
  const [controller, dispatch] = useSoftUIController();
  const {
    miniSidenav,
    transparentNavbar,
    fixedNavbar,
    openConfigurator,
  } = controller;
  const classes = styles({ transparentNavbar, absolute, light, isMini });
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }
    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      dispatch({
        type: "TRANSPARENT_NAVBAR",
        value: (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      });
    }
    /**
     The event listener that's calling the handleTransparentNavbar function when
     scrolling the window.
     */
    window.addEventListener("scroll", handleTransparentNavbar);
    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () =>
    dispatch({ type: "MINI_SIDENAV", value: !miniSidenav });
  const handleConfiguratorOpen = () =>
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      className={classes.navbar}
    >
      <Toolbar className={classes.navbar_container}>
        <SuiBox
          customClass={classes.navbar_row}
          color="inherit"
          mb={{ xs: 1, md: 0 }}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={light}
          />
        </SuiBox>
      </Toolbar>
    </AppBar>
  );
}
