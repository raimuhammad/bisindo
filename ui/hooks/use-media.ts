import { useMediaQuery, useTheme } from "@mui/material";

export function useIsSm() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
}
