import { NavLink } from "react-router-dom";
import { SideNavCollapse } from "./collapse";
import { useSidenavStyles as styles } from "./styles";
import { ReactNode } from "react";

type ItemLinkProps = {
  route: string;
  name: string;
  icon: ReactNode;
  dataKey: string;
  active: boolean;
  mini: boolean;
  transparent: boolean;
};

export const ItemLink = ({
  route,
  name,
  icon,
  active: isActive,
  mini,
  transparent,
}: ItemLinkProps) => {
  const classes = styles({ miniSidenav: mini, transparentSidenav: transparent });
  return (
    <NavLink to={route} className={classes.sidenav_navlink}>
      <SideNavCollapse name={name} icon={icon} active={isActive} noCollapse={false} />
    </NavLink>
  );
};
