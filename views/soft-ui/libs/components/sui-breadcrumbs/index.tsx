import { Link } from "react-router-dom";
import { Breadcrumbs as MuiBreadcrumbs, Icon } from "@mui/material";
import { SuiBox } from "../sui-box";
import { SuiTypography } from "../sui-typography";
import { useClasses as styles } from "./styles";
import { ReactNode } from "react";
import { Home } from "@mui/icons-material";
import { useSoftUi } from "../../soft-ui";

export const Breadcrumbs = ({ icon, title, route, light = false }: Props) => {
  const classes = styles({ light });
  const [{ customTitle }] = useSoftUi();
  const routes = route.slice(0, -1) as string[];

  return (
    <SuiBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs className={classes.breadcrumbs}>
        <Link to="/">
          <SuiTypography
            // @ts-ignore
            component="span"
            variant="body2"
            textColor={light ? "white" : "dark"}
            opacity={light ? 0.8 : 0.5}
            customClass="line-height-0"
          >
            <Icon>
              <Home />
            </Icon>
          </SuiTypography>
        </Link>
        {routes.map((el) => (
          <Link to={`/${el}`} key={el} className="decoration-none">
            <SuiTypography
              // @ts-ignore
              component="span"
              variant="button"
              fontWeight="regular"
              textTransform="capitalize"
              textColor={light ? "white" : "dark"}
              opacity={light ? 0.8 : 0.5}
              customClass="line-height-0"
            >
              {el}
            </SuiTypography>
          </Link>
        ))}
        <SuiTypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          textColor={light ? "white" : "dark"}
          customClass="line-height-0"
        >
          {customTitle ?? title.replace("-", " ")}
        </SuiTypography>
      </MuiBreadcrumbs>
      <SuiTypography
        fontWeight="bold"
        textTransform="capitalize"
        variant="h6"
        textColor={light ? "white" : "dark"}
        noWrap
      >
        {customTitle ?? title.replace("-", " ")}
      </SuiTypography>
    </SuiBox>
  );
};

type Props = {
  light?: boolean;
  title: string;
  route: string | string[];
  icon: ReactNode;
};

export default Breadcrumbs;
