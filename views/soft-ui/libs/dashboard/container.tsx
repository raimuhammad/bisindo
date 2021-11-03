import { SuiBox } from "../components/sui-box";
import styles from "./styles";
import { useSoftUIController } from "../soft-ui";

export function LayoutContainer({ children }: any) {
  const [controller] = useSoftUIController();

  const { miniSidenav, direction } = controller;

  const classes = styles({ miniSidenav, direction });

  return <SuiBox customClass={classes.layoutContainer}>{children}</SuiBox>;
}
