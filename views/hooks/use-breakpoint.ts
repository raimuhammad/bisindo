import { useMediaQuery, useTheme } from "@mui/material";

export function useBreakpoint(breakpoint: "sm" | "md" | "lg") {
  const theme = useTheme();
  const mediaQuery = useMediaQuery(theme.breakpoints.down(breakpoint));
  return mediaQuery;
}
