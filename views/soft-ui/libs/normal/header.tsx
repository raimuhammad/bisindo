import { AppBar, Box, Divider, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { SuiTypography } from "../components/sui-typography";
import { appbarSx } from "./styles";
import { useSoftUi } from "../soft-ui";
import { SoftUiTheme } from "../../assets/theme";

const Mobile = () => {
  const [{ appName, appLogo }] = useSoftUi();
  const theme = useTheme() as SoftUiTheme;

  return <>
    <IconButton className="menu" size="large">
      <Menu />
    </IconButton>
    <Box className="logo">
      {appLogo ? (
        <img src={appLogo} style={{ width: 40, height: 40 }} alt="" />
      ) : (
        <SuiTypography
          fontWeight="bolder"
          align="center"
          sx={{
            color: theme.palette.text.main,
          }}
          variant="subtitle2"
        >
          {appName}
        </SuiTypography>
      )}
    </Box>
  </>;
};
const Desktop = () => {
  const [{ appName, appLogo }] = useSoftUi();
  const theme = useTheme() as SoftUiTheme;
  return (
    <>
      <Box className="logo">
        {appLogo ? (
          <img src={appLogo} style={{ width: 40, height: 40 }} alt="" />
        ) : (
          <SuiTypography
            fontWeight="bolder"
            align="center"
            sx={{
              color: theme.palette.text.main,
            }}
            variant="subtitle2"
          >
            {appName}
          </SuiTypography>
        )}
      </Box>
      <Divider className="divider" orientation="vertical" />
    </>
  );
};

export const Header = () => {
  const sx = appbarSx();
  const theme = useTheme() as SoftUiTheme;
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AppBar position="fixed" sx={sx}>
      <Toolbar className={isSm ? "mobile" : "desktop"}>{isSm ? <Mobile /> : <Desktop />}</Toolbar>
    </AppBar>
  );
};
