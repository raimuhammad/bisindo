import * as React from "react";
import { Box, CircularProgress } from "@mui/material";
import { SuiTypography } from "../components/sui-typography";

type ProgressProps = {
  appName: string;
};

export const Progress = ({ appName }: ProgressProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={200} />
        </Box>
        <Box sx={{ textAlign: "center", marginY: 4 }}>
          <SuiTypography variant="h5">Please {appName} is loading</SuiTypography>
        </Box>
      </Box>
    </Box>
  );
};
