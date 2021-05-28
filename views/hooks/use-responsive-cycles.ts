import { useMediaQuery, useTheme } from "@material-ui/core";

type CycleProps<T> = {
  lg?: T;
  md?: T;
  sm: T;
};

export function useResposiveCycles<T>({ sm, lg, md }: CycleProps<T>): T {
  const theme = useTheme();
  const isCurrentBreakpoint = (v: any) => useMediaQuery(v);
  const isMd = isCurrentBreakpoint(theme.breakpoints.only("md"));
  const isLg = isCurrentBreakpoint(theme.breakpoints.only("lg"));
  if (isLg) {
    return lg ?? md ?? sm;
  }
  if (isMd) {
    return md ?? sm;
  }
  return sm;
}
