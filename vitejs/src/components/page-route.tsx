import * as React from "react";
import { RouteProps, Route, Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { useApp } from "providers/app-provider";
import { observer } from "mobx-react";
import { AnimatedFaded } from "components/animated-faded";

const variants = {
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const AnimatedPage = (Component: React.FC<any>, disabledAuth: boolean) => {
  const Animated = observer((props: any) => {
    const app = useApp();
    const renderNode = disabledAuth ? true : Boolean(app.user);
    return (
      <AnimatedFaded>
        {renderNode ? <Component {...props} /> : <Redirect to="/sign-in" />}
      </AnimatedFaded>
    );
  });
  return Animated;
};

type Props = {
  disableAuth?: boolean;
} & RouteProps;

export const PageRoute = ({ path, component, disableAuth }: Props) => {
  const Animated = AnimatedPage(component as React.FC, Boolean(disableAuth));
  return <Route exact path={path} component={Animated} />;
};
