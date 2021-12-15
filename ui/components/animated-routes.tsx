import { ComponentType, Fragment, PropsWithChildren } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

type Nav = {
  path: string;
  component: ComponentType;
};

type Props = {
  navs: Nav[];
  wrapper?: ComponentType;
  withRoutes?: boolean;
};

export const AnimatedRoutes = ({
  navs,
  wrapper = Fragment,
  withRoutes = false,
  children,
}: PropsWithChildren<Props>) => {
  const { pathname } = useLocation();
  const Wrapper = wrapper;
  const RouteWrapper = withRoutes ? Routes : Fragment;
  return (
    <RouteWrapper>
      {navs.map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <AnimatePresence exitBeforeEnter>
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                key={path}
                style={{ minHeight: "100vh" }}
              >
                <Wrapper>
                  <Component />
                </Wrapper>
              </motion.div>
            </AnimatePresence>
          }
        />
      ))}
      {children}
    </RouteWrapper>
  );
};
