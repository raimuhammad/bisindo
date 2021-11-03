import * as React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";

export const FullPageLoader = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const theme = useTheme();
  return (
    <Box
      zIndex={theme.zIndex.drawer + 5}
      style={{ height, width }}
      position="fixed"
      top={0}
      left={0}
      bgcolor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={0.2 * height} />
    </Box>
  );
};
