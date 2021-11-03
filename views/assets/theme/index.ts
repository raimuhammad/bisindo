import { createTheme, Theme } from "@mui/material";
import { adaptV4Theme } from "@mui/material/styles";
import boxShadows from "./base/boxShadows";
import typography from "./base/typography";
import colors from "./base/colors";
import borders from "./base/borders";
import breakpoints from "./base/breakpoints";
import globals from "./base/globals";
import pxToRem from "./functions/pxToRem";
import linearGradient from "./functions/linearGradient";
import rgba from "./functions/rgba";
import boxShadow from "./functions/boxShadow";
import hexToRgb from "./functions/hexToRgb";

import sidenav from "./components/sidenav";
import list from "./components/list";
import listItem from "./components/list/listItem";
import listItemText from "./components/list/listItemText";
import card from "./components/card";
import cardMedia from "./components/card/cardMedia";
import cardContent from "./components/card/cardContent";
import button from "./components/button";
import iconButton from "./components/iconButton";
import inputBase from "./components/form/inputBase";
import menu from "./components/menu";
import menuItem from "./components/menu/menuItem";
import switchButton from "./components/form/switchButton";
import divider from "./components/divider";
import tableContainer from "./components/table/tableContainer";
import tableHead from "./components/table/tableHead";
import tableCell from "./components/table/tableCell";
import linearProgress from "./components/linearProgess";
import breadcrumbs from "./components/breadcrumbs";
import slider from "./components/slider";
import avatar from "./components/avatar";
import tooltip from "./components/tooltip";
import appBar from "./components/appBar";
import tabs from "./components/tabs";
import tab from "./components/tabs/tab";
import stepper from "./components/stepper";
import step from "./components/stepper/step";
import stepConnector from "./components/stepper/stepConnector";
import stepLabel from "./components/stepper/stepLabel";
import stepIcon from "./components/stepper/stepIcon";
import select from "./components/form/select";
import formControlLabel from "./components/form/formControlLabel";
import formLabel from "./components/form/formLabel";
import checkbox from "./components/form/checkbox";
import radio from "./components/form/radio";
import autocomplete from "./components/form/autocomplete";
import input from "./components/form/input";
import container from "./components/container";
import popover from "./components/popover";
import buttonBase from "./components/buttonBase";
import icon from "./components/icon";
import svgIcon from "./components/svgIcon";
import link from "./components/link";

const softUiTheme = {
  breakpoints: ({ ...breakpoints } as unknown) as Theme["breakpoints"],
  palette: { ...colors } as any,
  typography: { ...typography } as any,
  // @ts-ignore
  boxShadows: { ...(boxShadows as any) },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav } as any,
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
  } as any,
  MuiCardMedia: { ...cardMedia },
  MuiCardContent: { ...cardContent },
  MuiButton: { ...button } as any,
  MuiIconButton: { ...iconButton },
  MuiInputBase: { ...inputBase },
  MuiMenu: { ...menu },
  MuiMenuItem: { ...menuItem },
  MuiSwitch: { ...switchButton },
  MuiDivider: { ...divider },
  MuiTableContainer: { ...tableContainer },
  MuiTableHead: { ...tableHead },
  MuiTableCell: { ...tableCell },
  MuiLinearProgress: { ...linearProgress },
  MuiBreadcrumbs: { ...breadcrumbs },
  MuiSlider: { ...slider },
  MuiAvatar: { ...avatar },
  MuiTooltip: { ...tooltip },
  MuiAppBar: { ...appBar },
  MuiTabs: { ...tabs },
  MuiTab: { ...tab },
  MuiStepper: { ...stepper },
  MuiStep: { ...step },
  MuiStepConnector: { ...stepConnector },
  MuiStepLabel: { ...stepLabel },
  MuiStepIcon: { ...stepIcon },
  MuiSelect: { ...select },
  MuiFormControlLabel: { ...formControlLabel },
  MuiFormLabel: { ...formLabel },
  MuiCheckbox: { ...checkbox },
  MuiRadio: { ...radio },
  MuiAutocomplete: { ...autocomplete },
  MuiInput: { ...input },
  MuiOutlinedInput: { ...input },
  MuiFilledInput: { ...input },
  MuiPopover: { ...popover },
  MuiButtonBase: { ...buttonBase },
  MuiIcon: { ...icon },
  MuiSvgIcon: { ...svgIcon },
  MuiLink: { ...link },
};

export type SoftUiTheme = typeof softUiTheme;

export default createTheme(adaptV4Theme(softUiTheme));
