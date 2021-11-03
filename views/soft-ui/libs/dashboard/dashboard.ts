import { SoftUiActions, useSoftUi } from "../soft-ui";
import { useCallback } from "react";
import { DashboardProps } from "./type";

const useOnScrolling = () => {
  const [{ fixedNavbar }, dispatch] = useSoftUi();
  return useCallback(
    (event) => {
      const { scrollTop } = event.target;
      dispatch({
        type: "TRANSPARENT_NAVBAR",
        value: (fixedNavbar && scrollTop === 0) || !fixedNavbar,
      });
    },
    [fixedNavbar]
  );
};

const handlers = () => {
  const cb = useSoftUi()[1];

  return {
    onContentScroll: useOnScrolling(),
    expandNav: () => cb({ type: SoftUiActions.MINI_SIDENAV, value: true }),
    shrinkNav: () => cb({ type: SoftUiActions.MINI_SIDENAV, value: false }),
  };
};

export function useDashboardProvider(
  props: DashboardProps
): [ReturnType<typeof useSoftUi>[0], ReturnType<typeof handlers>, DashboardProps] {
  const [controller] = useSoftUi();
  return [controller, handlers(), props];
}
